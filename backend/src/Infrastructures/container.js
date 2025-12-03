/* istanbul ignore file */

const { createContainer } = require('instances-container');

// External dependencies
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const pool = require('./database/postgres/pool');

// Domain Interfaces
const UserRepository = require('../Domains/users/UserRepository');
const AuthenticationRepository = require('../Domains/authentications/AuthenticationRepository');
const CategoryRepository = require('../Domains/categories/CategoryRepository');
const ItemRepository = require('../Domains/items/ItemRepository');
const WarehouseRepository = require('../Domains/warehouses/WarehouseRepository');
const StockRepository = require('../Domains/stocks/StockRepository');
const DashboardRepository = require('../Domains/dashboard/DashboardRepository');

// Application Security Interfaces
const PasswordHash = require('../Applications/security/PasswordHash');
const AuthenticationTokenManager = require('../Applications/security/AuthenticationTokenManager');

// Infrastructure Implementations (Services)
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres');
const CategoryRepositoryPostgres = require('./repository/CategoryRepositoryPostgres');
const ItemRepositoryPostgres = require('./repository/ItemRepositoryPostgres');
const WarehouseRepositoryPostgres = require('./repository/WarehouseRepositoryPostgres');
const StockRepositoryPostgres = require('./repository/StockRepositoryPostgres');
const DashboardRepositoryPostgres = require('./repository/DashboardRepositoryPostgres');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
const JwtTokenManager = require('./security/JwtTokenManager');

// Use Cases
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const LoginUserUseCase = require('../Applications/use_case/LoginUserUseCase');
const LogoutUserUseCase = require('../Applications/use_case/LogoutUserUseCase');
const RefreshAuthenticationUseCase = require('../Applications/use_case/RefreshAuthenticationUseCase');
const AddCategoryUseCase = require('../Applications/use_case/AddCategoryUseCase');
const GetCategoriesUseCase = require('../Applications/use_case/GetCategoriesUseCase');
const EditCategoryUseCase = require('../Applications/use_case/EditCategoryUseCase');
const DeleteCategoryUseCase = require('../Applications/use_case/DeleteCategoryUseCase');
const AddItemUseCase = require('../Applications/use_case/AddItemUseCase');
const GetItemsUseCase = require('../Applications/use_case/GetItemsUseCase');
const EditItemUseCase = require('../Applications/use_case/EditItemUseCase');
const DeleteItemUseCase = require('../Applications/use_case/DeleteItemUseCase');
const AddWarehouseUseCase = require('../Applications/use_case/AddWarehouseUseCase');
const GetWarehousesUseCase = require('../Applications/use_case/GetWarehousesUseCase');
const EditWarehouseUseCase = require('../Applications/use_case/EditWarehouseUseCase');
const DeleteWarehouseUseCase = require('../Applications/use_case/DeleteWarehouseUseCase');
const AddStockUseCase = require('../Applications/use_case/AddStockUseCase');
const GetStocksUseCase = require('../Applications/use_case/GetStocksUseCase');
const EditStockUseCase = require('../Applications/use_case/EditStockUseCase');
const GetDashboardDataUseCase = require('../Applications/use_case/GetDashboardDataUseCase');

// creating container
const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: CategoryRepository.name,
    Class: CategoryRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: ItemRepository.name,
    Class: ItemRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: WarehouseRepository.name,
    Class: WarehouseRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: StockRepository.name,
    Class: StockRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: DashboardRepository.name,
    Class: DashboardRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },

  // Categories
  {
    key: AddCategoryUseCase.name,
    Class: AddCategoryUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  {
    key: GetCategoriesUseCase.name,
    Class: GetCategoriesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  {
    key: EditCategoryUseCase.name,
    Class: EditCategoryUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteCategoryUseCase.name,
    Class: DeleteCategoryUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
        {
          name: 'itemRepository',
          internal: ItemRepository.name,
        },
      ],
    },
  },

  // Items
  {
    key: AddItemUseCase.name,
    Class: AddItemUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'itemRepository',
          internal: ItemRepository.name,
        },
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  {
    key: GetItemsUseCase.name,
    Class: GetItemsUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'itemRepository',
          internal: ItemRepository.name,
        },
      ],
    },
  },
  {
    key: EditItemUseCase.name,
    Class: EditItemUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'itemRepository',
          internal: ItemRepository.name,
        },
        {
          name: 'categoryRepository',
          internal: CategoryRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteItemUseCase.name,
    Class: DeleteItemUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'itemRepository',
          internal: ItemRepository.name,
        },
        {
          name: 'stockRepository',
          internal: StockRepository.name,
        },
      ],
    },
  },

  // Warehouses
  {
    key: AddWarehouseUseCase.name,
    Class: AddWarehouseUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'warehouseRepository',
          internal: WarehouseRepository.name,
        },
      ],
    },
  },
  {
    key: GetWarehousesUseCase.name,
    Class: GetWarehousesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'warehouseRepository',
          internal: WarehouseRepository.name,
        },
      ],
    },
  },
  {
    key: EditWarehouseUseCase.name,
    Class: EditWarehouseUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'warehouseRepository',
          internal: WarehouseRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteWarehouseUseCase.name,
    Class: DeleteWarehouseUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'warehouseRepository',
          internal: WarehouseRepository.name,
        },
        {
          name: 'stockRepository',
          internal: StockRepository.name,
        },
      ],
    },
  },

  //Stocks
  {
    key: AddStockUseCase.name,
    Class: AddStockUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'stockRepository',
          internal: StockRepository.name,
        },
        {
          name: 'itemRepository',
          internal: ItemRepository.name,
        },
        {
          name: 'warehouseRepository',
          internal: WarehouseRepository.name,
        },
      ],
    },
  },
  {
    key: EditStockUseCase.name,
    Class: EditStockUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'stockRepository',
          internal: StockRepository.name,
        },
        {
          name: 'itemRepository',
          internal: ItemRepository.name,
        },
        {
          name: 'warehouseRepository',
          internal: WarehouseRepository.name,
        },
      ],
    },
  },
  {
    key: GetStocksUseCase.name,
    Class: GetStocksUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'stockRepository',
          internal: StockRepository.name,
        },
      ],
    },
  },

  // Dashboards
  {
    key: GetDashboardDataUseCase.name,
    Class: GetDashboardDataUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'dashboardRepository',
          internal: DashboardRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
