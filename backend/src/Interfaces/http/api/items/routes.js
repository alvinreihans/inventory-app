const routes = (handler) => [
  {
    method: 'POST',
    path: '/item',
    handler: handler.postItemHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
  {
    method: 'GET',
    path: '/item',
    handler: handler.getItemsHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/item',
    handler: handler.putItemHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/item',
    handler: handler.deleteItemHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
];

module.exports = routes;
