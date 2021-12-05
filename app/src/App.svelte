<script lang="ts">
  import { useRealtimeDB } from './hooks/useRealtimeDB'
  import { onMount } from 'svelte'

  const { elapsedTimeString, isPressuring, subscribeState } = useRealtimeDB()

  onMount(() => {
    subscribeState()
  })
</script>

<main>
  {#if $elapsedTimeString}
    <p>残り時間: {$elapsedTimeString}</p>
  {/if}
  {#if $isPressuring}
    <p>今、石に乗っているよ</p>
  {/if}
</main>

<style windi:preflights:global windi:safelist:global></style>
