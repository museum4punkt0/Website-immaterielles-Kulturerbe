import { NuxtConfig } from 'nuxt3'
import getRepositoryBase from './Repository'
import { ImageTeaser } from '@/models/TextContent/Common'
import { BiddingsCalendar, HeaderTeaser } from '@/models/TextContent/LandingPage'

const apiBasePath = 'landing-page'

const getRepository = (nuxtConfig: NuxtConfig) => {
  const apiFetch = getRepositoryBase(nuxtConfig.textContentBaseUri)

  return {
    async getHeaderTeaser () : Promise<HeaderTeaser> {
      try {
        const response = await apiFetch(`${apiBasePath}/header-teaser`)
        return response
      } catch (e) {
        console.error(e); // eslint-disable-line
        throw e
      }
    },

    async getBiddingsCalendar () : Promise<BiddingsCalendar> {
      try {
        const response = await apiFetch(`${apiBasePath}/biddings-calendar`)
        return response
      } catch (e) {
        console.error(e); // eslint-disable-line
        throw e
      }
    },

    async getBottomTeaser () : Promise<ImageTeaser> {
      try {
        const response = await apiFetch(`${apiBasePath}/bottom-teaser`)
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
