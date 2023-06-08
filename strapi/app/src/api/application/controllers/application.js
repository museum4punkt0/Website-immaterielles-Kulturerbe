'use strict';

/**
 * application controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { sanitize } = require('@strapi/utils'); // needed for relations

module.exports = createCoreController('api::application.application',({strapi})=>({
  async findOne(ctx) {
    const { slug } = ctx.params;
    const entity = await strapi.db.query('api::application.application').findOne({
      //populate: true,
      populate: {
        app_ike_categories: {
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
        sideinfos: {          
            populate: true                
        },
        images: {
          populate: true                
        },
        benefits: {
          populate: true                
        },
        learnings: {
          populate: true                
        },     
        house: {
          data:{
            populate: true      
          }            
        }, 
        related_applications: {
          data:{
            populate: true      
          }            
        },
        app_filter_devcost: {
          data:{
            populate: true      
          }      
        },
        app_filter_followupcost: {
          data:{
            populate: true      
          }            
        },        
        app_filter_keywords: {
          data:{
            populate: true      
          }   
        },       
        app_filter_usages: {
          data:{
            populate: true      
          }   
        },  
        app_filter_hardwares: {
          data:{
            populate: true      
          }   
        },  
        app_filter_softwares: {
          data:{
            populate: true      
          }   
        },
        app_filter_access: {
          data:{
            populate: true      
          }   
        },   
        app_filter_approaches: {
          data:{
            populate: true      
          }   
        },         
        app_filter_goals: {
          data:{
            populate: true      
          }   
        },  
        app_filter_types: {
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