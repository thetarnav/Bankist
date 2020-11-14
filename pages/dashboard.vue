<template>
	<div>
		<nav>
			<p class="welcome">
				Welcome back, <span class="name">{{ userName }}</span>
			</p>
			<div class="links">
				<nuxt-link to="/" class="link">Home page</nuxt-link>
				<a class="logout-btn" @click="logout">
					<span>LOGOUT</span>
				</a>
			</div>
		</nav>
		<main ref="app" class="app">
			<Balance />
			<Movements />
			<Summary />
			<Transfer />
			<Loan />
			<CloseAccount />
			<Timer />
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
.logout-btn {
	padding: 0.5rem 1.3rem;
	background-color: var(--color-tertiary, red);
	border-radius: 2rem;
	font-size: 1.6rem;
	color: white;
	font-weight: 500;
}
.link {
	font-size: 1.6rem;
	text-decoration: none;
	font-weight: 500;
	padding: 0.5rem 1.3rem;
	background-color: white;
	border-radius: 2rem;
	margin-right: 2rem;
}
.name {
	color: var(--color-primary, green);
}
</style>
