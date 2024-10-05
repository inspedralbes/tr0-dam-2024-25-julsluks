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
  <Navbar @response="(show) => showPage = show" />
  <!-- Your content goes here -->
  <main class="pt-16">
    <h1 class="text-center mt-8 text-3xl">Welcome to Quiz Administration</h1>
    <p class="text-center mt-4">Create, change, delete and more with the questions</p>
    <div v-if="!showPage.showQuestions && !showPage.showStatistics">
      <div class="flex justify-center items-center mt-12">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">Create a Question</h2>
        <h3 class="text-xs mb-3 text-gray-800 text-center">All camps are required</h3>
        <label for="question" class="block text-sm font-medium text-gray-700">Question</label>
        <input type="text" id="question" name="question" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm" />
        <label for="answer" class="block text-sm font-medium text-gray-700 mt-4">Correct Answer</label>
        <input type="text" id="answer" name="answer" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm" />
        <label for="answer" class="block text-sm font-medium text-gray-700 mt-4">Other Answers</label>
        <div class="flex mt-2 space-x-2">
          <input type="text" id="answer" name="answer" class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm" />
          <input type="text" id="answer" name="answer" class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm" />
        </div>
        <input type="text" id="answer" name="answer" class="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm" />
        <label for="answer" class="block text-sm font-medium text-gray-700 mt-4">Image URL</label>
        <input type="text" id="image-url" name="image-url" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm" />
        <button class="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">Create Question</button>
      </div>
    </div>
    </div>
    <div class="flex justify-center mt-8">
      <div v-if="showPage.showQuestions">
        <Questions />
      </div>
      <div v-if="showPage.showStatistics">
        <Statistics />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
