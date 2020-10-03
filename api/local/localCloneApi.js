export const localCloneApi = {
  clone(obj) {
    if (obj == null || 'object' !== typeof obj) return obj

    if (obj instanceof Array) {
      let copy = []

      for (let i = 0, len = obj.length; i < len; ++i) {
        copy[i] = this.clone(obj[i])
      }

      return copy
    }

    if (obj instanceof Object) {
      let copy = {}

      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr])
      }

      return copy
    }

    return obj
  }
}
