import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
	authUser: null as Object | null,
})
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
	SET_USER: (state, user) => {
		if (!user) {
			state.authUser = null
		} else {
			const { uid, email } = user
			state.authUser = { uid, email }
		}
	},
}

export const actions: ActionTree<RootState, RootState> = {
	onAuthStateChanged({ state, commit }, { authUser }) {
		commit('SET_USER', authUser)
	},
}
