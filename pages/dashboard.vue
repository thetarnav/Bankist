<template>
	<div ref="app" class="app">
		<Balance />
		<Movements />
		<Summary />
		<Transfer />
		<Loan />
		<CloseAccount />
		<Timer />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	computed: {
		userName(): string {
			return this.$fire.auth.currentUser?.displayName ?? 'not-found'
		},
	},
	mounted() {
		;(this.$refs.app as HTMLElement).classList.add('loaded')
	},
	methods: {
		logout() {
			this.$fire.auth.signOut()

			this.$router.push({ path: '/' })
		},
	},
	head: {
		link: [{ rel: 'stylesheet', href: '/css/dashboard.css' }],
		title: 'Account dashboard',
	},
	layout: 'empty',
})
</script>

<style lang="scss" scoped>
.app.loaded {
	opacity: 1;
}
</style>
