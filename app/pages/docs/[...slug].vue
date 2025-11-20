<template>
    <div class="flex grow pt-24 px-2 pb-2 space-x-2">
        <!-- mobile side bar -->
        <div class="absolute top-22 w-full h-full bg-slate-700 z-20 transition-all" :style="sideBarOpen? 'left: 0px; opacity: 1;': 'left: -100%; opacity: 0;'">
            <div class="flex flex-col w-full h-fit p-2 space-y-4">
                <div>
                    <h1 class="text-xl font-semibold pt-2 text-center"> Tables des matières </h1>
                    <UButton icon="i-lucide-x" variant="ghost" color="neutral" class="absolute top-3 right-2" @click="closeSidebar" /> 
                </div>
                <div>
                    <DocTreeView :tree="(tree.children[0] as DocFolder)" :root="true" :current-path="page?.path" />
                </div>
            </div>
        </div>

        <div class="w-1/4 min-w-64 hidden lg:flex">
            <div class="flex flex-col w-full h-fit p-2 space-y-4">
                <h1 class="text-xl font-semibold pt-2 text-center"> Tables des matières </h1>
                <div>
                    <DocTreeView :tree="(tree.children[0] as DocFolder)" :root="true" :current-path="page?.path" />
                </div>
            </div>
        </div>
        <Divider vertical class="hidden lg:flex" />
        <div class="flex flex-col grow w-full space-y-4">
            <div v-if="page" class="flex w-full h-fit rounded-lg bg-white dark:bg-slate-900 p-4">
                <div class="flex items-center pr-4">
                    <UButton icon="i-lucide-list-indent-increase" variant="ghost" color="neutral" class="lg:hidden" @click="openSidebar" />
                </div>
                <div class="flex flex-wrap min-w-fit pr-4">
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
                <div class="items-center justify-end grow hidden xl:flex">
                    <UInput ref="searchInput" type="text" placeholder="Rechercher..." icon="i-lucide-search" :class="searchFocused? 'w-96': 'w-64'"
                        class="transition-all max-w-full" @focus="searchFocused = true" @blur="onSearchBlur"
                        v-model:model-value="searchQuery" :loading="searchLoading"
                    >
                        <template #trailing>
                            <UKbd value="/" />
                        </template>
                        <div v-if="searchFocused && searchResults?.length" class="z-20 p-2 show-down absolute w-full h-fit left-0 top-10 bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden">
                            <div class="overflow-y-auto h-full max-h-128">
                                <div class="flex flex-col space-y-2 h-fit min-h-fit">
                                    <div v-for="(item, index) in searchResults" :key="item.id"
                                        class="py-1 px-2 hover:bg-primary-500/[0.1] rounded-md border-2"
                                        :class="index === searchCursor ? 'border-primary-400/[0.75] bg-primary-500/[0.05]' : 'border-transparent'">
                                        <NuxtLink :to="item.path" class="flex flex-col">
                                            <div class="flex space-x-4">
                                                <div class="flex justify-center items-center">
                                                    <UIcon v-if="item.type === 'Document'" name="i-lucide-file-text" class="w-6 h-6 " />
                                                </div>
                                                <div>
                                                    <div class="flex space-x-1 w-fit bg-slate-100 dark:bg-slate-800 rounded px-1 pb-0.5">
                                                        <div v-for="(part, index) in miniPathParts(item.path)" class="flex space-x-1 justify-center items-end">
                                                            <p class="text-xs font-light"> {{ part }} </p>
                                                            <UIcon size="0.8em" name="i-lucide-chevron-right" v-if="index < miniPathParts(item.path).length -1" class="inline-block" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h2 class="font-semibold"> {{ item.title }} </h2>
                                                        <p class="text-sm text-neutral-600 dark:text-neutral-400"> {{ item.description }} </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </UInput>
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
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();

if (route.path === '/docs') {
    router.replace('/docs/TNY-360');
}

const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('docs').path(route.path.toLowerCase()).first()
});

const { data: allPages } = await useAsyncData('all-docs', () => {
    return queryCollection('docs').all()
});

useSeoMeta({
    title: `${page.value?.title || ''} | Documentation`,
    description: page.value?.description || 'Get comprehensive guides and resources for TNY-360 robotics projects.',
    ogTitle: `${page.value?.title || ''} | Documentation`,
    ogDescription: page.value?.description || 'Get comprehensive guides and resources for TNY-360 robotics projects.',
    ogUrl: 'https://tny-robotics.com' + route.path,
    ogImage: 'https://tny-robotics.com/icon-border.png',
    ogType: 'website',
    keywords: 'documentation, robot, robotics, furwaz, tny, 360, dog, education, kit, build, learn, coding, programming, arduino, esp32',
});
useHead(() => ({
    link: [ {rel: 'canonical', href: 'https://tny-robotics.com' + route.path}, ],
    htmlAttrs: { lang: locale.value }
}));

