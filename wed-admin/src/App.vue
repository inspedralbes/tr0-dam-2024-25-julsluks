<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import Questions from './components/Questions.vue';
import Statistics from './components/Statistics.vue';

const showQuestions = ref(false);
const showStatistics = ref(false);

const showPage = ref({
  showQuestions: showQuestions.value,
  showStatistics: showStatistics.value
});
</script>

<template>
  <div>
    <Navbar @response="(show) => showPage = show"/>
    <!-- Your content goes here -->
    <main class="pt-16">
      <h1 class="text-center mt-8 text-3xl">Welcome to Quiz Administration</h1>
      <p class="text-center mt-4">Scroll down to see the fixed navbar in action.</p>

      <div class="flex justify-center mt-8">
        <div v-if="showPage.showQuestions">
          <Questions />
        </div>
        <div v-if="showPage.showStatistics">
          <Statistics />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
