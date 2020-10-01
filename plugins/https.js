if (process.env.NODE_ENV !== 'development') {
  if (document.location.protocol === 'http:') {
    let url = window.location.href.replace('http:', 'https:')
    window.location.replace(url)
  }
}
