const handlers = require('./handlers');

const apiRoutes = [
  {
    method: 'GET',
    path: '/users',
    options: {
      handler: async (request, h) => {
        const response = handlers.getUsers();
        return response;
      }
    }
  },
];

module.exports = apiRoutes;