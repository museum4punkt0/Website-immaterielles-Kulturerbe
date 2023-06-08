module.exports = {
  routes:[
    { 
      method: 'GET',
      path: '/house-ike-categories/:slug',
      handler: 'house-ike-category.findOne', 
      config: {
        auth: false,
      }
    }
  ]
}