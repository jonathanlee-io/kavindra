<script setup lang="ts">
import {ref} from 'vue';

// State to track mobile menu open/close
const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<template>
  <nav class="bg-blue-800 shadow-lg px-6 py-4" style="font-family: 'Trebuchet MS', 'Helvetica', sans-serif;">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="text-2xl font-bold text-white">
        <NuxtLink to="/" class="hover:underline">Kavindra</NuxtLink>
      </div>

      <!-- Hamburger Menu Button (Hidden on larger screens) -->
      <button
        class="lg:hidden text-white text-3xl focus:outline-none"
        @click="toggleMenu"
        aria-label="Toggle navigation"
      >
        <span :class="menuOpen ? 'hidden' : 'block'">&#9776;</span> <!-- Hamburger -->
        <span :class="menuOpen ? 'block' : 'hidden'">&times;</span> <!-- Close icon -->
      </button>

      <!-- Links (Visible on larger screens) -->
      <ul
        class="sm:hidden flex md:flex lg:flex items-center space-x-6 text-lg"
        :class="menuOpen ? 'absolute top-16 left-0 w-full bg-blue-800 py-4 z-10' : ''"
      >
        <li class="text-white">
          <NuxtLink
            to="/about"
            class="hover:text-blue-300 transition duration-300"
          >About</NuxtLink>
        </li>
        <li class="text-white">
          <a
            href="#contact"
            class="hover:text-blue-300 transition duration-300"
          >Contact</a>
        </li>
      </ul>

      <!-- Call-to-Action Button -->
      <a
        href="#get-started"
        class="hidden lg:block bg-blue-600 text-white px-5 py-2 rounded-lg text-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow hover:shadow-lg"
      >
        Get Started
      </a>
    </div>

    <!-- CTA Button for Mobile (Shown when menu is open) -->
    <div v-if="menuOpen" class="flex lg:hidden justify-center mt-4">
      <a
        href="#get-started"
        class="bg-blue-600 text-white px-5 py-2 rounded-lg text-lg font-bold hover:bg-blue-700 transition-all duration-300"
      >
        Get Started
      </a>
    </div>
  </nav>
</template>

<style scoped>
</style>
