module.exports = {
  routes:[
    { 
      method: 'GET',
      path: '/applications/:slug',
      handler: 'application.findOne', 
      config: {
        auth: false,
      }
    }
  ]
}