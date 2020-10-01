if (process.env.NODE_ENV !== 'development') {
  let methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ]

  let method
  for (let i = 0; i < methods.length; i++) {
    method = methods[i]
    console[method] = () => {
    }
  }
}