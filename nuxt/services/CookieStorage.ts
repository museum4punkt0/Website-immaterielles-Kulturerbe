import Cookies from 'js-cookie'

export const cookiesStorage: Storage = {
  setItem (key, state) {
    return Cookies.set(key, state, { expires: 3 })
  },
  getItem (key) {
    return Cookies.get(key)
  },
  length: 0,
  clear (): void {
    throw new Error('Function not implemented.')
  },
  key (_index: number): string {
    throw new Error('Function not implemented.')
  },
  removeItem (_key: string): void {
    throw new Error('Function not implemented.')
  },
}
