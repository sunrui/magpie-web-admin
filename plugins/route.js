export default ({app}) => {
  app.router.afterEach((to, from) => {
    if (window.__wxjs_is_wkwebview) {
      if (window.fullRouterUrl === '' || window.fullRouterUrl === undefined) {
        window.fullRouterUrl = document.location.protocol + '//' + window.location.host + to.fullPath
      }
    }

    window.routerUrl = to.fullPath

    if (typeof _hmt !== 'undefined') {
      _hmt.push(['_trackPageview', to.fullPath])
    }

    console.groupEnd()
    console.group('%c ' + to.fullPath, 'background:#FF6958;color:white')
  })
}