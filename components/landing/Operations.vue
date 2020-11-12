<template>
	<section
		id="section--2"
		v-class-in-view.remove="'section--hidden'"
		class="section"
	>
		<div class="section__title">
			<h2 class="section__description">Operations</h2>
			<h3 class="section__header">
				Everything as simple as possible, but no simpler.
			</h3>
		</div>

		<div class="operations">
			<div class="operations__tab-container">
				<button
					class="btn operations__tab operations__tab--1"
					:class="{ 'operations__tab--active': active === 0 }"
					@click="makeActive(0)"
				>
					<span>01</span>Instant Transfers
				</button>
				<button
					class="btn operations__tab operations__tab--2"
					:class="{ 'operations__tab--active': active === 1 }"
					@click="makeActive(1)"
				>
					<span>02</span>Instant Loans
				</button>
				<button
					class="btn operations__tab operations__tab--3"
					:class="{ 'operations__tab--active': active === 2 }"
					@click="makeActive(2)"
				>
					<span>03</span>Instant Closing
				</button>
			</div>

			<div
				class="operations__content operations__content--1"
				:class="{ 'operations__content--active': active === 0 }"
			>
				<div class="operations__icon operations__icon--1">
					<svg>
						<use xlink:href="/img/icons.svg#icon-upload"></use>
					</svg>
				</div>
				<h5 class="operations__header">
					Tranfser money to anyone, instantly! No fees, no BS.
				</h5>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
					enim ad minim veniam, quis nostrud exercitation ullamco laboris
					nisi ut aliquip ex ea commodo consequat.
				</p>
			</div>
			<div
				class="operations__content operations__content--2"
				:class="{ 'operations__content--active': active === 1 }"
			>
				<div class="operations__icon operations__icon--2">
					<svg>
						<use xlink:href="/img/icons.svg#icon-home"></use>
					</svg>
				</div>
				<h5 class="operations__header">
					Buy a home or make your dreams come true, with instant loans.
				</h5>
				<p>
					Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
					cupidatat non proident, sunt in culpa qui officia deserunt mollit
					anim id est laborum.
				</p>
			</div>
			<div
				class="operations__content operations__content--3"
				:class="{ 'operations__content--active': active === 2 }"
			>
				<div class="operations__icon operations__icon--3">
					<svg>
						<use xlink:href="/img/icons.svg#icon-user-x"></use>
					</svg>
				</div>
				<h5 class="operations__header">
					No longer need your account? No problem! Close it instantly.
				</h5>
				<p>
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
					officia deserunt mollit anim id est laborum. Ut enim ad minim
					veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
					ex ea commodo consequat.
				</p>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'Operations',
	data() {
		return {
			active: 0,
		}
	},
	methods: {
		makeActive(i: number) {
			this.active = i
		},
	},
})
</script>
