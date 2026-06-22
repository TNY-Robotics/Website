<template>
    <div class="flex flex-col gap-4">
        <ApiType
            v-for="typeData in usedTypes"
            :key="typeData.name"
            :typeData="typeData"
        />

        <div v-if="!usedTypes || usedTypes.length === 0" class="text-slate-600 dark:text-slate-300 italic">
            No custom types found in the actions of the "{{ props.module }}" module.
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import apiModules from '~/assets/modules.json';
import apiTypes from '~/assets/types.json';

const props = defineProps({
    module: {
        type: String,
        required: true
    }
});

const nativeTypes = ['uint32', 'uint8', 'int32', 'int8', 'float32', 'bool', 'string'];

function getBaseType(typeStr: string) {
    return typeStr.replace(/\[.*?\]/g, '');
}

const usedTypes = computed(() => {
    const actions = (apiModules as any)[props.module] || [];
    const typesQueue: string[] = [];
    const processedNames = new Set<string>();
    const result: any[] = [];

    // 1. On remplit la file d'attente (en nettoyant le type)
    actions.forEach((action: any) => {
        if (action.args) {
            action.args.forEach((arg: any) => typesQueue.push(getBaseType(arg.type)));
        }
        if (action.result) {
            action.result.forEach((res: any) => typesQueue.push(getBaseType(res.type)));
        }
    });

    // 2. On traite la file d'attente...
    while (typesQueue.length > 0) {
        const typeName = typesQueue.shift(); 
        
        if (!typeName || nativeTypes.includes(typeName) || processedNames.has(typeName)) {
            continue;
        }

        const typeData = (apiTypes as any)[typeName];
        if (typeData) {
            result.push(typeData);
            processedNames.add(typeName);

            // 3. Et on nettoie aussi quand on fouille dans les sous-types !
            if (typeData.fields) {
                typeData.fields.forEach((field: any) => {
                    const baseFieldType = getBaseType(field.type);
                    if (!nativeTypes.includes(baseFieldType) && !processedNames.has(baseFieldType)) {
                        typesQueue.push(baseFieldType);
                    }
                });
            }
        }
    }

    return result;
});
</script>