<template>
    <TransitionRoot :show="isOpen" as="template">
      <Dialog as="div" class="relative z-10" @close="closeModalWith('cancel')">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white dark:bg-dark-eval-1 dark:text-gray-100 px-6 mx-11 pt-5 pb-4 text-left shadow-xl transition-all sm:my-4 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    class="rounded-md bg-white dark:bg-dark-eval-1 dark:text-gray-100 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    @click="$emit('cancel')"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div class="sm:flex sm:items-center">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <ExclamationTriangleIcon
                      class="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                      >{{ question }}</DialogTitle
                    >
                  </div>
                </div>
                <div class="mt-5 sm:mt-7 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    @click="closeModalWith('confirm')"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Confirmar
                  </button>
                  <button
                    type="button"
                    @click="closeModalWith('cancel')"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm  dark:focus:ring-gray-500 dark:bg-transparent focus:outline-none dark:text-gray-300 dark:border-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
                  >
                    Cancelar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script>
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  } from "@headlessui/vue";
  import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/vue/24/outline";
  
  export default {
    name: "ConfirmModal",
    props: {
      open: Boolean,
      question: String,
    },
    components: {
      TransitionChild,
      Dialog,
      DialogPanel,
      DialogTitle,
      TransitionRoot,
      ExclamationTriangleIcon,
      XMarkIcon,
    },
    data: () => {
      return { isOpen: true };
    },
    emits: ["confirm", "cancel"],
    methods: {
      closeModalWith: function (value) {
        this.isOpen = false;
  
        setTimeout(() => {
          this.$emit(value);
        }, 300);
      },
    },
  };
  </script>