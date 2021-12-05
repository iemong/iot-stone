import Obniz from "obniz";
import env from "dotenv";

env.config();

const obniz = new Obniz(process.env["OBNIZ_ID"] || "");

obniz.onconnect = async () => {
  obniz.display?.print("watching iot stone");

  // 5V
  obniz.io0?.output(true);

  // Analog Input
  obniz.ad1?.start((voltage) => {
    console.log(voltage);
  });

  // GND
  obniz.io2?.output(false);
};
