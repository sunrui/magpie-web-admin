import {storeApi} from './storeApi'

export const userApi = {
  _key: 'user',
  user: null,
  _verifyUser() {
    this.user = storeApi.object.get(this._key)

    if (!Boolean(this.user)) {
      this.user = {
        id: null,
        userName: null,
        phone: null,
        wechatOpenId: null,
        shopWechatOpenId: null,
        alipayOpenId: null,
        avatar: null,
        captchaTableId: null,
        tableNumber: null,
        tableName: null
      }
    }
  },
  saveUser() {
    storeApi.object.set(this._key, this.user)
  },
  clearAll() {
    storeApi.object.set(this._key, {})
  },
  setUserId(id) {
    this._verifyUser()
    this.user.id = id
    this.saveUser()
  },
  getUserId() {
    this._verifyUser()
    return this.user.id
  },
  setUserName(userName) {
    this._verifyUser()
    this.user.userName = userName
    this.saveUser()
  },
  getUserName() {
    this._verifyUser()
    return this.user.userName
  },
  setUserPhone(phone) {
    this._verifyUser()
    this.user.phone = phone
    this.saveUser()
  },
  getUserPhone() {
    this._verifyUser()
    return this.user.phone
  },
  setUserWechatOpenId(wechatOpenId) {
    this._verifyUser()
    this.user.wechatOpenId = wechatOpenId
    this.saveUser()
  },
  getUserWechatOpenId() {
    this._verifyUser()
    return this.user.wechatOpenId
  },
  setUserShopWechatOpenId(shopWechatOpenId) {
    this._verifyUser()
    this.user.shopWechatOpenId = shopWechatOpenId
    this.saveUser()
  },
  getUserShopWechatOpenId() {
    this._verifyUser()
    return this.user.shopWechatOpenId
  },
  setUserAlipayOpenId(alipayOpenId) {
    this._verifyUser()
    this.user.alipayOpenId = alipayOpenId
    this.saveUser()
  },
  getUserAlipayOpenId() {
    this._verifyUser()
    return this.user.alipayOpenId
  },
  setUserAvatar(avatar) {
    this._verifyUser()
    this.user.avatar = avatar
    this.saveUser()
  },
  getUserAvatar() {
    this._verifyUser()
    return this.user.avatar
  },
  setCaptchaTableId(captchaTableId) {
    this._verifyUser()
    this.user.captchaTableId = captchaTableId
    this.saveUser()
  },
  getCaptchaTableId() {
    this._verifyUser()
    return this.user.captchaTableId
  },
  setTableNumber(tableNumber) {
    this._verifyUser()
    this.user.tableNumber = tableNumber
    this.saveUser()
  },
  getTableNumber() {
    this._verifyUser()
    return this.user.tableNumber
  },
  setTableName(tableName) {
    this._verifyUser()
    this.user.tableName = tableName
    this.saveUser()
  },
  getTableName() {
    this._verifyUser()
    return this.user.tableName
  }
}
