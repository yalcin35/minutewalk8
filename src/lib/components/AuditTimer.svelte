<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Clock } from 'lucide-svelte';

  export let ref: any = null;
  export let startTime: Date | null = null;
  export let onTick: ((seconds: number) => void) | null = null;

  let elapsedSeconds = 0;
  let timerInterval: NodeJS.Timeout | null = null;

  // Expose the stopTimer method to parent components
  export function stopTimer(): number {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    return elapsedSeconds;
  }

  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  function startTimer() {
    if (timerInterval) return;

    // Calculate initial elapsed time if startTime is provided
    if (startTime) {
      elapsedSeconds = Math.floor((Date.now() - startTime.getTime()) / 1000);
    }

    timerInterval = setInterval(() => {
      elapsedSeconds++;
      if (onTick) onTick(elapsedSeconds);
    }, 1000);
  }

  onMount(() => {
    ref = { stopTimer };
    startTimer();
  });

  onDestroy(() => {
    stopTimer();
  });
</script>

<div class="flex items-center space-x-2 text-gray-600">
  <Clock class="w-4 h-4" />
  <span class="font-mono">{formatTime(elapsedSeconds)}</span>
</div>