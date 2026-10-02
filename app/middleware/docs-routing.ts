export default defineNuxtRouteMiddleware(async (to) => {
    const path = to.path.toLowerCase();

    const page = await queryCollection('docs').path(path).first();
        
    if (!page) {
        return; // will display 404 page
    }
    
    const isFolder = page.id.endsWith('index.md');
    
    if (isFolder && !to.path.endsWith('/')) {
        return navigateTo(to.path + '/', { replace: false, redirectCode: 302 });
    } else if (!isFolder && to.path.endsWith('/')) {
        return navigateTo(to.path.slice(0, -1), { replace: false, redirectCode: 302 });
    }
});