export const localScrollApi = {
  _scrollTop: 0,
  enable(enable) {
    if (enable) {
      document.body.style.overflow = 'auto'

      document.body.style.position = 'initial'
      document.body.style.height = 'auto'
      document.scrollingElement.scrollTop = this._scrollTop

    } else {
      document.body.style.overflow = 'hidden'

      this._scrollTop = this.getCurrentY()
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = -this._scrollTop + 'px'
    }
  },
  getCurrentY() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  },
  getCurrentBottom() {
    return document.body.scrollHeight
  },
  scrollAnimation(currentY, targetY) {
    let needScrollTop = targetY - currentY
    let _currentY = currentY
    setTimeout(() => {
      _currentY += Math.ceil(needScrollTop / 10)
      window.scrollTo(0, currentY)
      if (needScrollTop > 10 || needScrollTop < -10) {
        this.scrollAnimation(_currentY, targetY)
      } else {
        window.scrollTo(0, targetY)
      }
    }, 1)
  }
}
