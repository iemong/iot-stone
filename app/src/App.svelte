<script lang="ts">
  import { useRealtimeDB } from './hooks/useRealtimeDB'
  import { onMount } from 'svelte'
  import colors from 'windicss/colors'

  const {
    elapsedTime,
    elapsedTimeString,
    isPressuring,
    subscribeState,
    percentage,
  } = useRealtimeDB()

  onMount(() => {
    subscribeState()
  })

  const calcRatio = (percentage: number) =>
    `radial-gradient(white 60%, transparent 60.1%), conic-gradient(${colors.rose['500']} 0% ${percentage}%, ${colors.rose['100']} ${percentage}% 100%)`

  $: bgStyle = calcRatio($percentage)
</script>

<main>
  <div class="text-center py-40px">
    <div
      class={`mx-auto px-28px py-4px m inline-block text-sm rounded-full leading-none text-white text-center ${
        $isPressuring ? 'bg-blue-400' : 'bg-gray-300'
      }`}
    >
      riding
    </div>
  </div>
  <div
    style={`background-image: ${bgStyle}`}
    class="relative mx-auto w-280px h-280px rounded-full"
  >
    {#if $elapsedTimeString}
      <div
        class="absolute flex flex-col justify-center w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <p class="mb-8px text-center text-12px text-red-500 font-bold">
          経過時間
        </p>
        <p
          class="whitespace-pre-line text-center text-red-500 font-bold text-24px leading-relaxed"
        >
          {$elapsedTimeString}
        </p>
      </div>
    {/if}
  </div>
</main>

<style windi:preflights:global windi:safelist:global></style>
