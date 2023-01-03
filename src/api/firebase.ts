// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

import storage from '~/api/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABaX0UWF6qaA3O1Hl4roNO6Zqkn8_Si9U",
  authDomain: "entertainment-dive.firebaseapp.com",
  databaseURL: "https://entertainment-dive-default-rtdb.firebaseio.com",
  projectId: "entertainment-dive",
  storageBucket: "entertainment-dive.appspot.com",
  messagingSenderId: "1058045997483",
  appId: "1:1058045997483:web:56cc612276c6e0204ca2ee",
  measurementId: "G-RXDZ7RSLNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app)
const USER = 'user'

export async function login(email: string, password: string): Promise<string> {


	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password)
		const user = userCredential.user

		await storage.setItem(USER, user.uid)
		// localStorage.setItem('user', JSON.stringify(user.uid))

		return user.uid;
	} catch (error) {
		// console.error("Error while logging in")
		// console.error(error)

		throw new Error('Log in unsuccessful')
		
	}
}


export async function logout(): Promise<void> {
	try {
		await signOut(auth)

		storage.removeItem(USER)

	} catch (error) {
		console.error("Error while logging out")
		console.error(error)
	}
}

export async function saveMovieProgress(id: number, name: string, link: string) {

	const userId = await storage.getItem('user')

	try {
			const movieRef = ref(db, `/movies/${userId}/${id}`)

			set(movieRef, {
				link: link,
				name: name
			})
	} catch (error) {
		console.error('Error while saving progress.')
	}
}