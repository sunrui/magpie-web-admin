export const sleepApi = {
  sleep(delay) {
    let start = (new Date()).getTime()
    while ((new Date()).getTime() - start < delay) {
    }
  }
}