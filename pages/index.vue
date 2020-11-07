<template>
	<div class="container">
		<Nav />
		<Header />
		<Features />
		<Operations />
		<Testimonials />
		<Footer />
		<LoginOverlay v-if="showLogin" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data() {
		return {
			showLogin: false,
		}
	},
	created() {
		this.$root.$on('toggleLogin', () => (this.showLogin = !this.showLogin))
	},
})
</script>

<style></style>
