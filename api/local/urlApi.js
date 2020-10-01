export const urlApi = {
  getCurrentUrl() {
    let url = null

    if (window.__wxjs_is_wkwebview) {
      url = window.fullRouterUrl
    }

    if (!url) {
      url = location.href.split('#')[0]
    }

    return url
  }
}