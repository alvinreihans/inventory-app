const StockRepository = require('../../Domains/stocks/StockRepository');

class StockRepositoryPostgres extends StockRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async addStock({ itemId, warehouseId, stock }) {
    const query = {
      text: `
        INSERT INTO item_warehouse_stock (item_id, warehouse_id, stock)
        VALUES ($1, $2, $3)
        ON CONFLICT (item_id, warehouse_id)
        DO UPDATE SET stock = item_warehouse_stock.stock + EXCLUDED.stock
        RETURNING item_id, warehouse_id, stock
      `,
      values: [itemId, warehouseId, stock],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getStocks() {
    const query = {
      text: `
      SELECT 
        iws.item_id AS "itemId",
        iws.warehouse_id AS "warehouseId",
        w.location AS "location",
        iws.stock AS "stock"
      FROM item_warehouse_stock iws
      JOIN warehouses w ON w.id = iws.warehouse_id
      ORDER BY w.location ASC`,
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async updateStock({ itemId, warehouseId, stock }) {
    const query = {
      text: `
        UPDATE item_warehouse_stock
        SET stock = $3
        WHERE item_id = $1 AND warehouse_id = $2
        RETURNING item_id, warehouse_id, stock
      `,
      values: [itemId, warehouseId, stock],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async verifyItemNotStocked(itemId) {
    const query = {
      text: `
        SELECT 1 FROM item_warehouse_stock
        WHERE item_id = $1
        LIMIT 1
      `,
      values: [itemId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError('item masih disimpan');
    }
  }

  async verifyWarehouseNotUsed(warehouseId) {
    const query = {
      text: `
      SELECT 1
      FROM item_warehouse_stock
      WHERE warehouse_id = $1
      LIMIT 1
    `,
      values: [warehouseId],
    };

    const result = await this._pool.query(query);
    if (result.rowCount > 0) {
      throw new InvariantError('warehouse masih digunakan');
    }
  }
}

module.exports = StockRepositoryPostgres;
