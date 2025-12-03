/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const DashboardTestHelper = {
  async addCategory({
    id = 'category-111',
    category = 'Electronics',
    storageType = 'Shelf',
  }) {
    const query = {
      text: 'INSERT INTO categories VALUES($1, $2, $3)',
      values: [id, category, storageType],
    };

    await pool.query(query);
  },

  async addWarehouse({ id = 'warehouse-111', location = 'Jakarta' }) {
    const query = {
      text: 'INSERT INTO warehouses VALUES($1, $2)',
      values: [id, location],
    };

    await pool.query(query);
  },

  async addItem({
    id = 'item-111',
    name = 'Laptop A',
    categoryId = 'category-111',
  }) {
    const query = {
      text: 'INSERT INTO items VALUES($1, $2, $3)',
      values: [id, name, categoryId],
    };

    await pool.query(query);
  },

  async addItemWarehouseStock({
    itemId = 'item-111',
    warehouseId = 'warehouse-111',
    stock = 10,
  }) {
    const query = {
      text: 'INSERT INTO item_warehouse_stock VALUES($1, $2, $3)',
      values: [itemId, warehouseId, stock],
    };

    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM item_warehouse_stock WHERE 1=1');
    await pool.query('DELETE FROM items WHERE 1=1');
    await pool.query('DELETE FROM categories WHERE 1=1');
    await pool.query('DELETE FROM warehouses WHERE 1=1');
  },
};

module.exports = DashboardTestHelper;
