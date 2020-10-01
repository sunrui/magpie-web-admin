export const logApi = {
  log(data) {
    if (process.env.NODE_ENV === 'development') {
      console.log(data)
    }
  },
  error(data) {
    if (process.env.NODE_ENV === 'development') {
      console.error(data)
    }
  },
  dump(data) {
    if (process.env.NODE_ENV === 'development') {
      const { dump } = require('dumper.js')
      dump(data)
    }
  }
}