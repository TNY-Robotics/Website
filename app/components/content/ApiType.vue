<template>
    <div :id="`type-${props.typeData.name.toLowerCase()}`" class="relative p-4 w-full h-fit rounded-lg border-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        
        <div class="flex flex-wrap  justify-between items-center">
            <ProseH3 :id="`type-${props.typeData.name.toLowerCase()}`" class="m-0">
                {{ props.typeData.name }}
            </ProseH3>
            <ProseP v-if="props.typeData.desc" class="m-0">
                <em class="text-slate-600 dark:text-slate-300"> {{ props.typeData.desc }} </em>
            </ProseP>
        </div>

        <div class="py-4">
            <hr class="border-2 border-slate-200 dark:border-slate-700 rounded-full" />
        </div>
        
        <div v-if="props.typeData.fields && props.typeData.fields.length">
            <ProseH4 class="m-0">Fields</ProseH4>
            <div class="p-2 pl-4">
                <ul class="list-disc list-inside pl-4 space-y-2">
                    <li v-for="field in props.typeData.fields" :key="field.name" class="space-x-2">
                        <strong>{{ field.name }}</strong>
                        
                        <ProseCode>
                            <NuxtLink v-if="!isTypeNative(field.type)" :to="`#type-${getBaseType(field.type).toLowerCase()}`" class="hover:underline hover:text-primary-400">
                                {{ field.type }}
                            </NuxtLink>
                            <span v-else>{{ field.type }}</span>
                        </ProseCode>
                        
                        <p class="inline"> - </p>
                        <ProseP class="inline">
                            <em class="text-slate-600 dark:text-slate-300"> {{ field.desc }} </em>
                        </ProseP>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <ProseP class="m-0"><em class="text-slate-500 dark:text-slate-400">No fields</em></ProseP>
        </div>
    </div>
</template>

<script setup lang="ts">
type ArgType = 'uint32' | 'uint8' | 'int32' | 'int8' | 'float32' | 'bool' | 'string';
const nativeTypes: ArgType[] = ['uint32', 'uint8', 'int32', 'int8', 'float32', 'bool', 'string'];

function getBaseType(typeStr: string) {
    return typeStr.replace(/\[.*?\]/g, '');
}

function isTypeNative(type: string): boolean {
    return nativeTypes.includes(getBaseType(type) as ArgType);
}

const props = defineProps({
    typeData: {
        type: Object as () => { name: string; desc: string; fields: { name: string, type: string, desc: string }[] },
        required: true
    }
})
</script>