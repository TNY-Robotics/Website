<template>
    <span>
        <template v-for="(segment, index) in parsedContent" :key="index">

            <br v-if="segment.type === 'break'" />

            <span v-else-if="segment.type === 'styled'" :class="segment.style">
                {{ segment.text }}
            </span>

            <span v-else>
                {{ segment.text }}
            </span>

        </template>
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    path: string,
    args?: Record<string, any>
}>()

const { t } = useI18n()

const stylePattern = /\[([a-zA-Z0-9_-]+)\]\(([^)]+)\)/g

const parsedContent = computed(() => {
    const rawText = t(props.path, props.args || {})
    const lines = rawText.split('\n')

    const finalSegments: any[] = []
    lines.forEach((line, lineIndex) => {
        let lastIndex = 0
        let match

        while ((match = stylePattern.exec(line)) !== null) {
            if (match.index > lastIndex) {
                finalSegments.push({
                    type: 'text',
                    text: line.slice(lastIndex, match.index)
                })
            }

            finalSegments.push({
                type: 'styled',
                style: match[1],
                text: match[2]
            })

            lastIndex = stylePattern.lastIndex
        }

        if (lastIndex < line.length) {
            finalSegments.push({
                type: 'text',
                text: line.slice(lastIndex)
            })
        }

        if (lineIndex < lines.length - 1) {
            finalSegments.push({ type: 'break' })
        }
    })

    return finalSegments
})
</script>