<template>
	<div class="background-cover">
		<div class="modal">
			<button class="btn--close-modal" @click="$root.$emit('toggleLogin')">
				&times;
			</button>
			<h2 class="modal__header">Login to your account</h2>
			<form class="modal__form">
				<label>Email Address</label>
				<input type="email" />
				<label>Password</label>
				<input type="password" />
				<button class="btn">Login &rarr;</button>
			</form>
			<p class="go-to-sign-up">
				You don't have an account?
				<a @click="goToLogin">Open one in a few seconds!</a>
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'LoginOverlay',
})
</script>

<style lang="scss" scoped>
.background-cover {
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(black, 0.5);
}
.go-to-sign-up {
	font-size: 1.2rem;
	margin-top: 2rem;
	a {
		font-weight: 600;
		color: var(--color-primary, green);
	}
}
</style>
