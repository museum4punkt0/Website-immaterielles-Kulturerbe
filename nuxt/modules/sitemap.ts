import { mkdirSync, writeFileSync } from 'fs'
import { Readable } from 'stream'
import { dirname } from 'path'
import { SitemapStream, streamToPromise } from 'sitemap'
import axios from 'axios'
import { defineNuxtModule, createResolver } from '@nuxt/kit'
import { PublicRuntimeConfig } from 'nuxt/schema'


// Andwendungen
const callAnwendungUrlApi = async (config: PublicRuntimeConfig, page = 1) : Promise<{ data: any[], meta: any }> => {
  const url = `${config.textContentBaseUri}/api/applications?fields[0]=slug&pagination[pageSize]=500&pagination[page]=${page}`
  const data = await axios.get(url, {})
  return data.data
}

const getAndwendungURLs = async (config: PublicRuntimeConfig) : Promise<Array<string>> => {
  let result: string[] = []
  let page = 1
  const pagination = { page: 0, pageCount: 0 }
  try {
    do {
      const response = await callAnwendungUrlApi(config, page)
      const { data, meta } = response
      result = result.concat(data?.map(d => `/anwendungen/${d.attributes.slug}`) ?? [])
      pagination.page = meta.pagination.page
      pagination.pageCount = meta.pagination.pageCount
      page += 1
    } while (pagination.page !== pagination.pageCount)
  } catch (e) {
    console.error(e)
  }
  return result
}

// Häuser
const callHausUrlApi = async (config: PublicRuntimeConfig, page = 1) : Promise<{ data: any[], meta: any }> => {
  const url = `${config.textContentBaseUri}/api/houses?fields[0]=slug&pagination[pageSize]=500&pagination[page]=${page}`
  const data = await axios.get(url, {})
  return data.data
}

const getHausURLs = async (config: PublicRuntimeConfig) : Promise<Array<string>> => {
  let result: string[] = []
  let page = 1
  const pagination = { page: 0, pageCount: 0 }
  try {
    do {
      const response = await callHausUrlApi(config, page)
      const { data, meta } = response
      result = result.concat(data?.map(d => `/haeuser/${d.attributes.slug}`) ?? [])
      pagination.page = meta.pagination.page
      pagination.pageCount = meta.pagination.pageCount
      page += 1
    } while (pagination.page !== pagination.pageCount)
  } catch (e) {
    console.error(e)
  }
  return result
}

//Cluster
const callClusterUrlApi = async (config: PublicRuntimeConfig, page = 1) : Promise<{ data: any[], meta: any }> => {
  const url = `${config.textContentBaseUri}/api/clusters?fields[0]=slug&pagination[pageSize]=500&pagination[page]=${page}`
  const data = await axios.get(url, {})
  return data.data
}

const getClusterURLs = async (config: PublicRuntimeConfig) : Promise<Array<string>> => {
  let result: string[] = []
  let page = 1
  const pagination = { page: 0, pageCount: 0 }
  try {
    do {
      const response = await callClusterUrlApi(config, page)
      const { data, meta } = response
      result = result.concat(data?.map(d => `/anwendungen/cluster/${d.attributes.slug}`) ?? [])
      pagination.page = meta.pagination.page
      pagination.pageCount = meta.pagination.pageCount
      page += 1
    } while (pagination.page !== pagination.pageCount)
  } catch (e) {
    console.error(e)
  }
  return result
}

export default defineNuxtModule({
  meta: {
    name: 'sitemap',
    version: '0.0.1',
    configKey: 'sitemap',
    compatibility: {  nuxt: "^3.3.1" },
  },
  defaults: {
    hostname: 'http://localhost:3000',
  },
  async setup(options, nuxt) {
    const $config = nuxt.options.runtimeConfig.public
    async function generateSitemap(routes) {
      const dynamicRoutes = [
        '/:slug(.*)*',
        '/anwendungen/:id',
        '/anwendungen/cluster/:id',        
        '/haeuser/:id',
        '/haeuser/:id'
      ];

      let sitemapRoutes = routes.map(route => route.path).filter((r) => !dynamicRoutes.includes(r))
      sitemapRoutes = sitemapRoutes.concat(await getAndwendungURLs($config))
      sitemapRoutes = sitemapRoutes.concat(await getHausURLs($config))
      sitemapRoutes = sitemapRoutes.concat(await getClusterURLs($config))
      // sitemapRoutes = sitemapRoutes.concat(await getFahrzeugURLs($config))
      // sitemapRoutes = sitemapRoutes.concat(await getMakeAndIds($config))
      // sitemapRoutes = sitemapRoutes.concat(getKontaktAndWerkstatt())
      // // https://github.com/ekalinin/sitemap.js#generate-a-one-time-sitemap-from-a-list-of-urls
      const stream = new SitemapStream({ hostname: options.hostname })
      return streamToPromise(Readable.from(sitemapRoutes).pipe(stream)).then(data => {
        return data.toString()
      })
    }

    function createSitemapFile(sitemap, filepath) {
      const dirPath = dirname(filepath)
      mkdirSync(dirPath, { recursive: true })
      writeFileSync(filepath, sitemap)
    }

    const resolver = createResolver(import.meta.url)
    const filePath = resolver.resolve(
      nuxt.options.srcDir,
      'node_modules/.cache/.sitemap/sitemap.xml'
    )

    nuxt.options.nitro.publicAssets = nuxt.options.nitro.publicAssets || []
    nuxt.options.nitro.publicAssets.push({
      baseURL: '/',
      dir: dirname(filePath),
    })

    nuxt.hook('pages:extend', async pages => {
      const sitemap = await generateSitemap(pages)
      createSitemapFile(sitemap, filePath)
      // Added output to confirm that the sitemap has been created at the end of the build process
      console.log('Sitemap created')
    })
  },
})

