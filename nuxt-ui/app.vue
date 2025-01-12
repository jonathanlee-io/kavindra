<script setup lang="ts">
import Navbar from '~/components/Ui/Navbar.vue';
import Container from '~/components/Ui/Container.vue';
import Toggle from '~/components/Ui/Toggle.vue';

import {useColorMode} from '#imports';

const colorMode = useColorMode();

useSeoMeta({
  title: "Kavindra",
  ogTitle: "Kavindra",
  description: "Gather feedback from your users",
  ogDescription: "Gather feedback from your users",
  ogImage: "/favicon.ico",
});
</script>

<template>
  <Navbar class="bg-blue-950">
    <Container class="flex h-14 items-center justify-between border border-b-0">
      <a class="font-semibold dark:text-white">Kavindra</a>
      <nav class="hidden items-center gap-5 sm:flex">
        <a
          v-for="l in ['Home', 'About', 'Register', 'Login']"
          :key="l"
          class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          :href="`${(l === 'Home') ? '/' : '/' + l.toLowerCase()}`"
        >{{ l }}</a
        >
        <Toggle @click="$colorMode.preference = (colorMode.preference === 'light') ? 'dark' : 'light'" >
          <Icon class="text-black dark:text-white" :name="(colorMode.preference === 'light') ? 'lucide:sun' : 'lucide:moon'" size="24" />
        </Toggle>
      </nav>
    </Container>
  </Navbar>
  <NuxtLoadingIndicator />
  <NuxtPage />
</template>

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
