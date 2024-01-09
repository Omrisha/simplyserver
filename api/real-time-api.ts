import { getAnalytics, isSupported } from "firebase/analytics";
import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { Database, EventType, child, get, getDatabase, off, onValue, ref } from "firebase/database";

const PERMISSION_DENIED_ACCESS_DENIED_CODE = 'PERMISSION_DENIED';

export interface RealTimeFetchParams {
    path: string;
}

export interface RealTimeSubcribeParams<T> {
    path: string;
    event?: EventType,
    callback: (value: T) => void,
}

export interface RealTimeUnsubcribeParams<T> {
    path: string;
    event?: EventType,
}

const firebaseConfig = {
    apiKey: "AIzaSyCbfyKcBZfwZ6EMalOchUYvQx6S7vWBXUc",
    authDomain: "remindme-4d78b.firebaseapp.com",
    databaseURL: "https://remindme-4d78b.firebaseio.com",
    projectId: "remindme-4d78b",
    storageBucket: "remindme-4d78b.appspot.com",
    messagingSenderId: "1081837200295",
    appId: "1:1081837200295:web:50cec7c970e2c40b018c82",
    measurementId: "G-GHYL75DZB8"
  };

const app = initializeApp(firebaseConfig);

const firebase = getDatabase(app);
const auth = getAuth(app);

export class RealTimeApi {
    constructor() {
        this.handleAuthenticationErrors = this.handleAuthenticationErrors.bind(this);
    }

    private handleAuthenticationErrors(error: FirebaseError) {
        if (error.code === PERMISSION_DENIED_ACCESS_DENIED_CODE) {
            auth.signOut();
        }
    }

    public connect (token: string) {
        return signInWithCustomToken(auth, token);
    }

    public disconnect() {
        return auth.signOut();
    }

    public fetch<T>({ path }: RealTimeFetchParams) {
        const dbRef = ref(firebase);
        return new Promise<T>((resolve, reject) => {
            get(child(dbRef, `{path}`)).then((snapshot) => {
                console.log(snapshot.val());
                resolve(snapshot.val());
            });
        });
    }

    public subscribe<T>({ path, callback, event = 'value' }: RealTimeSubcribeParams<T>) {
        const starCountRef = ref(firebase, path);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            callback(snapshot.val() as T);
        });
        
        return () => off(starCountRef);
    }

    public unsubscribe<T>({ path, event = 'value' }: RealTimeUnsubcribeParams<T>) {
        const starCountRef = ref(firebase, path);
        off(starCountRef);
    }
}

export default new RealTimeApi();