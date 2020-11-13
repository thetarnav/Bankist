import { GetterTree, ActionTree, MutationTree } from 'vuex'

/**
 * STATE:
 */
export const state = () => ({
	authUser: null as Object | null,
})
export type RootState = ReturnType<typeof state>

/**
 * GETTERS:
 */
export const getters: GetterTree<RootState, RootState> = {}

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
}

/**
 * ACTIONS:
 */
export const actions: ActionTree<RootState, RootState> = {
	onAuthStateChanged({ state, commit }, { authUser }) {
		commit('SET_USER', authUser)
	},
}
