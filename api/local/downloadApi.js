export const downloadApi = {
  download(canvas, fileName) {
    let url = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    if (window.navigator.msSaveOrOpenBlob) {
      let bstr = atob(this.url.split(',')[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      let blob = new Blob([u8arr])
      window.navigator.msSaveOrOpenBlob(blob, fileName)
    } else {
      let a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.click()
      a.remove()
    }
  }
}
