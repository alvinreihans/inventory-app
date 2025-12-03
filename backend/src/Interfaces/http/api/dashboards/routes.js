const routes = (handler) => [
  {
    method: 'GET',
    path: '/dashboards',
    handler: handler.getDashboardDataHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
];

module.exports = routes;
