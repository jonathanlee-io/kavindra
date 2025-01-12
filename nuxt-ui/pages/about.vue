<script setup lang="ts">
</script>

<template>
  <section class="bg-gradient-to-b from-indigo-50 via-blue-100 to-blue-50 min-h-screen py-16 px-6" style="font-family: 'Trebuchet MS', 'Helvetica', sans-serif;">
    <!-- Hero Section -->
    <div class="text-center px-4">
      <h1
        class="text-5xl sm:text-6xl font-extrabold text-indigo-700 mb-6"
        style="text-shadow: 2px 2px 10px rgba(255, 204, 0, 0.6);"
      >
        Welcome to <span class="text-yellow-500">Kavindra</span>!
      </h1>
      <p class="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
        Kavindra is all about being <span class="text-indigo-700 font-medium">fun</span>, <span class="text-indigo-700 font-medium">accessible</span>, and <span class="text-indigo-700 font-medium">open-source</span>. Our mission is to make user feedback powerful and affordable while keeping things simple.
      </p>
      <a
        href="#features"
        class="inline-block bg-indigo-600 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-md transition-transform duration-300 hover:bg-indigo-800 hover:scale-105"
        style="box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.25);"
      >
        Learn More
      </a>
    </div>

    <!-- Features Section -->
    <div id="features" class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-16 px-4">
      <!-- Feature Block -->
      <div class="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105">
        <div class="text-indigo-700 text-5xl mb-6 mx-auto">
          <Icon name="mdi:account-supervisor" />
        </div>
        <h2 class="text-xl font-bold text-indigo-700 mb-2">Community-Driven</h2>
        <p class="text-gray-600 text-sm sm:text-base">
          We grow together with ideas and feedback from the community. It’s your platform, shaped by your needs.
        </p>
      </div>

      <!-- Feature Block -->
      <div class="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105">
        <div class="text-indigo-700 text-5xl mb-6 mx-auto">
          <Icon name="mdi:cash-multiple" />
        </div>
        <h2 class="text-xl font-bold text-indigo-700 mb-2">Cost-Effective</h2>
        <p class="text-gray-600 text-sm sm:text-base">
          Delivering top-notch solutions at a fraction of the cost. No excess, just focus on value.
        </p>
      </div>

      <!-- Feature Block -->
      <div class="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105">
        <div class="text-indigo-700 text-5xl mb-6 mx-auto">
          <Icon name="mdi:silverware-clean" />
        </div>
        <h2 class="text-xl font-bold text-indigo-700 mb-2">Clean Design</h2>
        <p class="text-gray-600 text-sm sm:text-base">
          Designed to be intuitive and light, making the feedback process seamless and enjoyable.
        </p>
      </div>

      <!-- Feature Block -->
      <div class="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105">
        <div class="text-indigo-700 text-5xl mb-6 mx-auto">
          <Icon name="mdi:image-filter-center-focus-strong-outline" />
        </div>
        <h2 class="text-xl font-bold text-indigo-700 mb-2">Actionable Insights</h2>
        <p class="text-gray-600 text-sm sm:text-base">
          Leverage targeted feedback to uncover actionable insights and drive growth for your business.
        </p>
      </div>
    </div>

    <!-- Call-to-Action Section -->
    <div class="text-center py-16 bg-white rounded-lg shadow-lg mt-16 mx-6 sm:mx-12 md:mx-32">
      <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
        Ready to Boost Your Growth?
      </h2>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
        Join a thriving community of businesses and creators who use Kavindra to simplify feedback processes and drive results. Let's grow together!
      </p>
      <a
        href="#get-started"
        class="inline-block bg-indigo-600 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-indigo-800 transition-transform duration-300 transform hover:scale-105"
        style="box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.25);"
      >
        Get Started for Free!
      </a>
    </div>
  </section>
</template>
