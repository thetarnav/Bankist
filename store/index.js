export const state = () => ({
	user: null,
})

export const mutations = {
	SET_USER: (state, user) => {
		if (!user) {
			state.user = null
		} else {
			const { uid, email } = user
			state.user = { uid, email }
		}
	},
}

export const actions = {
	onAuthStateChanged({ state, commit }, { authUser }) {
		commit('SET_USER', authUser)
	},
}

export const getters = {}
