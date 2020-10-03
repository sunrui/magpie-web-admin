export const localWechatApi = {
  inWechat() {
    if (typeof navigator === 'undefined') {
      return false
    }

    let userAgent = navigator.userAgent.toLowerCase() || window.navigator.userAgent.toLowerCase()
    return userAgent.match(/MicroMessenger/i) || userAgent.match(/webdebugger/i)
  },
  _tryCloseWindow(tryTimes) {
    if (tryTimes === 0) {
      return
    }

    if (typeof window.WeixinJSBridge !== 'undefined') {
      WeixinJSBridge.call('closeWindow')
    } else {
      setTimeout(this._tryCloseWindow(--tryTimes), 10)
    }
  },
  closeWindow() {
    if (!this.inWechat()) {
      return
    }

    this._tryCloseWindow(100)
  }
}
