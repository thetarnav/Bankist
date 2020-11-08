<template>
	<div class="container">
		<Nav />
		<Header />
		<Features />
		<Operations />
		<Testimonials />
		<Footer />
		<LoginOverlay v-if="showLogin" />
		<SignUpOverlay v-if="showSignUp" />
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
})
</script>

<style></style>
