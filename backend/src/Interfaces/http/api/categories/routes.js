const routes = (handler) => [
  {
    method: 'POST',
    path: '/category',
    handler: handler.postCategoryHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
  {
    method: 'GET',
    path: '/category',
    handler: handler.getCategoriesHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/category',
    handler: handler.putCategoryHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/category',
    handler: handler.deleteCategoryHandler,
    options: {
      auth: 'inventory_api_jwt',
    },
  },
];

module.exports = routes;
