<template>
	<div>
		<nav>
			<p class="welcome">Welcome back, {{ userName }}</p>
		</nav>
		<main ref="app" class="app">
			<Balance />
			<Movements />
			<Summary />
			<Transfer />
			<Loan />
			<CloseAccount />
			<Timer />
			<a @click="logout">LOGOUT</a>
		</main>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'

export default Vue.extend({
	/** Get data on Server Side: */
	async fetch({ app, store }) {
		if (process.browser) return
		try {
			// Binds it on server side then unbind again to avoid memory leaks on the server.
			await store.dispatch('bindUserDocument')
			store.dispatch('unbindUserDocument')
		} catch (e) {
			console.error(e)
		}
	},
	computed: {
		...mapState(['userDocument']),
		...mapGetters(['userName']),
	},
	/**  Bind Vuexfire on client-side: */
	async mounted() {
		try {
			await this.$store.dispatch('bindUserDocument')
		} catch (e) {
			console.error(e)
		}
		;(this.$refs.app as HTMLElement).classList.add('loaded')
	},

	methods: {
		logout() {
			this.$fire.auth.signOut()
			this.$router.push({ path: '/' })
		},
	},
	head: {
		title: 'Account dashboard',
	},
	layout: 'empty',
	middleware: 'auth',
})
</script>

<style src="~/assets/dashboard.css"></style>

<style lang="scss" scoped>
.app.loaded {
	opacity: 1;
}
</style>
