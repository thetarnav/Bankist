<template>
	<div class="dashboard">
		<p>Welcome to dashboard! {{ userName }}</p>

		<a @click="logout">LOGOUT</a>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	layout: 'empty',
	computed: {
		userName(): string {
			return this.$fire.auth.currentUser?.displayName ?? 'not-found'
		},
	},
	methods: {
		logout() {
			this.$fire.auth.signOut()

			this.$router.push({ path: '/' })
		},
	},
})
</script>

<style lang="scss" scoped></style>
