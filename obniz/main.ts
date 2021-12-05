import Obniz from "obniz";
import env from "dotenv";
import { db } from "./libs/firebase";

env.config();

const threshold = 2.0;
let isPressure = false;
let prevIsPressure = false;
const obniz = new Obniz(process.env["OBNIZ_ID"] || "");

const ref = db.ref("state");
const flagRef = ref.child("isPressuring");

obniz.onconnect = async () => {
  obniz.display?.print("watching iot stone");
  // 5V
  obniz.io0?.output(true);
  // Analog Input
  obniz.ad1?.start((voltage) => {
    isPressure = voltage < threshold;
    if (isPressure === prevIsPressure) flagRef.set(isPressure);
    prevIsPressure = isPressure;
  });
  // GND
  obniz.io2?.output(false);
};
