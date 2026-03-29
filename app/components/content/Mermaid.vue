<template>
    <div>
        <div class="svg-center" v-if="svgContent" v-html="svgContent"></div>
        <span v-else-if="hasError" style="color: red;">Error in schema syntax</span>
        <span v-else> Generating schema ... </span>

        <div ref="slotContainer" style="display: none;">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import mermaid from 'mermaid'

const slotContainer = ref(null)
const svgContent = ref('')
const hasError = ref(false)

onMounted(async () => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (slotContainer.value) {
        const rawText = slotContainer.value.textContent || '';

        if (rawText.trim() !== '') {
            mermaid.initialize({ startOnLoad: false, theme: isDark ? 'dark' : 'neutral' });

            try {
                const id = `mermaid-${Math.round(Math.random() * 100000)}`;

                const { svg } = await mermaid.render(id, rawText.trim());
                svgContent.value = svg;
            } catch (error) {
                console.error("Error rendering Mermaid :", error);
                hasError.value = true;
            }
        }
    }
})
</script>

<style scoped>
.svg-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>