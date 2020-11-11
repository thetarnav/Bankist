// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import * as functions from 'firebase-functions'

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin')
admin.initializeApp()

export default functions.https.onCall(
	async (uid, context): Promise<boolean> => {
		if (!uid) return false
		if (uid !== context?.auth?.uid) return false

		try {
			await admin.auth().deleteUser(uid)
			return true
		} catch {
			return false
		}
	},
)
