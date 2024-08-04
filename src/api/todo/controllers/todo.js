'use strict';

/**
 * todo controller
 */
const { sanitize } = require('@strapi/utils');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::todo.todo', ({ strapi }) => ({
  async create(ctx) {
    let entity;
    const todo = ctx.request.body;

    todo.user = ctx.state.user;
    entity = await strapi.service('api::todo.todo').create({ data: todo });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  async find(ctx) {
    let entities;
    let query = {...ctx.query};
    query.filters = { ...query.filters, user: ctx.state.user.id };

    entities = await strapi.service('api::todo.todo').find({ filters: query.filters });

    const sanitizedEntities = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitizedEntities);
  }
}));
