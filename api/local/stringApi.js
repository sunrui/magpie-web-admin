export const stringApi = {
  trim(s) {
    return this.trimRight(this.trimLeft(s))
  },
  trimLeft(s) {
    if (s == null) {
      return ''
    }
    let whitespace = String(' \t\n\r')
    let str = String(s)
    if (whitespace.indexOf(str.charAt(0)) !== -1) {
      let j = 0, i = str.length
      while (j < i && whitespace.indexOf(str.charAt(j)) !== -1) {
        j++
      }
      str = str.substring(j, i)
    }
    return str
  }, trimRight(s) {
    if (s == null) return ''
    let whitespace = String(' \t\n\r')
    let str = String(s)
    if (whitespace.indexOf(str.charAt(str.length - 1)) !== -1) {
      let i = str.length - 1
      while (i >= 0 && whitespace.indexOf(str.charAt(i)) !== -1) {
        i--
      }
      str = str.substring(0, i + 1)
    }
    return str
  }
}
