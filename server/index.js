const Hapi = require('@hapi/hapi');
const apiRoutes = require('./apiRoutes');
const repository = require('./repository');
const config = require('./config');
const Inert = require('@hapi/inert');


const routes = [];
const plugins = [];
plugins.push(Inert);
routes.push(...apiRoutes);

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


const init = async () => {
  repository.init();

  const server = Hapi.server({
    routes: {
      validate: {
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
    port: 8080,
    host: config.host,
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