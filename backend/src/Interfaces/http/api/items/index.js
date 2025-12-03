const routes = require('./routes');
const ItemsHandler = require('./handler');

module.exports = {
  name: 'items',
  register: async (server, { container }) => {
    const handler = new ItemsHandler(container);
    server.route(routes(handler));
  },
};
