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
		@submit="formSubmit"
		@input="logInput"
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
