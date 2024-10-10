<template>
    <div class="mb-4 mx-3">
        <h1 class="text-2xl text-center mb-4">All Questions</h1>
        <div id="accordion-open" data-accordion="open">
            <div v-for="(question, index) in questions" :key="index">
                <h2 :id="'accordion-open-heading-' + index">
                    <button type="button"
                        class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
                        @click="toggleAccordion(index)" :aria-expanded="openAccordions[index]"
                        :aria-controls="'accordion-open-body-' + index">
                        <span class="flex items-center">
                            <svg class="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            {{ question.question }}
                        </span>
                        <svg :class="{ 'rotate-180': openAccordions[index] }" class="w-3 h-3 shrink-0"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div v-show="openAccordions[index]" :id="'accordion-open-body-' + index"
                    class="p-5 border border-b-0 border-gray-200" :aria-labelledby="'accordion-open-heading-' + index">
                    <div class="grid grid-cols-3 gap-1 items-center max-w-[678px]">
                        <img :src="question.image" class="rounded-lg border" />
                        <ul>
                            <li v-for="(answer, index) in question.answers" class="p-2"
                                :class="answer.correct == true ? 'text-green-600' : 'text-red-600'">
                                ({{ answer.correct }}) {{ answer.answer }}
                            </li>
                        </ul>
                        <div class="flex flex-col justify-center items-center space-y-4">
                            <button @click="confirmDelete(question.id)"
                                class="bg-red-700/40 text-white px-3 py-1 rounded-lg text-lg hover:shadow hover:bg-red-700/70">
                                Delete
                            </button>
                            <button @click="openUpdateModal(question)"
                                class="bg-yellow-300/50 text-white px-3 py-1 rounded-lg text-lg hover:shadow hover:bg-yellow-300/80">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para confirmar eliminación -->
        <TransitionRoot as="template" :show="modalOpen">
            <Dialog class="relative z-10" @close="modalOpen = false">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild as="template" enter="ease-out duration-300"
                            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                            leave-from="opacity-100 translate-y-0 sm:scale-100"
                            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <DialogPanel
                                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="sm:flex sm:items-start">
                                        <div
                                            class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <DialogTitle as="h3"
                                                class="text-base font-semibold leading-6 text-gray-900">
                                                Confirm Deletion
                                            </DialogTitle>
                                            <div class="mt-2">
                                                <p class="text-sm text-gray-500">
                                                    Are you sure you want to delete this question? This action cannot be
                                                    undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button"
                                        class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        @click="deleteQuestion">
                                        Delete
                                    </button>
                                    <button type="button"
                                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        @click="modalOpen = false">
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Modal para actualizar pregunta -->
        <TransitionRoot as="template" :show="updateModalOpen">
            <Dialog class="relative z-10" @close="updateModalOpen = false">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild as="template" enter="ease-out duration-300"
                            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                            leave-from="opacity-100 translate-y-0 sm:scale-100"
                            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <DialogPanel
                                class="relative transform overflow-hidden rounded-lg bg-white flex flex-col text-center shadow-xl transition-all my-8 w-full max-w-lg">
                                <div class="bg-white p-6 pb-4 mx-auto">
                                    <div class="flex items-center">
                                        <div class="mt-3 text-center">
                                            <DialogTitle as="h3"
                                                class="text-base font-semibold leading-6 text-gray-900">
                                                Update Question
                                            </DialogTitle>
                                            <div class="mt-2">
                                                <label class="block mb-2 text-sm font-medium text-gray-700">
                                                    Question:
                                                </label>
                                                <input v-model="updatedQuestion.question" type="text"
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mx-auto text-center">

                                                <label class="block mt-4 mb-2 text-sm font-medium text-gray-700">
                                                    Image URL:
                                                </label>
                                                <input v-model="updatedQuestion.image" type="text"
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mx-auto text-center">

                                                <label class="block mt-4 mb-2 text-sm font-medium text-gray-700">
                                                    Answers:
                                                </label>
                                                <ul>
                                                    <li v-for="(answer, index) in updatedQuestion.answers" :key="index"
                                                        class="flex items-center gap-2 mb-2">
                                                        <input v-model="answer.answer" type="text"
                                                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mx-auto text-center">
                                                        <input type="checkbox" v-model="answer.correct"
                                                            class="form-checkbox h-5 w-5 text-green-600 rounded">
                                                        <span class="text-sm text-gray-700">Correct</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 space-x-3">
                                    <button type="button"
                                        class="inline-flex w-full justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 sm:ml-3 sm:w-auto"
                                        @click="saveUpdatedQuestion">
                                        Save
                                    </button>
                                    <button type="button"
                                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        @click="cancelUpdate">
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import { findAllQuestions, deleteQuestion as deleteQuestionAPI, updateQuestion as updateQuestionAPI } from '../communicationManager.js';

const questions = ref([]);
const openAccordions = ref([]);
const modalOpen = ref(false);
const questionToDelete = ref(null);
const updateModalOpen = ref(false);
const updatedQuestion = ref({ id: 0, question: '', answers: [], image: '' });

const loadQuestions = async () => {
    try {
        const response = await findAllQuestions();
        questions.value = response;
        openAccordions.value = response.map(() => false);
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
};

onMounted(loadQuestions);

const toggleAccordion = (index) => {
    openAccordions.value[index] = !openAccordions.value[index];
};

const confirmDelete = (id) => {
    questionToDelete.value = id;
    modalOpen.value = true;
};

const deleteQuestion = async () => {
    try {
        await deleteQuestionAPI(questionToDelete.value);
        modalOpen.value = false;
        questionToDelete.value = null;
        await loadQuestions();
    } catch (error) {
        console.error('Error deleting question:', error);
    }
};

const openUpdateModal = (question) => {
    updatedQuestion.value = JSON.parse(JSON.stringify(question));
    updateModalOpen.value = true;
};

const cancelUpdate = () => {
    updatedQuestion.value = { id: 0, question: '', answers: [], image: '' };
    updateModalOpen.value = false;
};


const saveUpdatedQuestion = async () => {
    const onlyOneCorrect = updatedQuestion.value.answers.filter(answer => answer.correct).length === 1;
    if (updatedQuestion.value.question.trim() === '' || !onlyOneCorrect) {
        alert('Question cannot be empty');
        return;
    } else {
        try {
            await updateQuestionAPI(updatedQuestion.value);
            updateModalOpen.value = false;
            await loadQuestions();
        } catch (error) {
            console.error('Error updating question:', error);
        }
    }
};
</script>

<style scoped></style>
