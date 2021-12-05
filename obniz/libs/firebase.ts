import { initializeApp, cert } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import * as path from "path";

const serviceAccount = require(path.resolve(
  __dirname,
  "../iot-stone-firebase-adminsdk-jejnp-0f4016e772.json"
));

export const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL:
    "https://iot-stone-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

export const db = getDatabase();
