<template>
  <Navbar @response="(show) => showPage = show" />
  <main class="pt-16">
    <h1 class="text-center mt-8 text-3xl">Welcome to Quiz Administration</h1>
    <p class="text-center mt-4">Create, change, delete and more with the questions</p>
    <div v-if="!showPage.showQuestions && !showPage.showStatistics">
      <div class="flex justify-center items-center mt-12">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 class="text-2xl font-bold mb-6 text-gray-800 text-center">Create a Question</h2>
          <h3 class="text-xs mb-3 text-gray-800 text-center">All fields are required</h3>
          
          <!-- Question input -->
          <label for="question" class="block text-sm font-medium text-gray-700">Question</label>
          <input v-model="newQuestion.question" type="text" id="question" name="question" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm" />
          
          <!-- Answers input -->
          <label for="answer" class="block text-sm font-medium text-gray-700 mt-4">Answers</label>
          <div class="flex mt-2 space-x-2">
            <div v-for="newAnswer in newQuestion.answers">
              <input v-model="newAnswer.answer" type="text" class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"/>
            </div>
          </div>
          
          <!-- Image URL input -->
          <label for="image-url" class="block text-sm font-medium text-gray-700 mt-4">Image URL</label>
          <input v-model="newQuestion.image" type="text" id="image-url" name="image-url" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm" />
          
          <!-- Submit button -->
          <button @click="sendQuestion" class="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">Create Question</button>
        </div>
      </div>
    </div>
    
    <!-- Other pages -->
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

<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import Questions from './components/Questions.vue';
import Statistics from './components/Statistics.vue';
import { createQuestion } from './communicationManager.js';


const showQuestions = ref(false);
const showStatistics = ref(false);

const newQuestion = ref({
  "id": 0,
  "question": "",
  "answers": [
    { "id": 1, "answer": "", "correct": false },
    { "id": 2, "answer": "", "correct": false },
    { "id": 3, "answer": "", "correct": false },
    { "id": 4, "answer": "", "correct": false }
  ],
  "image": ""
});

const showPage = ref({
  showQuestions: showQuestions.value,
  showStatistics: showStatistics.value
});

function clearValues() {
  newQuestion.value.question = "";
  newQuestion.value.answers.forEach(answer => {
    answer.answer = "";
  });
  newQuestion.value.image = "";

  console.log(newQuestion.value);
  console.log(newQuestion.value.answers[0].answer);
  console.log(newQuestion.value.answers[1].answer);
  console.log(newQuestion.value.answers[2].answer);
  console.log(newQuestion.value.answers[3].answer);
}

function sendQuestion() {
  console.log(newQuestion.value);
  console.log(newQuestion.value.answers[0].answer);
  console.log(newQuestion.value.answers[1].answer);
  console.log(newQuestion.value.answers[2].answer);
  console.log(newQuestion.value.answers[3].answer);
  clearValues();
}
</script>

<style scoped></style>
