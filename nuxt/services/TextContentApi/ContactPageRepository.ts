import { NuxtConfig } from 'nuxt3'
import getRepositoryBase from './Repository'
import { ImageTeaser } from '@/models/TextContent/Common'
import { ContactTeaser } from '@/models/TextContent/Contact'

const apiBasePath = 'contact-page'

const getRepository = (nuxtConfig: NuxtConfig) => {
  const apiFetch = getRepositoryBase(nuxtConfig.textContentBaseUri)

  return {
    async getHeaderTeaser () : Promise<ImageTeaser> {
      try {
        const response = await apiFetch(`${apiBasePath}/header-teaser`)
        return response
      } catch (e) {
        console.error(e); // eslint-disable-line
        throw e
      }
    },
    async getContactTeaser () : Promise<ContactTeaser> {
      try {
        const response = await apiFetch(`${apiBasePath}/contact-teaser`)
        return response
      } catch (e) {
        console.error(e); // eslint-disable-line
        throw e
      }
    },
  }
}

export default {
  getRepository,
}
