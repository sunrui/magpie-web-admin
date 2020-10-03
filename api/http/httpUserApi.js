import axios from 'axios'

let base = '/api/user'

let loginRefer = {
  directInvitorUserId: 123456,
  device: 'device',
  deviceImei: '',
  deviceVersion: ''
}

export const httpUserApi = {
  postLoginPhone(phone, smsCode, maxAge = 604800000) {
    return axios.post(`${base}/login/phone`, {
      refer: loginRefer,
      phone: phone,
      smsCode: smsCode,
      maxAge: maxAge
    }).then(res => res.data)
  },
  postLogout() {
    return axios.post(`${base}/logout`).then(res => res.data)
  },
  getLoginHistory(page, size) {
    return axios.get(`${base}/login/history`, {
      params: {
        page: page,
        size: size
      }
    }).then(res => res.data)
  },
  getState() {
    return axios.get(`${base}/state`).then(res => res.data)
  }
}
