<script setup lang="ts">
  import { useColorMode } from "#imports";
  import Toggle from '~/components/Ui/Toggle.vue';

  const colorMode = useColorMode();
  console.log(colorMode.preference);
</script>

<template>
  <nav
    class="bg-blue-800 px-6 py-4 shadow-lg"
    style="font-family: &quot;Trebuchet MS&quot;, &quot;Helvetica&quot;, sans-serif"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between">
      <!-- Logo -->
      <div class="text-2xl font-bold text-white">
        <a href="/" class="hover:underline">Kavindra</a>
      </div>

      <div>
        <Toggle @click="$colorMode.preference = (colorMode.preference === 'light') ? 'dark' : 'light'" >
          <Icon class="text-black dark:text-white" :name="(colorMode.preference === 'light') ? 'lucide:sun' : 'lucide:moon'" size="24" />
        </Toggle>
      </div>

      <a
        href="/about"
        class="hidden rounded-lg bg-blue-600 px-5 py-2 text-lg font-bold text-white shadow transition-all duration-300 hover:bg-blue-700 hover:shadow-lg lg:block"
      >
        About
      </a>
    </div>
  </nav>
</template>

<style scoped></style>
