export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const baseURL = config.public.baseURL;
        const xml = await $fetch(`${baseURL}/config/sitemap.xml`,{
            headers: {
                accept: 'application/rss+xml'
            },
            responseType: 'text'
        })

        event.node.res.statusCode = 200
        event.node.res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
        event.node.res.end(xml) // 直接输出，不让 Nuxt 插手

    } catch (error) {
        console.error('RSS Proxy Error:', error)
        event.node.res.statusCode = 500
        event.node.res.end('Internal Server Error')
    }
})