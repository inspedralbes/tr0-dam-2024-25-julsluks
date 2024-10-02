<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="flex flex-col items-center justify-center h-screen text-white bg-red-400">
    <Header />
  </div>
  <Footer class="fixed w-full bottom-0 left-0"/>
</template>

<style scoped>

</style>
