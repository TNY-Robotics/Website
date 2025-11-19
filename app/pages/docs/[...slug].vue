<template>
    <div class="flex grow pt-24 px-2 pb-2 space-x-2">
        <div class="flex w-1/4">
            <div class="flex flex-col w-full h-fit p-2 space-y-4">
                <h1 class="text-xl font-semibold pt-2 text-center"> Tables des matières </h1>
                <div>
                    <DocTreeView :tree="tree.children[0]" :current-path="page?.path" />
                </div>
            </div>
        </div>
        <Divider vertical />
        <div class="flex flex-col grow w-full space-y-4">
            <div v-if="page" class="flex w-full h-fit rounded-lg bg-white dark:bg-slate-900 p-4">
                <div v-for="(part, index) in filePathArray" class="flex justify-center items-center">
                    <NuxtLink
                        :to="part.path" class="p-0 text-lg font-semibold"
                        :class="part.path? 'hover:text-primary': ''"
                    >
                        {{ part.name }}
                    </NuxtLink>
                    <UIcon v-if="index < filePathArray.length-1" name="i-lucide-chevron-right" class="w-4 h-4 mx-2" />
                </div>
            </div>
            <div class="flex w-full max-w-[64em] mx-auto">
                <ContentRenderer v-if="page" :value="page" :prose="true" class="w-full" />
                <div v-else class="w-full p-4 text-center">
                    <h1 class="text-2xl font-semibold"> Document non trouvé </h1>
                    <p class="mt-2 text-lg"> Désolé, le document que vous recherchez n'existe pas. </p>
                    <UButton @click="router.back()" label="Retour" class="mt-8" icon="i-lucide-chevron-left" />
                </div>
            </div>
        </div>
        <Divider vertical />
        <div class="flex w-1/4">
            <div class="flex flex-col w-full h-fit p-2">
                <h1 class="text-xl font-semibold pt-2 text-center"> Contenu </h1>
                <div>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import DocTreeView from '~/components/DocTreeView.vue';

const route = useRoute()
const router = useRouter()

if (route.path === '/docs') {
    router.replace('/docs/TNY-360');
}

const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('docs').path(route.path.toLowerCase()).first()
});

const { data: allPages } = await useAsyncData('all-docs', () => {
    return queryCollection('docs').all()
});

const tree = ref<DocFolder>({
    isFolder: true,
    name: 'root',
    children: [],
});

const filePathArray = computed(() => {
    if (!page.value) return [];
    const stem = page.value.stem;
    const stemParts = stem.split('/').filter((part: string) => part.length > 0);
    if (stem.endsWith('/index')) {
        stemParts.pop();
    }
    const formattedParts = stemParts.map((part: any, index) => ({
        name: index < stemParts.length - 1
            ? part[0].toUpperCase() + part.slice(1)
            : page.value?.title || '',
        path: index < stemParts.length - 1
            ? '/' + stemParts.slice(0, stemParts.indexOf(part) + 1).join('/')
            : undefined
    }));
    return formattedParts.splice(1);
});

function buildDocTree(pages: Array<any>) : DocTree {
    const root: DocFolder = {
        isFolder: true,
        name: 'root',
        children: [],
    };

    pages.forEach(page => {
        const stem = page.stem;
        const folder = stem.endsWith('/')
            ? stem.substring(0, stem.slice(0, -1).lastIndexOf('/') + 1)
            : stem.substring(0, stem.lastIndexOf('/') + 1);
        const folderParts = folder.split('/').filter((part: string) => part.length > 0);

        let currentFolder = root;
        folderParts.forEach((part: any) => {
            let nextFolder = currentFolder.children.find(
                (child) => child.isFolder && child.name.toLowerCase() === part.toLowerCase()
            ) as DocFolder;

            if (!nextFolder) {
                nextFolder = {
                    isFolder: true,
                    name: part[0].toUpperCase() + part.slice(1),
                    path: '/' + folderParts.slice(0, folderParts.indexOf(part) + 1).join('/'),
                    children: [],
                };
                currentFolder.children.push(nextFolder);
            }
            currentFolder = nextFolder;
        });
        const fileName = page.title
            ? page.title.toString()
            : stem.substring(folder.length);
        if (stem && stem.split('/').pop() !== 'index') {
            currentFolder.children.push({
                isFolder: false,
                name: fileName[0].toUpperCase() + fileName.slice(1),
                path: page.path
            });
        }
        console.groupEnd();
    });

    return root;
}

tree.value = buildDocTree(allPages.value || []);

</script>
