<template>
	<div class="form-overlay background-cover">
		<div class="modal">
			<button class="btn--close-modal" @click="$root.$emit('toggleSignUp')">
				&times;
			</button>
			<h2 class="modal__header">
				<slot name="title"></slot>
			</h2>
			<form class="modal__form">
				<template v-for="(field, index) in getFields">
					<label :key="`${field.name}-label`">{{ field.label }}</label>
					<div :key="`${field.name}-input`">
						<input
							v-model.trim="form[index]"
							:type="field.type || 'text'"
							:required="field.required"
						/>
						<div
							v-if="field.showStrength"
							class="strength"
							:class="passwordStrength(index)"
						></div>
					</div>
				</template>
				<button class="btn">Sign Up &rarr;</button>
			</form>
			<p v-if="message" class="message">
				{{ message }}
			</p>
			<footer>
				<slot name="footer"> </slot>
			</footer>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

const passwordStrength = require('check-password-strength')

interface Field {
	name: string
	label?: string
	placeholder?: string
	type?: string
	required?: boolean
	showStrength?: boolean
}
interface InputFields extends Array<Field | String> {}

export default Vue.extend({
	name: 'FormOverlay',
	props: {
		fields: {
			type: Array as PropType<InputFields>,
			default: [],
		},
	},
	data() {
		return {
			name: '',
			lastName: '',
			email: '',
			password: '',
			message: '',
			form: [] as String[],
		}
	},
	computed: {
		getFields(): Field[] {
			return this.fields.map(field =>
				typeof field === 'string' ? { name: field } : (field as Field),
			)
		},
	},
	methods: {
		passwordStrength(i: number): string {
			const password = this.form[i] ?? ''
			let strength: string = ''
			if (password.length > 0) strength = passwordStrength(password).value
			if (strength === 'Weak' && password.length > 10) strength = 'Medium'
			return strength
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

footer {
	p {
		font-size: 1.2rem;
	}
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
