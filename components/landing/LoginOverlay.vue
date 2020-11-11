<template>
	<FormOverlay
		:fields="[
			{
				name: 'email',
				label: 'Email Address',
				type: 'email',
				required: true,
			},
			{
				name: 'password',
				type: 'password',
				required: true,
				validate: true,
			},
		]"
		submit-label="Login →"
		:message="message"
		@submit="formSubmit"
		@close="$root.$emit('toggleLogin')"
	>
		<template v-slot:title>
			Login to <span class="highlight">your account</span>.
		</template>
		<template v-slot:footer
			><p>
				You don't have an account?
				<a @click="switchLoginOverlay">Open one in a few seconds!</a>
			</p>
		</template>
	</FormOverlay>
</template>

<script lang="ts">
import Vue from 'vue'
import { FormValues } from '~/components/common/FormOverlay.vue'

export default Vue.extend({
	name: 'LoginOverlay',
	data() {
		return { message: '' }
	},
	methods: {
		async formSubmit(formValues: FormValues) {
			const { password, email } = formValues,
				{ auth, firestore } = this.$fire
			this.message = ''

			try {
				await auth.signInWithEmailAndPassword(email, password)
			} catch (error) {
				this.message = error.message
				return
			}
			if (auth.currentUser === null) {
				this.message = "Couldn't log in... Try again in a few minutes."
				return
			}
			this.$router.push({ path: '/dashboard' })
		},
		switchLoginOverlay() {
			this.$root.$emit('toggleSignUp')
			this.$root.$emit('toggleLogin')
		},
	},
})
</script>
