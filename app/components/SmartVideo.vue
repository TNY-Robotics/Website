<template>
    <div ref="container" class="video-container relative">
        
        <div v-if="isLoading && shouldLoad && !hasError" class="absolute inset-0 flex items-center justify-center z-10">
            <UIcon name="lucide:loader-2" class="animate-spin w-8 h-8 text-gray-500" />
        </div>

        <div v-if="hasError" class="absolute inset-0 flex flex-col items-center justify-center z-10">
            <UIcon name="lucide:video" class="w-8 h-8 text-red-500" />
            <span class="ml-2 text-red-500">Video not available</span>
        </div>

        <video 
            ref="videoRef" 
            :src="shouldLoad ? src : undefined"
            muted 
            loop 
            playsinline 
            preload="none" 
            :poster="poster" 
            class="w-full h-full object-cover"
            @waiting="isLoading = true"
            @canplay="isLoading = false"
            @playing="isLoading = false"
            @error="handleError"
        ></video>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
    src: { type: String, required: true },
    poster: { type: String, required: false }
})

const container = ref(null)
const videoRef = ref(null)
const observer = ref(null)

const shouldLoad = ref(false)
const isLoading = ref(false)
const hasError = ref(false)

const handleError = (e) => {
    hasError.value = true
    isLoading.value = false
}

onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                
                if (!shouldLoad.value && !hasError.value) {
                    shouldLoad.value = true
                    isLoading.value = true 
                }

                nextTick(() => {
                    if (videoRef.value && !hasError.value) {
                        videoRef.value.play().catch(err => {
                            if (err.name === 'AbortError') return;
                            
                            if (err.name === 'NotSupportedError') {
                                handleError(err);
                            }
                        })
                    }
                })
            } else {
                if (videoRef.value && !videoRef.value.paused) {
                    videoRef.value.pause()
                }
            }
        })
    }, {
        rootMargin: '200px',
        threshold: 0.1
    })

    if (container.value) {
        observer.value.observe(container.value)
    }
})

onUnmounted(() => {
    if (observer.value) {
        observer.value.disconnect()
    }
})
</script>