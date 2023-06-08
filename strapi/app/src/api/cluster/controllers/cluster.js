'use strict';
;
/**
cluster controller
*/

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cluster.cluster',({strapi})=>({
  async findOne(ctx) {
    const { slug } = ctx.params;
    const entity = await strapi.db.query('api::cluster.cluster').findOne({
      populate: true,
      where: { slug }
    });
    const sanitizedEntity = await this.sanitizeOutput(entity);
    return this.transformResponse(sanitizedEntity);
  }
}));


// to get all relations:

// const { createCoreController } = require('@strapi/strapi').factories;
// const { sanitize } = require('@strapi/utils');

// module.exports = createCoreController('api::cluster.cluster',({strapi})=>({
//   async findOne(ctx) {
//     const { slug } = ctx.params;
//     const entity = await strapi.db.query('api::cluster.cluster').findOne({
//       populate: {
//         applications: {
//           populate: true      
//         },  
//       },       
//       where: { slug }
//     });
//     // const sanitizedEntity = await this.sanitizeOutput(entity); // does not resolve relations
//     const sanitizedEntity = await sanitize.contentAPI.output(entity);
//     return this.transformResponse(sanitizedEntity);    
//   }
// }));