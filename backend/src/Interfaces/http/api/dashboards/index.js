const routes = require('./routes');
const DashboardsHandler = require('./handler');

module.exports = {
  name: 'dashboards',
  register: async (server, { container }) => {
    const handler = new DashboardsHandler(container);
    server.route(routes(handler));
  },
};
