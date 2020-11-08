<template>
	<div class="background-cover">
		<div class="modal">
			<button class="btn--close-modal" @click="$root.$emit('toggleLogin')">
				&times;
			</button>
			<h2 class="modal__header">Login to your account</h2>
			<form class="modal__form" @submit.prevent="checkForm">
				<label>Email Address</label>
				<input v-model.trim="email" type="email" required />
				<label>Password</label>
				<input v-model.trim="password" type="password" required />
				<button class="btn">Login &rarr;</button>
			</form>
			<p v-if="message" class="message">
				{{ message }}
			</p>
			<p class="go-to-sign-up">
				You don't have an account?
				<a @click="switchLoginOverlay">Open one in a few seconds!</a>
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'LoginOverlay',
	data() {
		return {
			email: '',
			password: '',
			message: '',
		}
	},
	methods: {
		checkForm() {
			const { password, email } = this
			if (!password || !email)
				this.message = 'Both email and password are required.'
			else {
				console.log('logging')
			}
		},
		switchLoginOverlay() {
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
.go-to-sign-up {
	font-size: 1.2rem;
	a {
		font-weight: 600;
		color: var(--color-primary, green);
	}
}
.modal__form {
	margin-bottom: 2rem;
}
.message {
	font-size: 1.2rem;
	color: var(--color-tertiary, red);
	font-weight: 600;
	margin: 0 auto;
}
</style>
