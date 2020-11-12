<template>
	<section
		id="section--3"
		v-class-in-view.remove="'section--hidden'"
		class="section"
	>
		<div class="section__title section__title--testimonials">
			<h2 class="section__description">Not sure yet?</h2>
			<h3 class="section__header">
				Millions of Bankists are already making their lifes simpler.
			</h3>
		</div>

		<div v-swiper="swiperOptions" class="slider">
			<div class="swiper-wrapper">
				<!-- Slides -->
				<SwiperSlide class="slide slide--1">
					<div class="testimonial">
						<h5 class="testimonial__header">
							Best financial decision ever!
						</h5>
						<blockquote class="testimonial__text">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							Accusantium quas quisquam non? Quas voluptate nulla minima
							deleniti optio ullam nesciunt, numquam corporis et
							asperiores laboriosam sunt, praesentium suscipit
							blanditiis. Necessitatibus id alias reiciendis, perferendis
							facere pariatur dolore veniam autem esse non voluptatem
							saepe provident nihil molestiae.
						</blockquote>
						<address class="testimonial__author">
							<img
								src="/img/user-1.jpg"
								alt=""
								class="testimonial__photo"
							/>
							<h6 class="testimonial__name">Aarav Lynn</h6>
							<p class="testimonial__location">San Francisco, USA</p>
						</address>
					</div>
				</SwiperSlide>
				<SwiperSlide class="slide slide--2">
					<div class="testimonial">
						<h5 class="testimonial__header">
							The last step to becoming a complete minimalist
						</h5>
						<blockquote class="testimonial__text">
							Quisquam itaque deserunt ullam, quia ea repellendus
							provident, ducimus neque ipsam modi voluptatibus
							doloremque, corrupti laborum. Incidunt numquam perferendis
							veritatis neque repellendus. Lorem, ipsum dolor sit amet
							consectetur adipisicing elit. Illo deserunt exercitationem
							deleniti.
						</blockquote>
						<address class="testimonial__author">
							<img
								src="/img/user-2.jpg"
								alt=""
								class="testimonial__photo"
							/>
							<h6 class="testimonial__name">Miyah Miles</h6>
							<p class="testimonial__location">London, UK</p>
						</address>
					</div>
				</SwiperSlide>
				<SwiperSlide class="slide slide--3">
					<div class="testimonial">
						<h5 class="testimonial__header">
							Finally free from old-school banks
						</h5>
						<blockquote class="testimonial__text">
							Debitis, nihil sit minus suscipit magni aperiam vel tenetur
							incidunt commodi architecto numquam omnis nulla autem,
							necessitatibus blanditiis modi similique quidem. Odio
							aliquam culpa dicta beatae quod maiores ipsa minus
							consequatur error sunt, deleniti saepe aliquid quos
							inventore sequi. Necessitatibus id alias reiciendis,
							perferendis facere.
						</blockquote>
						<address class="testimonial__author">
							<img
								src="/img/user-3.jpg"
								alt=""
								class="testimonial__photo"
							/>
							<h6 class="testimonial__name">Francisco Gomes</h6>
							<p class="testimonial__location">Lisbon, Portugal</p>
						</address>
					</div>
				</SwiperSlide>
			</div>

			<button class="slider__btn slider__btn--left">&larr;</button>
			<button class="slider__btn slider__btn--right">&rarr;</button>
			<div class="dots"></div>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from 'vue'
import { SwiperSlide, directive } from 'vue-awesome-swiper'

export default Vue.extend({
	name: 'Testimonials',
	components: {
		SwiperSlide,
	},
	directives: {
		swiper: directive,
	},
	data() {
		return {
			swiperOptions: {
				speed: 600,
				pagination: {
					el: '.dots',
				},
				navigation: {
					nextEl: '.slider__btn--right',
					prevEl: '.slider__btn--left',
				},
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.swiper-container {
	margin-left: auto;
	margin-right: auto;
	position: relative;
	overflow: hidden;
	list-style: none;
	padding: 0;
	z-index: 1;
}

.swiper-wrapper {
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 1;
	display: flex;
	transition-property: transform;
	box-sizing: content-box;
}

.swiper-container-android .swiper-slide,
.swiper-wrapper {
	transform: translate3d(0px, 0, 0);
}

.swiper-slide {
	flex-shrink: 0;
	width: 100%;
	height: 100%;
	position: relative;
	transition-property: transform;
}
</style>
