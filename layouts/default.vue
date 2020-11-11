<template>
	<div>
		<Nav />
		<Nuxt />
		<Footer />
		<LoginOverlay v-if="showLogin" />
		<SignUpOverlay v-else-if="showSignUp" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data() {
		return {
			showLogin: false,
			showSignUp: false,
		}
	},
	created() {
		this.$root.$on('toggleLogin', () => (this.showLogin = !this.showLogin))
		this.$root.$on('toggleSignUp', () => (this.showSignUp = !this.showSignUp))
	},
	head: {
		link: [{ rel: 'stylesheet', href: '/css/home.css' }],
	},
})
</script>

<style></style>
