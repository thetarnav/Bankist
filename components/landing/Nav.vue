<template>
<nav class="nav">
   <img id="logo" src="img/logo.png" alt="Bankist logo" class="nav__logo" />
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
         <a class="nav__link nav__link--btn btn--show-modal" href="#">Open account</a>
      </li>
   </ul>
</nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
   name: 'Nav',
   data() {
      return {}
   },
})
</script>

<style lang="scss" scoped></style>
