<template>
	<div class="form-overlay background-cover">
		<div class="modal">
			<button class="btn--close-modal" @click="$emit('close')">
				&times;
			</button>
			<h2 class="modal__header">
				<slot name="title"></slot>
			</h2>
			<form class="modal__form" @submit.prevent="submit">
				<template v-for="(field, index) in getFields">
					<label :key="`${field.name}-label`">{{ label(field) }}</label>
					<div :key="`${field.name}-input`">
						<input
							v-model.trim="form[index]"
							:type="field.type || 'text'"
							:required="field.required"
						/>
						<div
							v-if="field.showStrength"
							class="strength"
							:class="passStrength(index)"
						></div>
					</div>
				</template>
				<button class="btn">{{ submitLabel }}</button>
			</form>
			<p v-if="message" class="message">
				{{ message }}
			</p>
			<p v-if="error" class="message">
				{{ error }}
			</p>
			<footer>
				<slot name="footer"> </slot>
			</footer>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { validateEmail, camelToLabel } from '~/plugins/utilities.ts'
const checkPasswordStrength = require('check-password-strength')

interface Field {
	name: string
	label?: string
	placeholder?: string
	type?: string
	required?: boolean
	showStrength?: boolean
	validate?: boolean
}
interface InputFields extends Array<Field | string> {}
export interface FormValues {
	[name: string]: string
}
type Strength = 'Weak' | 'Medium' | 'Strong' | ''

export default Vue.extend({
	name: 'FormOverlay',
	props: {
		fields: {
			type: Array as PropType<InputFields>,
			required: true,
		},
		message: {
			type: String,
			default: '',
		},
		submitLabel: {
			type: String,
			default: 'Send →',
		},
	},
	data() {
		return {
			form: [] as string[],
			error: '',
		}
	},
	computed: {
		getFields(): Field[] {
			return this.fields.map(field =>
				typeof field === 'string' ? { name: field } : (field as Field),
			)
		},
		formValues(): FormValues {
			const formValues: FormValues = {}
			this.getFields.forEach(
				(field, i) => (formValues[field.name] = this.form[i]),
			)
			return formValues
		},
	},
	watch: {
		form() {
			this.$emit('input', this.formValues)
		},
	},
	methods: {
		passStrength(i: number): Strength {
			const password = this.form[i] ?? ''
			let strength: Strength = ''
			if (password.length > 0)
				strength = checkPasswordStrength(password).value
			if (strength === 'Weak' && password.length > 10) strength = 'Medium'
			return strength
		},
		validate(): boolean {
			let isValid = true
			for (let i = 0; i < this.getFields.length; i++) {
				const field = this.getFields[i],
					value = this.formValues[field.name]

				if (field.required && value.length === 0) {
					this.error = 'Email and password are required.'
				} else if (
					field.type === 'email' &&
					field.validate &&
					!validateEmail(value)
				)
					this.error = `${value} is not a valid email!`
				else if (
					field.type === 'password' &&
					field.validate &&
					['', 'Weak'].includes(this.passStrength(i))
				)
					this.error = 'Please enter stronger password.'
				else {
					this.error = ''
					continue
				}
				isValid = false
				break
			}
			return isValid
		},
		submit() {
			if (!this.validate()) return
			this.$emit('submit', this.formValues)
		},
		label(field: Field): string {
			return field.label ?? camelToLabel(field.name ?? '')
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
