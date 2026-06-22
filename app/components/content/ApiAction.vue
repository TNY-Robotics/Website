<template>
    <div class="relative p-4 w-full h-fit rounded-lg border-2 bg-white dark:bg-slate-900"
        :class="{
            'border-slate-200 dark:border-slate-700' : props.impl === 'done',
            'border-yellow-300 dark:border-yellow-600 opacity-75' : props.impl === 'partial',
            'border-red-300 dark:border-red-600 opacity-75' : props.impl === 'nope'
        }">
        <div v-if="props.impl !== 'done'" class="absolute w-full h-full top-0 left-0" :class="{ 'bg-yellow-500/10': props.impl === 'partial', 'bg-red-500/10': props.impl === 'nope' }"></div>
        <div v-if="props.impl !== 'done'" class="absolute bottom-0 right-0 pt-1 pl-2 pr-1.5 pb-0.5 rounded-tl-lg text-sm text-slate-800"
            :class="{ 'bg-yellow-500': props.impl === 'partial', 'bg-red-500': props.impl === 'nope' }">
            {{ props.impl === 'partial' ? 'Partially Implemented' : 'Not Implemented' }}
        </div>

        <div v-if="props.impl === 'done'" class="absolute bottom-0 right-0 pt-1 pl-1 pr-0.5 pb-0.5 rounded-tl-lg bg-slate-200 dark:bg-slate-700 text-sm">
            <ProseCode>{{ formatHex(props.module.id) }}</ProseCode> - <ProseCode>{{ formatHex(props.action.id) }}</ProseCode>
        </div>

        <div class="flex flex-wrap justify-between items-center">
            <ProseH3 :id="`action-${props.action.name}`" class="m-0">
                {{ props.module.name }}.{{ props.action.name }}
            </ProseH3>
            <ProseP v-if="props.desc" class="m-0">
                <em class="text-slate-600 dark:text-slate-300"> {{ props.desc }} </em>
            </ProseP>
        </div>

        <div class="py-4">
            <hr class="border-2 border-slate-200 dark:border-slate-700 rounded-full" />
        </div>
        
        <div v-if="args && args.length">
            <ProseH4 class="m-0">Arguments</ProseH4>
            <div class="p-2 pl-4">
                <ul class="list-disc list-inside pl-4 space-y-2">
                    <li v-for="arg in args" :key="arg.name" class="space-x-2">
                        <strong>{{ arg.name }}</strong>
                        <ProseCode>
                            <NuxtLink v-if="!isTypeNative(arg.type)" :to="`#type-${getBaseType(arg.type).toLowerCase()}`">
                                {{ arg.type }}
                            </NuxtLink>
                            <span v-else>{{ arg.type }}</span>
                        </ProseCode>
                        <p class="inline"> - </p>
                        <ProseP class="inline">
                            <em class="text-slate-600 dark:text-slate-300"> {{ arg.desc }} </em>
                        </ProseP>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <ProseP class="m-0"><em class="text-slate-500 dark:text-slate-400">No arguments</em></ProseP>
        </div>

        <div class="py-2">
            <hr class="border-2 border-slate-100 dark:border-slate-700 border-dashed rounded-full" />
        </div>

        <div v-if="result && result.length">
            <ProseH4 class="m-0">Return Values</ProseH4>
            <div class="p-2 pl-4">
                <ul class="list-disc list-inside pl-4 space-y-2">
                    <li v-for="res in result" :key="res.name" class="space-x-2">
                        <strong>{{ res.name }}</strong>
                        <ProseCode>
                            <NuxtLink v-if="!isTypeNative(res.type)" :to="`#type-${getBaseType(res.type).toLowerCase()}`" class="hover:underline hover:text-primary-400">
                                {{ res.type }}
                            </NuxtLink>
                            <span v-else>{{ res.type }}</span>
                        </ProseCode>
                        <p class="inline"> - </p>
                        <ProseP class="inline">
                            <em class="text-slate-600 dark:text-slate-300"> {{ res.desc }} </em>
                        </ProseP>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            <ProseP class="m-0"><em class="text-slate-500 dark:text-slate-400">No return values</em></ProseP>
        </div>
    </div>
</template>

<script setup lang="ts">
type ArgType = 'uint32' | 'uint8' | 'int32' | 'int8' | 'float32' | 'bool' | 'string';
type Arg = { name: string; type: ArgType; desc: string; required: boolean };
type Res = { name: string; type: ArgType; desc: string };
type ImplState = 'done' | 'partial' | 'nope';

const nativeTypes: ArgType[] = ['uint32', 'uint8', 'int32', 'int8', 'float32', 'bool', 'string'];

function getBaseType(typeStr: string) {
    return typeStr.replace(/\[.*?\]/g, '');
}

function isTypeNative(type: string): boolean {
    return nativeTypes.includes(getBaseType(type) as ArgType);
}

function formatHex(num: number | string): string {
    if (typeof num === 'string') return num;
    const hexNum = num.toString(16).toUpperCase();
    return '0x' + '0'.repeat(2 - hexNum.length) + hexNum;
}

const props = defineProps({
    module: {
        type: Object as () => { name: string; id: number },
        required: true
    },
    action: {
        type: Object as () => { name: string; id: number },
        required: true
    },
    args: {
        type: Array as () => Arg[],
        required: true
    },
    result: {
        type: Object as () => Res[],
        required: false
    },
    desc: {
        type: String,
        required: false
    },
    impl: {
        type: String as () => ImplState,
        required: false,
        default: 'done'
    }
})
</script>