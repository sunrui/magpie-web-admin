export const localUuidApi = {
  uuid() {
    let createUUID = (function (uuidRegEx, uuidReplacer) {
      return function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase()
      }
    })(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c === "x" ? r : (r & 3 | 8)
      return v.toString(16)
    })

    return createUUID()
  }
}
