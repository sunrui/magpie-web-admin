import axios from 'axios'
import {loadingApi} from '../api/local/loadingApi'
import {storeApi} from '../api/local/storeApi'
import {userApi} from '../api/local/userApi'
import {cookieApi} from '../api/local/cookieApi'
import {logApi} from '../api/local/logApi'

axios.defaults.withCredentials = true
axios.defaults.timeout = 30 * 1000

axios.interceptors.request.use((config) => {
  loadingApi.show()

  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use(function (response) {
  console.groupCollapsed('%c' + response.config.method.toUpperCase() + '%c ' + response.request.responseURL, 'background:#FF6958;color:white', 'color:#000')
  console.log(response.config.data ? JSON.parse(response.config.data) : '<null>')
  console.log(response.data ? response.data : '<null>')
  console.groupEnd()

  loadingApi.hide()

  return response
}, function (err) {
  loadingApi.hide()

  if (err && err.response) {
    if (err.response.data.error === 'HttpUnauthorized') {
      userApi.clearAll()
      cookieApi.clearAll()

      let r = window.routerUrl
      window.location.href = `/login?r=${r}&shortId=undefined`
      return
    }

    if (process.env.NODE_ENV === 'development') {
      logApi.error(err.response.data)
    } else {
      storeApi.object.set('error', err.response.data)
      window.location.href = '/error'
    }
  } else {
    if (process.env.NODE_ENV === 'development') {
      logApi.error(err)
    } else {
      storeApi.object.set('error', err)
      window.location.href = '/error'
    }
  }

  return Promise.reject(err)
})
