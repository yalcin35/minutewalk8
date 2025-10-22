<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { Camera, Image as ImageIcon, Trash2, AlertCircle } from 'lucide-svelte';
  
  interface Photo {
    id: string;
    file: File;
    thumbnail: string;
    originalSize: number;  // Store original size in bytes
    dimensions?: { width: number; height: number };
  }

  export let maxPhotos = 1;
  export let maxSizeInMB = 10;  // Increased size limit for better quality
  export let minWidth = 1024;   // Minimum width for AI to properly analyze
  export let minHeight = 768;   // Minimum height for AI to properly analyze
  export let photos: Photo[] = [];
  export let preserveOriginal = true; // New option to preserve original quality

  let showOptions = false;
  let fileInput: HTMLInputElement;
  let processing = false;
  let statusMessage = '';
  let errorMessage = '';
  let showInfoModal = false;

  const dispatch = createEventDispatcher<{
    change: { photos: Photo[] };
    error: { message: string };
    info: { message: string };
  }>();

  function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function isHeicFile(file: File): boolean {
    return (
      file.type === 'image/heic' ||
      file.type === 'image/heif' ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif')
    );
  }

  async function getImageDimensions(file: File): Promise<{width: number, height: number}> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error('Failed to load image'));
      };
      img.src = URL.createObjectURL(file);
    });
  }

  async function processImage(file: File): Promise<Photo> {
    // Get image dimensions
    let dimensions;
    try {
      dimensions = await getImageDimensions(file);
    } catch (error) {
      console.warn('Could not get image dimensions:', error);
    }

    // Check if image dimensions meet minimum requirements for AI
    if (dimensions && (dimensions.width < minWidth || dimensions.height < minHeight)) {
      dispatch('info', {
        message: `Image resolution (${dimensions.width}x${dimensions.height}) is below recommended minimum (${minWidth}x${minHeight}). AI analysis may be less accurate.`
      });
    }

    // Create thumbnail for preview (always create this for UI)
    const thumbnail = URL.createObjectURL(file);
    
    // Return photo object with original file
    return {
      id: generateId(),
      file: file,
      thumbnail: thumbnail,
      originalSize: file.size,
      dimensions: dimensions
    };
  }

  async function handleFiles(files: FileList) {
    if (!files || files.length === 0) return;
    
    if (photos.length + files.length > maxPhotos) {
      errorMessage = `Maximum ${maxPhotos} photo${maxPhotos > 1 ? 's' : ''} allowed`;
      dispatch('error', { message: errorMessage });
      return;
    }

    processing = true;
    statusMessage = 'Processing image...';
    errorMessage = '';
    const newPhotos: Photo[] = [];
    
    for (const file of files) {
      try {
        // Validate file type
        if (!file.type.startsWith('image/') && !isHeicFile(file)) {
          throw new Error('Only image files are allowed');
        }

        // Validate file size
        if (file.size > maxSizeInMB * 1024 * 1024) {
          throw new Error(`File size must be less than ${maxSizeInMB}MB`);
        }

        const photo = await processImage(file);
        newPhotos.push(photo);
        
      } catch (error) {
        errorMessage = error instanceof Error ? error.message : 'Failed to process image';
        dispatch('error', { message: errorMessage });
      }
    }

    processing = false;
    statusMessage = '';
    
    if (newPhotos.length > 0) {
      photos = [...photos, ...newPhotos];
      dispatch('change', { photos });
    }
  }

  function openCamera() {
    showOptions = false;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) handleFiles(files);
    };
    input.click();
  }

  function openPhotoLibrary() {
    showOptions = false;
    fileInput.click();
  }

  // No need for a remove function as this is handled by the parent component through the separate display component

  onDestroy(() => {
    photos.forEach(photo => {
      URL.revokeObjectURL(photo.thumbnail);
    });
  });
</script>

<!-- Photo Selection Options Modal -->
{#if showOptions}
  <div
    class="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
    on:click={() => showOptions = false}
  >
    <div
      class="bg-white rounded-2xl w-full max-w-xs p-4 space-y-4"
      on:click|stopPropagation
    >
      <button
        class="w-full p-4 flex items-center space-x-3 text-gray-700 hover:bg-gray-50 
               rounded-xl transition-colors"
        on:click={openCamera}
      >
        <Camera class="w-6 h-6" />
        <span>Take Photo</span>
      </button>
      
      <button
        class="w-full p-4 flex items-center space-x-3 text-gray-700 hover:bg-gray-50 
               rounded-xl transition-colors"
        on:click={openPhotoLibrary}
      >
        <ImageIcon class="w-6 h-6" />
        <span>Choose from Library</span>
      </button>
      
      <button
        class="w-full p-4 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
        on:click={() => showOptions = false}
      >
        Cancel
      </button>
    </div>
  </div>
{/if}

<!-- Info Modal -->
{#if showInfoModal}
  <div
    class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    on:click={() => showInfoModal = false}
  >
    <div
      class="bg-white rounded-2xl w-full max-w-md p-5 space-y-4"
      on:click|stopPropagation
    >
      <h3 class="text-lg font-semibold">Photo Requirements for AI Analysis</h3>
      <div class="space-y-2 text-sm">
        <p>For best AI analysis results:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Use good lighting</li>
          <li>Keep the subject in focus</li>
          <li>Avoid extreme angles</li>
          <li>Recommended resolution: {minWidth}x{minHeight} or higher</li>
          <li>Maximum file size: {maxSizeInMB}MB</li>
        </ul>
      </div>
      <button
        class="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        on:click={() => showInfoModal = false}
      >
        Got it
      </button>
    </div>
  </div>
{/if}

<!-- Hidden File Input -->
<input
  type="file"
  accept="image/*"
  class="hidden"
  bind:this={fileInput}
  on:change={(e) => handleFiles(e.target.files)}
  multiple={maxPhotos > 1}
/>

<!-- Photo display is handled by a separate component -->

<!-- Add Photo Button -->
{#if photos.length < maxPhotos}
  <div class="mt-2">
    <button
      class="w-full flex items-center justify-center space-x-2 p-4
             bg-blue-50 hover:bg-blue-100 text-blue-600
             rounded-xl transition-colors relative
             disabled:opacity-50 disabled:cursor-not-allowed"
      on:click={() => showOptions = true}
      disabled={processing}
    >
      {#if processing}
        <div class="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
          <div class="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      {/if}
      <Camera class="w-5 h-5" />
      <span class="text-sm font-medium">
        Add Photo
      </span>
    </button>
    
    <div class="flex justify-between items-center mt-2">
      <div class="text-xs text-gray-500">
        Supported: JPEG, PNG, WebP (up to {maxSizeInMB}MB)
      </div>
      <button 
        class="text-xs text-blue-600 flex items-center"
        on:click={() => showInfoModal = true}
      >
        <AlertCircle class="w-3 h-3 mr-1" />
        <span>Photo tips</span>
      </button>
    </div>
  </div>
{/if}

<!-- Status Message Area -->
{#if statusMessage}
  <div class="mt-2 text-sm text-blue-600 text-center">
    {statusMessage}
  </div>
{/if}

<!-- Error Message Area -->
{#if errorMessage}
  <div class="mt-2 text-sm text-red-600 text-center">
    {errorMessage}
  </div>
{/if}