const tree = buildDocTree(allPages.value || []);

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

function buildDocTree(pages: Array<any>) : DocFolder {
    const root: DocFolder = {
        isFolder: true,
        name: 'root',
        children: [],
        expanded: ref(false),
    };

    // create all folders and files from pages
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
                    expanded: ref(false),
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
    });

    // Change folder names if they contain index.md files
    function updateFolderNames(folder: DocFolder) {
        folder.children.forEach(child => {
            if (child.isFolder) {
                const indexFile = pages.find(page => {
                    const stem = page.stem;
                    const folderStem = child.path?.substring(1)+'/index';
                    return stem === folderStem;
                });
                if (indexFile) {
                    child.name = indexFile.title;
                }
                updateFolderNames(child);
            }
        });
    }
    updateFolderNames(root);

    return root;
}

// expand the tree to the current page
if (filePathArray.value) {
    let currentNode = tree.children[0] as DocFolder;
    filePathArray.value.forEach(part => {
        const nextNode = currentNode.children.find(child => child.path?.toLowerCase() === part.path?.toLowerCase()) as DocFolder | undefined;
        if (nextNode && nextNode.isFolder) {
            nextNode.expanded.value = true;
            currentNode = nextNode;
        }
    });
}

const searchInput = ref<any>(null);
const searchFocused = ref(false);
const searchQuery = ref('');
const searchLoading = ref(false);
const searchResults = ref<Array<any>|null|undefined>(undefined);
const searchCursor = ref(-1);
const searchTimeout = ref<any>(null);

function onSearchBlur() { // set timeout to allow click event to register
    setTimeout(() => { searchFocused.value = false }, 50);
}

watch(searchQuery, (newVal) => {
    if (searchTimeout.value) clearTimeout(searchTimeout.value);
    if (newVal.length < 1) {
        searchResults.value = null;
        return;
    }
    searchTimeout.value = setTimeout(async () => {
        searchLoading.value = true;
        searchCursor.value = -1;
        try {
            const query = newVal.toLowerCase();
            const results = allPages.value?.filter(page => {
                const title = page.title?.toString().toLowerCase() || '';
                const description = page.description?.toString().toLowerCase() || '';
                return title.includes(query) || description.includes(query);
            });
            searchResults.value = results?.map(page => ({
                id: page.id,
                title: page.title,
                description: page.description,
                path: page.path,
                type: 'Document',
            }));
        } catch (err) {            
            searchResults.value = null;
        }
        searchLoading.value = false;
    }, 300);
});

onMounted(() => {
    const inputEl = searchInput.value.inputRef as HTMLInputElement;
    if (!inputEl) return;
    inputEl.addEventListener('keydown', (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') {
            searchResults.value = null;
            searchCursor.value = -1;
            searchQuery.value = '';
            inputEl.blur();
        } 
        if (!searchResults.value || searchResults.value.length === 0) return;
        if (ev.key === 'ArrowDown') {
            ev.preventDefault();
            if (searchCursor.value < searchResults.value.length - 1) {
                searchCursor.value += 1;
            } else {
                searchCursor.value = 0;
            }
        } else if (ev.key === 'ArrowUp') {
            ev.preventDefault();
            if (searchCursor.value > 0) {
                searchCursor.value -= 1;
            } else {
                searchCursor.value = searchResults.value.length - 1;
            }
        } else if (ev.key === 'Enter') {
            ev.preventDefault();
            const selectedItem = searchResults.value[searchCursor.value];
            if (selectedItem) {
                router.push(selectedItem.path);
                searchResults.value = null;
                searchCursor.value = -1;
                searchQuery.value = '';
                inputEl.blur();
            }
        }
    });

    window.addEventListener('keydown', (ev: KeyboardEvent) => {
        if (ev.key === '/' && (ev.target as HTMLElement).tagName !== 'INPUT' && (ev.target as HTMLElement).tagName !== 'TEXTAREA') {
            ev.preventDefault();
            inputEl.focus();
        }
    });
});

function miniPathParts(path: string) {
    const parts = path.split('/').filter(part => part.length > 0).splice(2);
    parts.pop();
    return parts;
}

const sideBarOpen = ref(false);
function openSidebar() {
    sideBarOpen.value = true;
}
function closeSidebar() {
    sideBarOpen.value = false;
}

</script>
