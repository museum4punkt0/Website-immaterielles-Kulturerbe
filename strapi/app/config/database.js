const path = require('path');

console.log('DATABASE_FILENAME:', process.env.DATABASE_FILENAME);
module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false),
      useNullAsDefault: true,
    },
    pool: { min: 0, max: 7 },
  }
});
