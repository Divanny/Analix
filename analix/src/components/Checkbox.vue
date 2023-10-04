<script setup>
    import { ref } from 'vue'

    const emit = defineEmits(['update:checked'])

    const props = defineProps({
        checked: {
            type: [Array, Boolean],
            default: false,
        },
        value: {
            default: null,
        },
    })

    const { value, checked } = props

    const isChecked = ref(checked)
</script>

<template>
    <input type="checkbox"
           :value="value"
           v-model="isChecked"
           class="text-teal-500 border-gray-300 rounded focus:border-teal-300 focus:ring focus:ring-teal-500 dark:border-gray-600 dark:bg-dark-eval-1 dark:focus:ring-offset-dark-eval-1"
           @change="$emit('update:checked', isChecked)" />
</template>
