<template>
    <div ref="container" class="video-container">
        <video ref="videoRef" muted loop playsinline preload="none" :poster="poster" class="w-full h-full object-cover">
            <source v-if="shouldLoad" :src="src" type="video/mp4" />
        </video>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    src: { type: String, required: true },
    poster: { type: String, required: true }
})

const container = ref(null)
const videoRef = ref(null)
const shouldLoad = ref(false)
let observer = null

onMounted(() => {
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                shouldLoad.value = true

                nextTick(() => {
                    if (videoRef.value) {
                        console.log("Vidéo visible, tentative de lecture...")
                        videoRef.value.load()
                        videoRef.value.play().catch(err => {
                            console.log("Autoplay bloqué ou en attente d'interaction :", err)
                        }).then(() => {
                            console.log("Vidéo en lecture.")
                        })
                    }
                })
            } else {
                if (videoRef.value) {
                    videoRef.value.pause()
                    console.log("Vidéo mise en pause car elle n'est plus visible.")
                }
            }
        })
    }, {
        rootMargin: '200px',
        threshold: 0.1
    })

    if (container.value) {
        observer.observe(container.value)
    }
})

onUnmounted(() => {
    if (observer) observer.disconnect()
})
</script>