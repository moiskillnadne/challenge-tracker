import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import i18n from 'i18next'

import { authService } from './auth.service'
import { EventEmitter } from '../lib/EventEmitter'

import { LanguageMap, Languages } from '~/i18n/languageMap'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestConfig = AxiosRequestConfig<any> & {
  retry?: boolean
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
})

api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.withCredentials = true

api.interceptors.request.use((config) => {
  const currentLanguage = i18n.language as Languages

  config.headers['Accept-Language'] = LanguageMap[currentLanguage] ?? LanguageMap.en

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error?.config as RequestConfig

    if (error.response?.status === 401 && !config?.retry) {
      config.retry = true

      try {
        await authService.refreshToken()
      } catch (e) {
        console.error('User authentication failed')
        EventEmitter.emit('refreshTokenExpired')

        await Promise.reject(e)
      }

      return api(config)
    }

    return Promise.reject(error)
  },
)
