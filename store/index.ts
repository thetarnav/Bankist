import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

interface AuthUser {
	uid: string
	email: string
}
interface UserDocument {
	id: AuthUser['uid']
	email: AuthUser['email']
	name: string | null
	lastName: string | null
}

/**
 * STATE:
 */
export const state = () => ({
	authUser: null as AuthUser | null,
	userDocument: null as UserDocument | null,
})
export type RootState = ReturnType<typeof state>

/**
 * GETTERS:
 */
export const getters: GetterTree<RootState, RootState> = {
	userName: ({ userDocument }) => {
		if (!userDocument) return null
		const { name, lastName, email } = userDocument

		let userName = 'anonymous'
		if (name && lastName) userName = `${name} ${lastName}`
		else if (name) userName = name
		else if (lastName) userName = lastName
		else if (email) userName = email

		// return (
		// 	((name || '') + lastName ? ` ${lastName}` : '') ||
		// 	email ||
		// 	'anonymous'
		// ).trim()
		return userName.trim()
	},
}

/**
 * MUTATIONS:
 */
export const mutations: MutationTree<RootState> = {
	SET_USER: (state, user) => {
		if (!user) state.authUser = null
		else {
			const { uid, email } = user
			state.authUser = { uid, email }
		}
	},
	...vuexfireMutations,
}

/**
 * ACTIONS:
 */
export const actions: ActionTree<RootState, RootState> = {
	onAuthStateChanged({ state, commit, dispatch }, { authUser }) {
		if (authUser && authUser.uid !== state.authUser?.uid) {
			commit('SET_USER', authUser)
			dispatch('bindUserDocument')
		} else if (!authUser) {
			commit('SET_USER', null)
			dispatch('unbindUserDocument')
		}
	},
	getThis() {
		return this
	},
	bindUserDocument: firestoreAction(
		async ({ state, bindFirestoreRef, dispatch }) => {
			const docName = state.authUser?.uid,
				store = await dispatch('getThis')
			if (typeof docName !== 'string' || !store) return false

			const ref = store.$fire.firestore.collection('users').doc(docName)

			try {
				await bindFirestoreRef('userDocument', ref, { wait: true })
			} catch {
				return false
			}
			if (state.userDocument?.id === docName) return true
			return false
		},
	),
	unbindUserDocument: firestoreAction(({ unbindFirestoreRef }) => {
		unbindFirestoreRef('countDocument')
	}),
}
