module.exports = {
  routes:[
    { 
      method: 'GET',
      path: '/clusters/:slug',
      handler: 'cluster.findOne', 
      config: {
        auth: false,
      }
    }
  ]
}