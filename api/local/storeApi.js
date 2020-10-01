let store = require('store')

export const storeApi = {
  clearAll() {
    store.clearAll()
  },
  pair: {
    set(key, name, value) {
      if (!Boolean(key)) {
        return
      }

      let data = store.get(key)
      if (!Boolean(data)) {
        data = {}
      }

      data[name] = value
      store.set(key, data)
    },
    get(key, name) {
      let data = store.get(key)
      if (!Boolean(data) || !Boolean(data[name])) {
        return null
      }

      return data[name]
    }
  },
  object: {
    set(key, object) {
      if (!Boolean(key)) {
        return
      }

      store.set(key, object)
    },
    get(key) {
      return store.get(key)
    }
  }
}
