export const localValidatorApi = {
  phone(phone) {
    return /^[1][34578][0-9]{9}$/.test(phone)
  },
  code(code) {
    return Boolean(code)
  },
  password(password) {
    return /[a-zA-Z0-9_]{5,19}$/.test(password)
  },
  userName(userName) {
    return /[a-zA-Z0-9_]{3,15}$/.test(userName)
  }
}
