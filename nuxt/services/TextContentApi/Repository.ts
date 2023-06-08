// import axios from 'axios'
import { $fetch } from 'ohmyfetch'

// const baseURL = process.env?.TEXT_CONTENT_API ?? '/'
/*
const baseURL = 'http://localhost:3000/api'

export default $fetch.create({
  baseURL,
})
*/
const getRepository = (baseURL: string) => ($fetch.create({ baseURL }))
export default getRepository
