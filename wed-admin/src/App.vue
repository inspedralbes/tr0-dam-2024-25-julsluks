<script setup>
import { ref } from 'vue';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="container mx-auto h-screen">
    <h1 class="text-3xl font-semibold mt-10">Welcome to MyApp</h1>
    <p class="mt-4">This is a simple Vue 3 application with Vite.</p>
  </div>
  <Footer />
</template>

<style scoped>

</style>
