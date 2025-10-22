<script lang="ts">
  import { X } from 'lucide-svelte';
  import { scale } from 'svelte/transition';
  
  export let photos: Array<{
    id: string;
    thumbnail: string;
  }> = [];
  export let onRemove: (id: string) => void;
</script>

{#if photos.length > 0}
  <div class="grid grid-cols-3 gap-2">
    {#each photos as photo (photo.id)}
      <div
        class="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
        transition:scale={{ duration: 200 }}
      >
        <img
          src={photo.thumbnail}
          alt="Audit evidence"
          class="w-full h-full object-cover"
        />
        
        <button
          class="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full
                 flex items-center justify-center text-white
                 hover:bg-black/75 transition-colors"
          on:click={() => onRemove(photo.id)}
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    {/each}
  </div>
{/if}