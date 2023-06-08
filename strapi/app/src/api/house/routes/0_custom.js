module.exports = {
  routes:[
    { 
      method: 'GET',
      path: '/houses/:slug',
      handler: 'house.findOne', 
      config: {
        auth: false,
      }
    }
  ]
}