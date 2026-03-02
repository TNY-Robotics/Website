<template>
    <div class="flex grow pt-24 px-2 pb-2 space-x-2">
        <!-- mobile side bar -->
        <div class="absolute top-22 w-full h-full bg-slate-700 z-20 transition-all" :style="sideBarOpen? 'left: 0px; opacity: 1;': 'left: -100%; opacity: 0;'">
            <div class="flex flex-col w-full h-fit p-2 space-y-4">
                <div>
                    <h1 class="text-xl font-semibold pt-2 text-center"> {{ $t('docs.table') }} </h1>
                    <UButton icon="i-lucide-x" variant="ghost" color="neutral" class="absolute top-3 right-2" @click="closeSidebar" /> 
                </div>
                <div>
                    <DocTreeView :tree="(tree.children[0] as DocFolder)" :root="true" :current-path="page?.path" />
                </div>
            </div>
        </div>

        <div class="w-1/4 min-w-64 hidden lg:flex">
            <div class="flex flex-col w-full h-fit p-2 space-y-4">
                <h1 class="text-xl font-semibold pt-2 text-center"> {{ $t('docs.table') }} </h1>
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
                            {{ findDocDisplayName(part.path) }}
                        </NuxtLink>
                        <UIcon v-if="index < filePathArray.length-1" name="i-lucide-chevron-right" class="w-4 h-4 mx-2" />
                    </div>
                </div>
                <div class="items-center justify-end grow hidden xl:flex">
                    <UInput ref="searchInput" type="text" :placeholder="$t('docs.search')" icon="i-lucide-search" :class="searchFocused? 'w-96': 'w-64'"
                        class="transition-all max-w-full" @focus="searchFocused = true" @blur="onSearchBlur"
                        v-model:model-value="searchQuery" :loading="searchLoading"
                    >
                        <template #trailing>
                            <UKbd value="/" />
                        </template>
                        <div v-if="searchFocused" class="z-20 show-down absolute w-full h-fit left-0 top-10 bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden">
                            <div class="overflow-y-auto h-full max-h-128">
                                <div v-if="(searchResults !== undefined && searchResults !== null) && searchResults?.length" class="flex flex-col space-y-2 h-fit min-h-fit p-2">
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
                                <div v-else-if="searchResults === null">
                                    <div class="flex flex-col items-center justify-center h-full p-4 text-slate-500 space-y-2">
                                        <UIcon name="i-lucide-frown" size="3em" />
                                        <p class="text-center font-bold"> {{ $t('docs.notFound.title') }} </p>
                                        <p class="text-center"> {{ $t('docs.notFound.description') }} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </UInput>
                </div>
            </div>
            <div class="flex w-full max-w-[64em] mx-auto pb-8">
                <ContentRenderer v-if="page" :value="page" :prose="true" class="w-full" />
                <div v-else class="w-full p-4 text-center">
                    <h1 class="text-2xl font-semibold"> {{ $t('docs.docNotFound.title') }} </h1>
                    <p class="mt-2 text-lg"> {{ $t('docs.docNotFound.description') }} </p>
                    <UButton @click="router.back()" :label="$t('docs.back')" class="mt-8" icon="i-lucide-chevron-left" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();

let path = route.path.toLowerCase();

const { data: page } = await useAsyncData(path, () => {
    return queryCollection('docs').path(path).first()
});

const { data: allPages } = await useAsyncData('all-docs', () => {
    return queryCollection('docs').all()
});

// Little fix to avoid weird inconsistencies with links : ensure end slash for folders and no end slash for files
if (page.value) {
    const isFolder = page.value.id.endsWith('index.md'); // we always read index.md when reading a folder root
    if (isFolder && !route.path.endsWith('/')) {
        router.replace(route.path + '/');
    } else if (!isFolder && route.path.endsWith('/')) {
        router.replace(route.path.slice(0, -1));
    }
}

