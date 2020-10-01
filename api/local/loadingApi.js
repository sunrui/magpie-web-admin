export const loadingApi = {
  ref: 0,
  enable: true,
  show() {
    if (this.enable && ++this.ref > 0) {
      // document.getElementById('nuxt_loading').style.display = 'block'
    }
  },
  hide() {
    if (--this.ref <= 0) {
      // document.getElementById('nuxt_loading').style.display = 'none'
    }
  }
}
