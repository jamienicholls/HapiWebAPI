const { env } = require('process');

const config = {
  host: env.ADDR || 'localhost',
}

module.exports = config;