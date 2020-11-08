export const state = () => ({
	email: '',
	userID: null,
})

export const mutations = {}

export const actions = {
	onAuthStateChanged({ state }, authPayload) {
		console.log(authPayload)
	},
}

export const getters = {}
