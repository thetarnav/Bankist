import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

interface AuthUser {
	uid: string
	email: string
}
interface UserDocument {
	id: AuthUser['uid']
	email: AuthUser['email']
	name: string
	lastName: string
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
		return (
			((name || '') + lastName ? ` ${lastName}` : '') || email || 'anonymous'
		)
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
		if (!authUser) commit('SET_USER', null)
		else if (authUser.uid !== state.authUser?.uid) {
			commit('SET_USER', authUser)
			dispatch('bindUserDocument')
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
