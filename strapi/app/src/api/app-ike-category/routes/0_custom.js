module.exports = {
  routes:[
    { 
      method: 'GET',
      path: '/app-ike-categories/:slug',
      handler: 'app-ike-category.findOne', 
      config: {
        auth: false,
      }
    }
  ]
}