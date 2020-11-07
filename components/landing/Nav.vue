<template>
	<div class="nav-wrapper">
		<nav class="nav" ref="nav">
			<img
				id="logo"
				v-scroll-to="0"
				src="img/logo.png"
				alt="Bankist logo"
				class="nav__logo"
				:class="{ hide: true, 'is-hidden': hide }"
			/>
			<ul class="nav__links">
				<li class="nav__item">
					<a
						v-scroll-to="'#section--1'"
						class="nav__link"
						:class="{ hide: true, 'is-hidden': hide }"
						>Features</a
					>
				</li>
				<li class="nav__item">
					<a
						v-scroll-to="'#section--2'"
						class="nav__link"
						href="#section--2"
						:class="{ hide: true, 'is-hidden': hide }"
						>Operations</a
					>
				</li>
				<li class="nav__item">
					<a
						v-scroll-to
						class="nav__link"
						href="#section--3"
						:class="{ hide: true, 'is-hidden': hide }"
						>Testimonials</a
					>
				</li>
				<li class="nav__item">
					<a
						class="nav__link nav__link--btn btn--show-modal"
						:class="{ hide: true, 'is-hidden': hide }"
						@click="$root.$emit('toggleLogin')"
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
const debounce = require('lodash.debounce')

export default Vue.extend({
	name: 'Nav',
	data() {
		return {
			debouncedHandler: null,
			hide: false,
		}
	},
	created() {
		this.debouncedHandler = debounce(this.handleScroll, 100)
	},
	mounted() {
		this.$el.querySelectorAll('.hide').forEach(el => {
			el.addEventListener('mouseenter', () => (this.hide = true))
			el.addEventListener('mouseleave', () => (this.hide = false))
		})
	},
	methods: {
		handleScroll(): void {
			const el: any = this.$refs.nav,
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
.is-hidden {
	&:not(:hover) {
		opacity: 0.6;
	}
}
</style>
