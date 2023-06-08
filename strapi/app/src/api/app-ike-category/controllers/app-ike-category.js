'use strict';

/**
 * app-category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::app-ike-category.app-ike-category',({strapi})=>({
  async findOne(ctx) {
    const { slug } = ctx.params;
    const entity = await strapi.db.query('api::app-ike-category.app-ike-category').findOne({
      populate: true,
      where: { slug }
    });
    const sanitizedEntity = await this.sanitizeOutput(entity);
    return this.transformResponse(sanitizedEntity);
  }
})); 