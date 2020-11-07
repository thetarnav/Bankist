<template>
	<div class="background-cover">
		<div class="modal">
			<button class="btn--close-modal" @click="$root.$emit('toggleLogin')">
				&times;
			</button>
			<h2 class="modal__header">
				Open your bank account <br />
				in just <span class="highlight">5 minutes</span>
			</h2>
			<form class="modal__form">
				<label>First Name</label>
				<input type="text" />
				<label>Last Name</label>
				<input type="text" />
				<label>Email Address</label>
				<input type="email" />
				<button class="btn">Next step &rarr;</button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'LoginOverlay',
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
</style>
