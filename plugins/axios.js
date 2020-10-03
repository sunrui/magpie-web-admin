import axios from 'axios'
import {localLoadingApi} from '@/api/local/localLoadingApi'
import {localStoreApi} from '@/api/local/localStoreApi'
import {localUserApi} from '@/api/local/localUserApi'
import {localCookieApi} from '@/api/local/localCookieApi'
import {localLogApi} from '@/api/local/localLogApi'

axios.defaults.withCredentials = true
axios.defaults.timeout = 30 * 1000

axios.interceptors.request.use((config) => {
  localLoadingApi.show()

  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use(function (response) {
  console.groupCollapsed('%c' + response.config.method.toUpperCase() + '%c ' + response.request.responseURL, 'background:#FF6958;color:white', 'color:#000')
  console.log(response.config.data ? JSON.parse(response.config.data) : '<null>')
  console.log(response.data ? response.data : '<null>')
  console.groupEnd()

  localLoadingApi.hide()

  return response
}, function (err) {
  localLoadingApi.hide()

  if (err && err.response) {
    if (err.response.data.error === 'HttpUnauthorized') {
      localUserApi.clearAll()
      localCookieApi.clearAll()

      let r = window.routerUrl
      window.location.href = `/login?r=${r}&shortId=undefined`
      return
    }

    if (process.env.NODE_ENV === 'development') {
      localLogApi.error(err.response.data)
    } else {
      localStoreApi.object.set('error', err.response.data)
      window.location.href = '/error'
    }
  } else {
    if (process.env.NODE_ENV === 'development') {
      localLogApi.error(err)
    } else {
      localStoreApi.object.set('error', err)
      window.location.href = '/error'
    }
  }

  return Promise.reject(err)
})
