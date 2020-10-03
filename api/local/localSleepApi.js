export const localSleepApi = {
  sleep(delay) {
    let start = (new Date()).getTime()
    while ((new Date()).getTime() - start < delay) {
    }
  }
}
