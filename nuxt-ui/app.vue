<template>
  <Navbar />
  <NuxtLoadingIndicator />
  <NuxtPage />
</template>

<script setup lang="ts">
import Navbar from '~/components/navbar/Navbar.vue';

useSeoMeta({
  title: 'Kavindra',
  ogTitle: 'Kavindra',
  description: 'Gather feedback from your users',
  ogDescription: 'Gather feedback from your users',
  ogImage: '/favicon.ico'
})
</script>

<style>
.page-enter-active :not(.js-widget-modal-menu),
.page-leave-active :not(.js-widget-modal-menu) {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
