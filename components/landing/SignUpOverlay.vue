<template>
	<div class="background-cover">
		<div class="modal">
			<button class="btn--close-modal" @click="$root.$emit('toggleSignUp')">
				&times;
			</button>
			<h2 class="modal__header">
				Open your bank account <br />
				in just <span class="highlight">5 minutes</span>
			</h2>
			<form class="modal__form" @submit.prevent="checkForm">
				<label>First Name</label>
				<input type="text" />
				<label>Last Name</label>
				<input type="text" />
				<label>Email Address</label>
				<input type="email" />
				<label>Password</label>
				<input type="password" />
				<button class="btn">Sign Up &rarr;</button>
			</form>
			<p class="go-to-login">
				Already have an account?
				<a @click="goToLogin">Go to login</a>
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'SignUpOverlay',
	methods: {
		checkForm() {
			console.log('form submitted by user')
		},
		goToLogin() {
			this.$root.$emit('toggleSignUp')
			this.$root.$emit('toggleLogin')
		},
	},
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
.go-to-login {
	font-size: 1.2rem;
	margin-top: 2rem;
	a {
		font-weight: 600;
		color: var(--color-primary, green);
	}
}
</style>
