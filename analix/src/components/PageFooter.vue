<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
    <footer
        class="flex flex-col flex-shrink-0 w-full gap-2 px-6 py-4 lg:flex-row lg:justify-between"
    >
        <p class="text-sm text-gray-500 dark:text-gray-400">
            &#169;
            <span>{{ new Date().getFullYear() }}</span> Analix, All rights reserved
        </p>        
    </footer>
</template>
