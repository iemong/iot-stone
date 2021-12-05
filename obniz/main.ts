import Obniz from "obniz";
import env from "dotenv";

env.config();

const obniz = new Obniz(process.env["OBNIZ_ID"] || "");

const threshold = 2.0
let isPressure = false;

obniz.onconnect = async () => {
  obniz.display?.print("watching iot stone");

  // 5V
  obniz.io0?.output(true);

  // Analog Input
  obniz.ad1?.start((voltage) => {
    isPressure = voltage < threshold;
  });

  // GND
  obniz.io2?.output(false);
};
