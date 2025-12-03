const routes = (handler) => [
  {
    method: 'POST',
    path: '/stock',
    handler: handler.postStockHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
  {
    method: 'GET',
    path: '/stock',
    handler: handler.getStocksHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/stock',
    handler: handler.putStockHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
];

module.exports = routes;
