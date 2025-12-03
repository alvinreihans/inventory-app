const routes = (handler) => [
  {
    method: 'POST',
    path: '/warehouse',
    handler: handler.postWarehouseHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
  {
    method: 'GET',
    path: '/warehouse',
    handler: handler.getWarehousesHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/warehouse',
    handler: handler.putWarehouseHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/warehouse',
    handler: handler.deleteWarehouseHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
];

module.exports = routes;
