export const localAlipayApi = {
  inAlipay() {
    if (typeof navigator === 'undefined') {
      return false
    }

    let userAgent = navigator.userAgent.toLowerCase() || window.navigator.userAgent.toLowerCase()
    return userAgent.match(/alipayclient/i)
  },
  _tryScan(tryTimes) {
    if (tryTimes === 0) {
      return
    }

    let pThis = this

    if (typeof window.AlipayJSBridge !== 'undefined') {
      AlipayJSBridge.call(
          'scan',
          {type: 'qr'},
          function (res) {
            if (res.error === 10) {
              pThis.closeWindow()
            } else if (res.error === 11) {
              pThis.closeWindow()
            } else {
              if (Boolean(res.codeContent)) {
                window.location.href = res.codeContent
              } else {
                pThis.closeWindow()
              }
            }
          })
    } else {
      setTimeout(this._tryScan(--tryTimes), 10)
    }
  },
  scan() {
    if (!this.inAlipay()) {
      return
    }

    this._tryScan(100)
  },
  _tryCloseWindow(tryTimes) {
    if (tryTimes === 0) {
      return
    }

    if (typeof window.AlipayJSBridge !== 'undefined') {
      AlipayJSBridge.call('closeWebview')
    } else {
      setTimeout(this._tryCloseWindow(--tryTimes), 10)
    }
  },
  closeWindow() {
    if (!this.inAlipay()) {
      return
    }

    this._tryCloseWindow(100)
  }

}
