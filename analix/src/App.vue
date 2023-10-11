<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { Notivue, Notifications, NotivueSwipe, darkTheme, pastelTheme } from 'notivue'
import { isDark } from '@/composables'
onMounted(() => {
    gsap.to('#loading .logo', { y: -50, opacity: 0, duration: 0.5 })
    gsap.to('#loading .left', {
        rotateY: 45,
        x: '-130%',
        duration: 1,
        delay: 0.6,
    })
    gsap.to('#loading .right', {
        rotateY: -45,
        x: '130%',
        duration: 1,
        delay: 0.6,
        onComplete: () => {
            document.getElementById('loading')?.remove()
        },
    })
})

</script>

<template>
    <Notivue v-slot="item">
        <NotivueSwipe :item="item">
            <Notifications :item="item" :theme="((isDark) ? darkTheme : pastelTheme)" />
        </NotivueSwipe>
    </Notivue>
    <DialogsWrapper />
    <router-view />
</template>
