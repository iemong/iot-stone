import Obniz from "obniz";

const obniz = new Obniz("number");

obniz.onconnect = async () => {
  obniz.display?.print("hello!");
  if (obniz.switch) {
    obniz.switch.onchange = (state: string) => {
      console.log(state);
    };
  }
};
