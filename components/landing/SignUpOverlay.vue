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
		@submit="formSubmit"
		@input="logInput"
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
// interface FormValues {
// 	[name: string]: string
// }

export default Vue.extend({
	name: 'SignUpOverlay',
	data() {
		return {}
	},
	methods: {
		logInput(formValues: FormValues) {
			console.log(formValues)
		},
		formSubmit(formValues: FormValues) {
			console.log(formValues)
		},
		switchLoginOverlay() {
			this.$root.$emit('toggleSignUp')
			this.$root.$emit('toggleLogin')
		},
	},
})
</script>
