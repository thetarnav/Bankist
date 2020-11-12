<template>
	<footer class="footer">
		<ul class="footer__nav" :class="{ 'is-hidden': hide }">
			<li class="footer__item">
				<a class="footer__link" href="#">About</a>
			</li>
			<li class="footer__item">
				<a class="footer__link" href="#">Pricing</a>
			</li>
			<li class="footer__item">
				<a class="footer__link" href="#">Terms of Use</a>
			</li>
			<li class="footer__item">
				<a class="footer__link" href="#">Privacy Policy</a>
			</li>
			<li class="footer__item">
				<a class="footer__link" href="#">Careers</a>
			</li>
			<li class="footer__item">
				<a class="footer__link" href="#">Blog</a>
			</li>
			<li class="footer__item">
				<a class="footer__link" href="#">Contact Us</a>
			</li>
		</ul>
		<img src="/img/icon.png" alt="Logo" class="footer__logo" />
		<p class="footer__copyright">
			&copy; Copyright by
			<a
				class="footer__link twitter-link"
				target="_blank"
				href="https://twitter.com/jonasschmedtman"
				>Jonas Schmedtmann</a
			>. Use for learning or your portfolio. Don't use to teach. Don't claim
			as your own product.
		</p>
	</footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'Footer',
	data() {
		return {
			hide: false,
		}
	},
	mounted() {
		this.$el.querySelectorAll('.footer__item').forEach(el => {
			el.addEventListener('mouseenter', () => (this.hide = true))
			el.addEventListener('mouseleave', () => (this.hide = false))
		})
	},
})
</script>
