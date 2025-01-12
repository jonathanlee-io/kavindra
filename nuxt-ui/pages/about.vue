<script setup lang="ts">
</script>

<template>
  <section class="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen py-16 px-6" style="font-family: 'Trebuchet MS', 'Helvetica', sans-serif;">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1
        class="text-5xl font-extrabold text-indigo-700 mb-4"
        style="text-shadow: 2px 2px 8px rgba(255, 204, 0, 0.8);"
      >
        Welcome to <span class="text-yellow-500">Kavindra</span>!
      </h1>
      <p class="text-xl text-gray-700 max-w-2xl mx-auto">
        Kavindra is <span class="text-indigo-700 font-semibold">fun</span>, <span class="text-indigo-700 font-semibold">simple</span>, and <span class="text-indigo-700 font-semibold">open-source</span>! We are committed to helping users grow through <span class="text-yellow-500 font-bold underline decoration-2">direct user feedback</span>, while staying budget-friendly.
      </p>
    </div>

    <!-- Features Section -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <!-- Feature Block -->
      <div class="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
        <div class="text-5xl mb-6 text-indigo-700 mx-auto">
          <Icon name="mdi:account-supervisor" />
        </div>
        <h2 class="text-2xl font-bold text-indigo-700 mb-2">Community-Driven</h2>
        <p class="text-gray-600">
          Built for the community, by the community. Your suggestions shape our features and functionality.
        </p>
      </div>

      <!-- Feature Block -->
      <div class="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
        <div class="text-5xl mb-6 text-indigo-700 mx-auto">
          <Icon name="mdi:cash-multiple" />
        </div>
        <h2 class="text-2xl font-bold text-indigo-700 mb-2">Low-Cost Solution</h2>
        <p class="text-gray-600">
          Delivering powerful solutions at an affordable price without compromising quality or user experience.
        </p>
      </div>

      <!-- Feature Block -->
      <div class="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
        <div class="text-5xl mb-6 text-indigo-700 mx-auto">
          <Icon name="mdi:silverware-clean" />
        </div>
        <h2 class="text-2xl font-bold text-indigo-700 mb-2">Clean Design</h2>
        <p class="text-gray-600">
          A beautifully simple interface ensures that collecting and managing feedback is both intuitive and delightful.
        </p>
      </div>

      <!-- Feature Block -->
      <div class="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
        <div class="text-5xl mb-6 text-indigo-700 mx-auto">
          <Icon name="mdi:image-filter-center-focus-strong-outline" />
        </div>
        <h2 class="text-2xl font-bold text-indigo-700 mb-2">Focused Feedback</h2>
        <p class="text-gray-600">
          Deliver actionable insights by ensuring your users’ voices are heard for meaningful growth.
        </p>
      </div>
    </div>

    <!-- Call-to-Action Section -->
    <div class="text-center mt-16">
      <a
        href="#get-started"
        class="inline-block bg-indigo-600 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg hover:bg-indigo-800 transition-all duration-300 transform hover:scale-105"
        style="box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.3);"
      >
        Get Started Today!
      </a>
    </div>
  </section>
</template>
