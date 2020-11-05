<template>
	<div class="nav-wrapper">
		<nav class="nav" ref="nav">
			<img
				id="logo"
				src="img/logo.png"
				alt="Bankist logo"
				class="nav__logo"
			/>
			<ul class="nav__links">
				<li class="nav__item">
					<a class="nav__link" href="#section--1">Features</a>
				</li>
				<li class="nav__item">
					<a class="nav__link" href="#section--2">Operations</a>
				</li>
				<li class="nav__item">
					<a class="nav__link" href="#section--3">Testimonials</a>
				</li>
				<li class="nav__item">
					<a class="nav__link nav__link--btn btn--show-modal" href="#"
						>Open account</a
					>
				</li>
			</ul>
		</nav>
		<GlobalEvents @scroll="handleScroll" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
// import debounce from 'lodash.debounce'
const debounce = require('lodash.debounce')

export default Vue.extend({
	name: 'Nav',
	data() {
		return {
			debouncedHandler: null,
		}
	},
	created() {
		this.debouncedHandler = debounce(this.handleScroll, 100)
	},
	methods: {
		handleScroll(e: Event): void {
			const el = this.$refs.nav,
				{ height } = el.getBoundingClientRect()

			if (window.scrollY > height) el.classList.add('sticky')
			else el.classList.remove('sticky')
		},
	},
})
</script>

<style lang="scss" scoped>
.counter {
	position: fixed;
	top: 50%;
	left: 50%;
}
</style>
