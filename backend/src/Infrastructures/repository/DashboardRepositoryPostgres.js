const DashboardRepository = require('../../Domains/dashboard/DashboardRepository');

class DashboardRepositoryPostgres extends DashboardRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async getStockPerWarehouse() {
    const query = {
      text: `
        SELECT 
          w.location AS warehouse,
          SUM(iw.stock) AS total_stock
        FROM item_warehouse_stock iw
        JOIN warehouses w ON w.id = iw.warehouse_id
        GROUP BY w.location
        ORDER BY w.location ASC
      `,
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getItemsPerCategory() {
    const query = {
      text: `
        SELECT 
          c.category AS category,
          COUNT(i.id) AS count
        FROM items i
        JOIN categories c ON c.id = i.category_id
        GROUP BY c.category
        ORDER BY c.category ASC 
      `,
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = DashboardRepositoryPostgres;
