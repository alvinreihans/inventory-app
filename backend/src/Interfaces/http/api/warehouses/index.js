const routes = require('./routes');
const WarehousesHandler = require('./handler');

module.exports = {
  name: 'warehouses',
  register: async (server, { container }) => {
    const handler = new WarehousesHandler(container);
    server.route(routes(handler));
  },
};
