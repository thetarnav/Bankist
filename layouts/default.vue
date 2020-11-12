<template>
	<div>
		<Nav />
		<Nuxt />
		<Footer />
		<LoginOverlay v-show="overlay === 'login'" />
		<SignUpOverlay v-show="overlay === 'sign-up'" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'DefaultLayout',
	computed: {
		overlay(): string | null {
			const { overlay } = this.$route.query
			return typeof overlay === 'string' &&
				['login', 'sign-up'].includes(overlay)
				? overlay
				: null
		},
	},
	created() {
		this.$root.$on('toggleLogin', () => this.toggleOverlayQuery('login'))
		this.$root.$on('toggleSignUp', () => this.toggleOverlayQuery('sign-up'))
	},
	methods: {
		toggleOverlayQuery(name: string) {
			const overlayQuery = this.$route.query.overlay,
				overlay = overlayQuery === name ? undefined : name

			this.$router.push({ query: { overlay } })
		},
	},
})
</script>

<style src="~/assets/home.css"></style>
