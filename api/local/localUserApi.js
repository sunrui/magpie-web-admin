import {localStoreApi} from './localStoreApi'

export const localUserApi = {
  _key: 'user',
  user: null,
  _verify() {
    this.user = localStoreApi.object.get(this._key)

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
  save() {
    localStoreApi.object.set(this._key, this.user)
  },
  clearAll() {
    localStoreApi.object.set(this._key, {})
  },
  setId(id) {
    this._verify()
    this.user.id = id
    this.save()
  },
  getId() {
    this._verify()
    return this.user.id
  },
  setName(userName) {
    this._verify()
    this.user.userName = userName
    this.save()
  },
  getName() {
    this._verify()
    return this.user.userName
  },
  setPhone(phone) {
    this._verify()
    this.user.phone = phone
    this.save()
  },
  getPhone() {
    this._verify()
    return this.user.phone
  },
  setWechatOpenId(wechatOpenId) {
    this._verify()
    this.user.wechatOpenId = wechatOpenId
    this.save()
  },
  getWechatOpenId() {
    this._verify()
    return this.user.wechatOpenId
  },
  setShopWechatOpenId(shopWechatOpenId) {
    this._verify()
    this.user.shopWechatOpenId = shopWechatOpenId
    this.save()
  },
  getShopWechatOpenId() {
    this._verify()
    return this.user.shopWechatOpenId
  },
  setAlipayOpenId(alipayOpenId) {
    this._verify()
    this.user.alipayOpenId = alipayOpenId
    this.save()
  },
  getAlipayOpenId() {
    this._verify()
    return this.user.alipayOpenId
  },
  setAvatar(avatar) {
    this._verify()
    this.user.avatar = avatar
    this.save()
  },
  getAvatar() {
    this._verify()
    return this.user.avatar
  }
}
