// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_KEY,
	authDomain: `${process.env.VUE_APP_FIREBASE_PROJECT}.firebaseapp.com`,
	databaseURL: `https://${process.env.VUE_APP_FIREBASE_PROJECT}.firebaseio.com`,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT,
	storageBucket: `${process.env.VUE_APP_FIREBASE_PROJECT}.appspot.com`,
	messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER,
	appId: process.env.VUE_APP_FIREBASE_ID,
}

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require('firebase/app')

// Add the Firebase products that you want to use
require('firebase/firestore')
require('firebase/functions')

let firebaseApp
if (!firebase.length) {
	firebaseApp = firebase.initializeApp(firebaseConfig)
}
// Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig)

const firestore = firebaseApp.firestore(),
	functions = firebaseApp.functions()

export { firestore, functions }

export default firebase
