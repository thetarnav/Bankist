<template>
	<FormOverlay
		:fields="[
			{ name: 'name', label: 'Your name' },
			'lastName',
			{ name: 'email', label: 'Email*', type: 'email', required: true },
			{
				name: 'password',
				label: 'Passport*',
				type: 'password',
				required: true,
				showStrength: true,
				validate: true,
			},
		]"
		submit-label="Sing up →"
		:message="message"
		@submit="formSubmit"
		@close="$root.$emit('toggleSignUp')"
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
import { FormValues } from '~/components/common/FormOverlay.vue'

export default Vue.extend({
	name: 'SignUpOverlay',
	data() {
		return { message: '' }
	},
	methods: {
		async formSubmit(formValues: FormValues) {
			const { password, email } = formValues,
				{ auth, firestore } = this.$fire
			this.message = ''

			/**
			 * CREATING USER
			 */
			try {
				await auth.createUserWithEmailAndPassword(email, password)
			} catch (error) {
				this.message = error.message
				return
			}
			if (auth.currentUser === null) return

			/**
			 * CREATING FIRESTORE DOCUMENT
			 */
			const { uid } = auth.currentUser
			try {
				await firestore
					.collection('users')
					.doc(uid)
					.set({
						email,
						name: formValues.name ?? null,
						lastName: formValues.lastName ?? null,
					})
			} catch (error) {
				this.message = error.message
				this.$fire.functions.httpsCallable('deleteUser')(uid)
				return
			}

			window.localStorage.setItem('signedBefore', 'true')
		},
		switchLoginOverlay() {
			this.$root.$emit('toggleSignUp')
			this.$root.$emit('toggleLogin')
		},
	},
})
</script>
