export default defineNuxtRouteMiddleware(async (to) => {
    const path = to.path.toLowerCase();
    const VERSION_REGEX = /v(\d+\.)+\d+$/;
    
    const vKeys = useCookie<Record<string, string>>('docs-vkeys', { path: '/', default: () => ({}) });

    try {
        const page = await queryCollection('docs').path(path).first();
        
        if (!page) {
            throw new Error(`Page not found`);
        }
        
        const isFolder = page.id.endsWith('index.md');
        
        if (isFolder && !to.path.endsWith('/')) {
            return navigateTo(to.path + '/', { replace: true, redirectCode: 301 });
        } else if (!isFolder && to.path.endsWith('/')) {
            return navigateTo(to.path.slice(0, -1), { replace: true, redirectCode: 301 });
        }

        const vKey = page.meta['v-key'] as string | undefined;
        if (vKey) {
            const version = page.path.match(VERSION_REGEX)?.[0] || null;
            if (version) {
                vKeys.value[vKey] = version;
            }
        }
        
    } catch (e) {
        const isVersionedFile = (p: string) => VERSION_REGEX.test(p);
        const fileNameWithoutVersion = (p: string) => p.replace(VERSION_REGEX, '');
        
        const filepath = isVersionedFile(path) ? fileNameWithoutVersion(path) : path;
        
        const allPages = await queryCollection('docs').all();
        const results = allPages.filter(p => p.path.startsWith(filepath) && isVersionedFile(p.path));
        
        const allVersions = results.map(p => ({
            page: p,
            path: p.path,
            version: p.path.match(VERSION_REGEX)![0]
        }));

        if (!allVersions || allVersions.length === 0) {
            console.warn(`Path ${path} is detected as versioned, but no versions found.`);
            return;
        }

        const versionedPage = allVersions[0]?.page;
        if (!versionedPage) {
            console.warn(`Path ${path} is detected as versioned, but no versioned page found.`);
            return;
        }
        const vKey = versionedPage.meta['v-key'] as string | undefined;
        const storedVersion = vKey ? vKeys.value[vKey] : null;

        let targetPath = '';

        if (storedVersion) {
            const match = allVersions.find(v => v.version === storedVersion);
            targetPath = match ? match.path : allVersions[allVersions.length - 1]?.path || '';
        } else {
            targetPath = allVersions[allVersions.length - 1]?.path || '';
        }

        if (targetPath && targetPath !== path) {
            return navigateTo(targetPath, { redirectCode: 302 });
        }
    }
});