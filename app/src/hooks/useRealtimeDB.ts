import { onValue, ref } from "@firebase/database";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { database } from "../libs/firebase";
import { derived, writable } from "svelte/store";
dayjs.extend(duration);

export type StateRes = {
  elapsedTime: number; // millisecond
  isPressuring: boolean;
};

export const useRealtimeDB = () => {
  const state = writable<StateRes | null>(null);

  const elapsedTime = derived(state, ($s) => $s?.elapsedTime || 0);

  const formatTime = (second: number) => {
    return dayjs.duration(second, "s").format("Y年Mヶ月D日 HH:mm:ss");
  };

  const elapsedTimeString = derived(elapsedTime, ($elapsedTime) => {
    return formatTime(Math.floor($elapsedTime / 1000));
  });

  const isPressuring = derived(state, ($s) => $s?.isPressuring);

  const updateState = (res: StateRes) => {
    state.set(res);
  };

  const subscribeState = () => {
    const stateRef = ref(database, "state");
    onValue(stateRef, (snapshot) => {
      const res = snapshot.val() as StateRes;
      updateState(res);
    });
  };

  return {
    elapsedTime,
    isPressuring,
    subscribeState,
    elapsedTimeString,
  };
};
