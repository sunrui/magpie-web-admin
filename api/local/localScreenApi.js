export const localScreenApi = {
  isFullScreen() {
    return document.fullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      false
  },
  enterFullScreen(element) {
    if (!element) {
      element = document.documentElement
    }

    let requestMethod = element.requestFullScreen ||
      element.webkitRequestFullScreen ||
      element.mozRequestFullScreen ||
      element.msRequestFullScreen

    if (requestMethod) {
      requestMethod.call(element)
    } else if (typeof window.ActiveXObject !== "undefined") {
      let wscript = new ActiveXObject("WScript.Shell")
      if (wscript !== null) {
        wscript.SendKeys("{F11}")
      }
    }
  },
  exitFullscreen() {
    let exitMethod = document.exitFullscreen ||
      document.mozCancelFullScreen ||
      document.webkitExitFullscreen ||
      document.webkitExitFullscreen

    if (exitMethod) {
      exitMethod.call(document)
    } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
      let wscript = new ActiveXObject("WScript.Shell")
      if (wscript !== null) {
        wscript.SendKeys("{F11}")
      }
    }
  }
}
