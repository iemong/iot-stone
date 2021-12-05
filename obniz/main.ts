import Obniz from "obniz";
import env from "dotenv";

env.config();

const obniz = new Obniz(process.env["OBNIZ_ID"] || "");

obniz.onconnect = async () => {
  obniz.display?.print("hello!");
  if (obniz.switch) {
    obniz.switch.onchange = (state: string) => {
      console.log(state);
    };
  }
};
