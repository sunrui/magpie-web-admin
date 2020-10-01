export default ({app}) => {
  app.router.afterEach((to, from) => {
    if (document.location.pathname !== '/down') {
      window.location.href = document.location.protocol + '//' + window.location.host + '/down'
    }
  })
}
