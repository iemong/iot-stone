import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyC7rv26peiXSqdpqFG1Y9oRk1IXsGC76PI',
  authDomain: 'iot-stone.firebaseapp.com',
  databaseURL:
    'https://iot-stone-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'iot-stone',
  storageBucket: 'iot-stone.appspot.com',
  messagingSenderId: '934817472997',
  appId: '1:934817472997:web:846440d1e9de6c960ecf0c',
}

export const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
