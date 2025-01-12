<script setup lang="ts">
</script>

<template>
  <section class="bg-blue-50 min-h-screen py-12 px-6" style="font-family: 'Trebuchet MS', 'Helvetica', sans-serif;">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1
        class="text-4xl font-bold text-indigo-600 mb-4"
        style="text-shadow: 2px 2px #ffcc00;"
      >
        Welcome to Kavindra!
      </h1>
      <p class="text-lg text-gray-700 max-w-2xl mx-auto">
        Kavindra is a fun, simple, and open-source feedback platform committed to helping users grow
        while keeping costs low through the power of <span class="text-indigo-600 font-bold">direct user feedback</span>.
      </p>
    </div>

    <!-- Features Section -->
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
      <!-- Feature Block -->
      <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
        <div class="text-4xl mb-4 text-yellow-400">
          <span class="material-icons">thumb_up</span>
        </div>
        <h2 class="text-xl font-bold text-indigo-600 mb-2">Community-Driven</h2>
        <p class="text-gray-700">
          Built by the community, for the community. Your suggestions shape the platform, making it truly
          yours.
        </p>
      </div>

      <!-- Feature Block -->
      <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
        <div class="text-4xl mb-4 text-pink-400">
          <span class="material-icons">attach_money</span>
        </div>
        <h2 class="text-xl font-bold text-indigo-600 mb-2">Low-Cost Solution</h2>
        <p class="text-gray-700">
          By focusing on user input, we eliminate unnecessary overhead, delivering professional-quality services at the lowest cost possible.
        </p>
      </div>

      <!-- Feature Block -->
      <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
        <div class="text-4xl mb-4 text-green-400">
          <span class="material-icons">eco</span>
        </div>
        <h2 class="text-xl font-bold text-indigo-600 mb-2">Clean Design</h2>
        <p class="text-gray-700">
          Simple yet powerful tools wrapped in a light and cheerful design. Feedback doesn&apos;t have to be boring!
        </p>
      </div>

      <!-- Feature Block -->
      <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
        <div class="text-4xl mb-4 text-blue-400">
          <span class="material-icons">feedback</span>
        </div>
        <h2 class="text-xl font-bold text-indigo-600 mb-2">Focused Feedback</h2>
        <p class="text-gray-700">
          Feedback is meaningful and actionable. We ensure that your users’ voices are heard loud and clear.
        </p>
      </div>
    </div>

    <!-- Call-to-Action Section -->
    <div class="text-center mt-12">
      <a
        href="#get-started"
        class="inline-block bg-indigo-600 text-white text-lg font-bold py-3 px-6 rounded-full shadow-md hover:bg-indigo-800 transition-all duration-300 transform hover:scale-105"
        style="box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);"
      >
        Get Started for Free!
      </a>
    </div>
  </section>
</template>

<style scoped>
</style>
