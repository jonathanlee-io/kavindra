<template>
  <Navbar />
  <NuxtLoadingIndicator />
  <NuxtPage />
</template>

<script setup lang="ts">
  import Navbar from "~/components/navbar/Navbar.vue";

  useSeoMeta({
    title: "Kavindra",
    ogTitle: "Kavindra",
    description: "Gather feedback from your users",
    ogDescription: "Gather feedback from your users",
    ogImage: "/favicon.ico",
  });
</script>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }

  body {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.8);
  }
  .dark-mode body {
    background-color: #091a28;
    color: #ebf4f1;
  }
</style>
