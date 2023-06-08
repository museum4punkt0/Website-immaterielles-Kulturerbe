'use strict';

/**
 * house controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { sanitize } = require('@strapi/utils'); // needed for relations

module.exports = createCoreController('api::house.house',({strapi})=>({
  async findOne(ctx) {
    const { slug } = ctx.params;
    const entity = await strapi.db.query('api::house.house').findOne({
      populate: {
        house_ike_categories: {
          attributes: {
            populate: {
              slug: {
                populate: true      
              },  
              title: {
                populate: true      
              },
            }
          }  
        }, 
        img: {
          data:{
            populate: true      
          }
        },
        applications: {
          data:{
            populate: true      
          }
        },  
        house_filter_keywords: {
          data:{
            populate: true      
          }      
        },
        house_filter_collectionsize: {
          data:{
            populate: true      
          }            
        },  
        house_filter_communitysize: {
          data:{
            populate: true      
          }            
        },                     
        house_filter_visitorcount: {
          data:{
            populate: true      
          }            
        },    
        house_filter_agency: {
          data:{
            populate: true      
          }            
        },       
        house_filter_state: {
          data:{
            populate: true      
          }            
        },                  
      },
      where: { slug }
    });
    // const sanitizedEntity = await this.sanitizeOutput(entity); // doesn't resolve relations
    const sanitizedEntity = await sanitize.contentAPI.output(entity);
    return this.transformResponse(sanitizedEntity);
  }
})); 