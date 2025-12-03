const routes = require('./routes');
const CategoriesHandler = require('./handler');

module.exports = {
  name: 'categories',
  register: async (server, { container }) => {
    const handler = new CategoriesHandler(container);
    server.route(routes(handler));
  },
};
