import {getApps,getApp,initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCqAYvcHuSK1Z-o4gGMM5g02Qr0DR1McSU",
  authDomain: "text-editor-ddc23.firebaseapp.com",
  databaseURL: "https://text-editor-ddc23-default-rtdb.firebaseio.com",
  projectId: "text-editor-ddc23",
  storageBucket: "text-editor-ddc23.appspot.com",
  messagingSenderId: "386076456805",
  appId: "1:386076456805:web:7ed57874cefd865d39138c"
};

export function fireaseInit() {
    const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    return firebaseApp;
}

export const firebaseApp = fireaseInit();
export const auth = getAuth(firebaseApp);