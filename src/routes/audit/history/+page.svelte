<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';

  // Redirect to the new history page
  onMount(() => {
    goto('/history');
  });
</script>

<div class="min-h-screen flex items-center justify-center">
  <p>Redirecting to new history page...</p>
</div>