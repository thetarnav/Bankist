<template>
	<!-- <div class="background-cover">
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
				<input v-model.trim="name" type="text" />
				<label>Last Name</label>
				<input v-model.trim="lastName" type="text" />
				<label>Email Address</label>
				<input v-model.trim="email" type="email" required />
				<label>Password</label>
				<div class="password">
					<input v-model.trim="password" type="password" required />
					<div
						class="strength"
						:class="{ [passwordStrength]: password.length > 0 }"
					></div>
				</div>
				<button class="btn">Sign Up &rarr;</button>
			</form>
			<p v-if="message" class="message">
				{{ message }}
			</p>
			<p class="go-to-login">
				Already have an account?
				<a @click="switchLoginOverlay">Go to login</a>
			</p>
		</div>
	</div> -->
	<FormOverlay
		:fields="[
			{ name: 'name', label: 'Your name' },
			'lastName',
			{ name: 'email', label: 'Email:', type: 'email', required: true },
			{
				name: 'password',
				label: 'New passport:',
				type: 'password',
				required: true,
				showStrength: true,
				validate: true,
			},
		]"
		@submit="formSubmit"
	>
		<template v-slot:title>
			Open your bank account <br />
			in just <span class="highlight">5 minutes</span>
		</template>
		<template v-slot:footer
			><p>
				Already have an account?
				<a @click="switchLoginOverlay">Go to login</a>
			</p>
		</template>
	</FormOverlay>
</template>

<script lang="ts">
import Vue from 'vue'
import { validateEmail } from '~/plugins/utilities.ts'
const passwordStrength = require('check-password-strength')

interface FormValues {
	[name: string]: string
}

export default Vue.extend({
	name: 'SignUpOverlay',
	data() {
		return {
			name: '',
			lastName: '',
			email: '',
			password: '',
			message: '',
			passwordStrength: 'Weak',
		}
	},
	watch: {
		password() {
			if (!this.password) this.passwordStrength = 'Weak'
			else {
				let strength = passwordStrength(this.password).value
				if (strength === 'Weak')
					strength = this.password.length > 10 ? 'Medium' : 'Weak'

				this.passwordStrength = strength
			}
		},
	},
	methods: {
		formSubmit(formValues: FormValues) {
			console.log(formValues)
		},
		checkForm() {
			const { password, email } = this
			if (!password || !email)
				this.message = 'Email and password are required.'
			else if (!validateEmail(email))
				this.message = `${email} is not a valid email!`
			else if (this.passwordStrength === 'Weak')
				this.message = 'Please enter stronger password.'
			else {
				this.message = ''
				console.log(email)
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
.modal__form {
	margin-bottom: 2rem;
}
.go-to-login {
	font-size: 1.2rem;
	a {
		font-weight: 600;
		color: var(--color-primary, green);
	}
}
.message {
	font-size: 1.2rem;
	color: var(--color-tertiary, red);
	font-weight: 600;
	margin: 0 auto;
}
.strength {
	width: calc(100% - 2rem);
	margin: 0 1rem;
	height: 0.4rem;
	grid-column: 2;
	&.Weak {
		background: var(--color-tertiary, red);
	}
	&.Medium {
		background: var(--color-secondary, orange);
	}
	&.Strong {
		background: var(--color-primary, green);
	}
}
</style>
