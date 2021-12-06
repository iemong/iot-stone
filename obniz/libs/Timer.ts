import StrictEventEmitter from "strict-event-emitter-types";
import { EventEmitter } from "events";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

type Events = {
  updateTime: (time: number) => void;
};

type MyEmitter = StrictEventEmitter<EventEmitter, Events>;

const INTERVAL = 500;

export class Timer extends (EventEmitter as { new (): MyEmitter }) {
  private _startTime: number;
  private _tempElapsedTime: number;
  private _intervalTime: number;
  private _elapsedTime: number;
  private _timerId: NodeJS.Timer | null;

  constructor(elapsedTime: number) {
    super();
    this._elapsedTime = elapsedTime;
    this._startTime = 0;
    this._tempElapsedTime = 0;
    this._intervalTime = 0;
    this._timerId = null;
  }

  start() {
    if (this._timerId) return;
    this._startTime = dayjs().valueOf();
    this._intervalTime = this._startTime;

    this._timerId = setInterval(() => {
      this.addElapsedTime();
    }, INTERVAL);
  }

  addElapsedTime() {
    const currentTime = dayjs().valueOf();
    this._tempElapsedTime = currentTime - this._intervalTime;
    this._elapsedTime += this._tempElapsedTime;
    this.emit("updateTime", this._elapsedTime);
    this._intervalTime = currentTime;
  }

  stop() {
    if (!this._timerId) return;
    clearInterval(this._timerId);
    this._timerId = null;
  }

  get formatElapsedTime() {
    return dayjs
      .duration(Math.floor(this._elapsedTime) / 1000, "s")
      .format("Y年Mヶ月D日 HH:mm:ss");
  }
}
