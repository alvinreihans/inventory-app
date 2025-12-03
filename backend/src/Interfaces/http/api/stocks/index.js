const routes = require('./routes');
const StocksHandler = require('./handler');

module.exports = {
  name: 'stocks',
  register: async (server, { container }) => {
    const handler = new StocksHandler(container);
    server.route(routes(handler));
  },
};
