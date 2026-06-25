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
                    <li v-for="field in props.typeData.fields" :key="field.fullName" class="space-x-2" :style="{ marginLeft: `${field.indent * 1.5}rem` }">
                        
                        <span v-if="field.indent > 0" class="text-slate-300 dark:text-slate-600">↳</span>
                        
                        <strong>{{ field.name }}</strong>
                        
                        <span v-if="field.type === 'struct'" class="inline-block px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-mono text-[10px] font-bold uppercase tracking-widest">
                            nested
                        </span>

                        <ProseCode v-else-if="isTypeNative(field.type)">{{ field.type }}</ProseCode>
                        
                        <NuxtLink 
                            v-else 
                            :to="`#type-${getBaseType(field.type).toLowerCase()}`" 
                            class="inline-block px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-mono text-sm hover:underline"
                        >
                            {{ field.type }}
                        </NuxtLink>
                        
                        <template v-if="field.desc">
                            <p class="inline"> - </p>
                            <ProseP class="inline">
                                <em class="text-slate-600 dark:text-slate-300"> {{ field.desc }} </em>
                            </ProseP>
                        </template>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else-if="props.typeData.values" class="mt-4">
            <ProseH4 class="m-0">Values</ProseH4>
            <div class="p-2 pl-4">
                <ul class="list-inside pl-4 space-y-2">
                    <li v-for="field in props.typeData.values" :key="field.name" class="space-x-2">
                        <ProseCode>{{ field.name }}</ProseCode>
                        
                        <template v-if="field.desc">
                            <p class="inline"> - </p>
                            <ProseP class="inline">
                                <em class="text-slate-600 dark:text-slate-300"> {{ field.desc }} </em>
                            </ProseP>
                        </template>
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
const nativeTypes: string[] = ['uint32', 'uint16', 'uint8', 'int32', 'int16', 'int8', 'float32', 'bool', 'string'];

function getBaseType(typeStr: string) {
    return typeStr.replace(/\[.*?\]/g, '');
}

function isTypeNative(type: string): boolean {
    return nativeTypes.includes(getBaseType(type));
}

const props = defineProps({
    typeData: {
        type: Object as () => { name: string; desc: string; fields: { name: string, fullName: string, type: string, desc: string, indent: number }[]; values: { name: string, desc: string }[] },
        required: true
    }
})
</script>