useSeoMeta({
    title: `${page.value?.seo.title || ''} - Documentation`,
    description: page.value?.seo.description || 'Get comprehensive guides and resources for TNY-360 robotics projects.',
    ogTitle: `${page.value?.seo.title || ''} - Documentation`,
    ogDescription: page.value?.seo.description || 'Get comprehensive guides and resources for TNY-360 robotics projects.',
    ogUrl: 'https://tny-robotics.com' + path,
    ogImage: 'https://tny-robotics.com/icon-border.png',
    ogType: 'website',
    keywords: 'documentation, robot, robotics, furwaz, tny, 360, dog, education, kit, build, learn, coding, programming, arduino, esp32',
});
useHead(() => ({
    link: [ {rel: 'canonical', href: 'https://tny-robotics.com' + path}, ],
    htmlAttrs: { lang: locale.value }
}));

const tree = buildDocTree(allPages.value || []);

const filePathArray = computed(() => {
    if (!page.value) return [];
    const path = page.value.path;
    const pathParts = path.split('/').filter((part: string) => part.length > 0);
    const formattedParts = pathParts.map((part: any, index) => ({
        name: findDocDisplayName(pathParts.slice(0, index + 1).join('/')),
        path: '/' + pathParts.slice(0, index + 1).join('/')
    }));
    return formattedParts.splice(1);
});

function buildDocTree(pages: Array<any>) : DocFolder {
    const root: DocFolder = {
        isFolder: true,
        name: 'root',
        id: '',
        children: [],
        expanded: ref(false),
    };

    // create all files from allPages variable, and build the tree from there
    pages.forEach(page => {
        const isIndexFile = page.stem.endsWith('index');
        const folderPath = isIndexFile? page.path : page.path.substring(0, page.path.lastIndexOf('/'));
        const folderPathParts = folderPath.split('/').filter((part: string) => part.length > 0);
        const folderId = page.id.substring(0, page.id.lastIndexOf('/'));
        const folderIdParts = folderId.split('/').filter((part: string) => part.length > 0);

        // navigate to the file location in our tree
        let currentFolder = root;
        folderPathParts.forEach((part: any, index: number) => {
            let nextFolder = currentFolder.children.find(
                (child) => child.isFolder && child.name.toLowerCase() === part.toLowerCase()
            ) as DocFolder;

            // if folder isn't found, create it
            if (!nextFolder) {
                nextFolder = {
                    isFolder: true,
                    name: part,
                    path: '/' + folderPathParts.slice(0, index+1).join('/'),
                    id: '/' + folderIdParts.slice(0, index+2).join('/'),
                    children: [],
                    expanded: ref(false),
                };
                currentFolder.children.push(nextFolder);
            }
            // continue to navigate down the tree
            currentFolder = nextFolder;
        });

        // now that we have the folder in currentFolder, create the file in it (if it's not the folder's index file)
        if (!page.id.endsWith('index.md')) {
            currentFolder.children.push({
                isFolder: false,
                name: page.title,
                path: page.path,
                id: page.id,
            });
        }
    });

    // Now that all the files have been gathered in the three,
    // do a second pass on the tree to update all folder names with the title of their index.md files

    function updateFolderNames(folder: DocFolder) {
        folder.children.forEach(child => {
            if (child.isFolder) {
                const indexFile = pages.find(page => {
                    const id = page.id;
                    const folderId = child.id.substring(1)+'/index.md';
                    return id === folderId;
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

function findDocDisplayName(path: string) {
    const node = findNodeByPath(tree, path.toLowerCase());
    return node ? node.name : path;
}

function findNodeByPath(node: DocFolder, path: string): DocFolder | DocFile | null {
    if (node.path?.toLowerCase() === path.toLowerCase()) {
        return node;
    }
    for (const child of node.children) {
        if (child.isFolder) {
            const found = findNodeByPath(child, path);
            if (found) {
                return found;
            }
        } else if (child.path?.toLowerCase() === path.toLowerCase()) {
            return child;
        }
    }
    // console.groupEnd();
    return null;
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

watch (searchFocused, (newVal) => {
    if (!newVal) {
        searchQuery.value = '';
        searchResults.value = undefined;
        searchCursor.value = -1;
    }
});

watch(searchQuery, (newVal) => {
    if (searchTimeout.value) clearTimeout(searchTimeout.value);
    if (newVal.length < 1) {
        searchResults.value = undefined;
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

        // display message if no results
        if (searchResults.value && searchResults.value.length === 0) {
            searchResults.value = null;
        }

        searchLoading.value = false;
    }, 300);
});

onMounted(() => {
    const inputEl = searchInput.value?.inputRef as HTMLInputElement;
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
