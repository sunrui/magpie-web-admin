import axios from 'axios'

let base = '/api/sms'

export const httpSmsApi = {
  postSend(phone, smsCodeType) {
    return axios.post(`${base}/send`, {
      phone: phone,
      smsCodeType: smsCodeType
    }).then(res => res.data)
  },
  postVerify(phone, code, smsCodeType) {
    return axios.post(`${base}/verify`, {
      phone: phone,
      code: code,
      smsCodeType: smsCodeType
    }).then(res => res.data)
  }
}
