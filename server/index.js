const Hapi = require('@hapi/hapi');
const apiRoutes = require('./apiRoutes');
const repository = require('./repository');
const config = require('./config');
const Inert = require('@hapi/inert');

const routes = [];
const plugins = [];
plugins.push(Inert);

// Static routes (client static files)
const staticHandler = {
  directory: {
    path: '../client/build',
    redirectToSlash: true,
    index: true,
  },
};
const staticRoute = {
  method: 'get',
  path: '/{param*}',
  handler: staticHandler,
};
routes.push(staticRoute);

// Add API Routes
routes.push(...apiRoutes);

const init = async () => {
  // Initalise database (see repository file)
  repository.init();

  const server = Hapi.server({
    routes: {
      validate: {
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  });
  await server.register(plugins);
  server.route(routes);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();