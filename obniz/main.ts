import Obniz from "obniz";
import env from "dotenv";
import { db } from "./libs/firebase";
import { Timer } from "./libs/Timer";
import fetch, { Headers } from "node-fetch";

env.config();

const threshold = 0.5;
let isPressure = false;
let prevIsPressure = false;
const ref = db.ref("state");
const flagRef = ref.child("isPressuring");
const elapsedTimeRef = ref.child("elapsedTime");

const fetchCurrentTime = () => {
  return new Promise<number>((resolve, reject) => {
    elapsedTimeRef.on(
      "value",
      (snapshot) => {
        const time = snapshot.val() as number;
        resolve(time);
      },
      (err) => {
        console.error(err);
        reject(err);
      }
    );
  });
};

const postCfKV = (remainingTime: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${process.env["CF_TOKEN"]}`);
  return fetch(
    "https://api.cloudflare.com/client/v4/accounts/c5a179641abc4ab119707b1eb8586c02/storage/kv/namespaces/d6552d9447e84dbabdffed6b00d571b0/values/meta",
    {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({ description: remainingTime}),
    }
  );
};

const main = async () => {
  const elapsedTime = await fetchCurrentTime();

  const timer = new Timer(elapsedTime);

  timer.on("updateTime", (time: number) => {
    elapsedTimeRef.set(time);
    console.info("elapsedTime:", time);
  });

  const obniz = new Obniz(process.env["OBNIZ_ID"] || "");

  obniz.onconnect = async () => {
    obniz.display?.print("watching iot stone");
    // 5V
    obniz.io0?.output(true);
    // Analog Input
    obniz.ad1?.start((voltage) => {
      isPressure = voltage < threshold;

      if (isPressure !== prevIsPressure) {
        flagRef.set(isPressure);

        if (isPressure) {
          timer.start();
        } else {
          timer.stop();
          postCfKV(timer.formatElapsedTime);
        }
      }
      prevIsPressure = isPressure;
    });
    // GND
    obniz.io2?.output(false);
  };
};

main();
