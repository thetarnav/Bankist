<template>
	<div class="container">
		<Header />
		<Features />
		<Operations />
		<Testimonials />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	props: {
		login: {
			type: Boolean,
			default: false,
		},
	},
	head: {
		title: 'Welcome to Bankist',
	},
})
</script>
