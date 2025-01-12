<script setup lang="ts">
  import GitHubStarPrompt from "~/components/landing-page/GitHubStarPrompt.vue";
</script>

<template>
  <section
    class="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-100 to-blue-50 px-6 py-16 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    style="font-family: &quot;Trebuchet MS&quot;, &quot;Helvetica&quot;, sans-serif"
  >
    <!-- Hero Section -->
    <div class="px-6 text-center">
      <NuxtImg src="/logo.svg" alt="Kavindra Logo" class="mx-auto mb-6" width="64" height="64" />
      <h1 class="mb-6 text-4xl font-bold text-gray-800 sm:text-5xl dark:text-gray-100">
        Welcome to <span class="text-indigo-600 dark:text-indigo-400">Kavindra</span>
      </h1>
      <p class="text-md mx-auto mb-8 max-w-2xl text-gray-600 sm:text-lg dark:text-gray-400">
        Empowering businesses with <span class="font-semibold text-indigo-600 dark:text-indigo-400">affordable</span> and
        <span class="font-semibold text-indigo-600 dark:text-indigo-400">scalable</span> feedback solutions. At Kavindra,
        we strive to make user feedback a strategic advantage for your success.
      </p>
    </div>

    <!-- Features Section -->
    <div
      id="features"
      class="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-12 px-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <!-- Feature Block -->
      <div
        class="transform rounded-xl bg-white p-8 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-800 dark:shadow-xl"
      >
        <div class="mx-auto mb-6 text-5xl text-indigo-700 dark:text-indigo-400">
          <Icon name="mdi:account-supervisor" />
        </div>
        <h2 class="mb-2 text-xl font-bold text-indigo-700 dark:text-indigo-400">Community-Driven</h2>
        <p class="text-sm text-gray-600 sm:text-base dark:text-gray-400">
          We grow together with ideas and feedback from the community. It’s your platform, shaped by
          your needs.
        </p>
      </div>

      <!-- Feature Block -->
      <div
        class="transform rounded-xl bg-white p-8 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-800 dark:shadow-xl"
      >
        <div class="mx-auto mb-6 text-5xl text-indigo-700 dark:text-indigo-400">
          <Icon name="mdi:cash-multiple" />
        </div>
        <h2 class="mb-2 text-xl font-bold text-indigo-700 dark:text-indigo-400">Cost-Effective</h2>
        <p class="text-sm text-gray-600 sm:text-base dark:text-gray-400">
          Delivering top-notch solutions at a fraction of the cost. No excess, just focus on value.
        </p>
      </div>

      <!-- Feature Block -->
      <div
        class="transform rounded-xl bg-white p-8 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-800 dark:shadow-xl"
      >
        <div class="mx-auto mb-6 text-5xl text-indigo-700 dark:text-indigo-400">
          <Icon name="mdi:silverware-clean" />
        </div>
        <h2 class="mb-2 text-xl font-bold text-indigo-700 dark:text-indigo-400">Clean Design</h2>
        <p class="text-sm text-gray-600 sm:text-base dark:text-gray-400">
          Designed to be intuitive and light, making the feedback process seamless and enjoyable.
        </p>
      </div>

      <!-- Feature Block -->
      <div
        class="transform rounded-xl bg-white p-8 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-800 dark:shadow-xl"
      >
        <div class="mx-auto mb-6 text-5xl text-indigo-700 dark:text-indigo-400">
          <Icon name="mdi:image-filter-center-focus-strong-outline" />
        </div>
        <h2 class="mb-2 text-xl font-bold text-indigo-700 dark:text-indigo-400">Actionable Insights</h2>
        <p class="text-sm text-gray-600 sm:text-base dark:text-gray-400">
          Leverage targeted feedback to uncover actionable insights and drive growth for your
          business.
        </p>
      </div>
    </div>

    <!-- Call-to-Action Section -->
    <div
      class="mx-6 mt-16 rounded-lg bg-white py-16 text-center shadow-lg sm:mx-12 md:mx-32 dark:bg-gray-800 dark:shadow-xl"
    >
      <h2 class="mb-6 text-3xl font-extrabold text-gray-800 sm:text-4xl dark:text-gray-100">
        Ready to Boost Your Growth?
      </h2>
      <p class="mx-auto mb-8 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
        Join a thriving community of businesses and creators who use Kavindra to simplify feedback
        processes and drive results. Let's grow together!
      </p>
      <a
        href="#get-started"
        class="inline-block transform rounded-full bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        style="box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.25)"
      >
        Get Started Today!
      </a>
    </div>
  </section>
  <GitHubStarPrompt />
</template>
