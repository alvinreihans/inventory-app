const WarehouseRepository = require('../../Domains/warehouses/WarehouseRepository');

class WarehouseRepositoryPostgres extends WarehouseRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addWarehouse({ location }) {
    const id = `warehouse-${this._idGenerator()}`;

    const query = {
      text: `
        INSERT INTO warehouses (id, location)
        VALUES ($1, $2)
        RETURNING id, location
      `,
      values: [id, location],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getWarehouses() {
    const query = {
      text: `
        SELECT id, location
        FROM warehouses
        ORDER BY location ASC
      `,
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getWarehouseById(id) {
    const query = {
      text: `
        SELECT id, location
        FROM warehouses
        WHERE id = $1
      `,
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async updateWarehouse({ id, location }) {
    const query = {
      text: `
        UPDATE warehouses
        SET location = $2
        WHERE id = $1
        RETURNING id, location
      `,
      values: [id, location],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async deleteWarehouseById(id) {
    const query = {
      text: `
        DELETE FROM warehouses
        WHERE id = $1
        RETURNING id
      `,
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async verifyWarehouseExist(id) {
    const query = {
      text: `
        SELECT 1 FROM warehouses
        WHERE id = $1
        LIMIT 1
      `,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rowCount < 0) {
      throw new InvariantError('warehouse tidak tersedia');
    }
  }
}

module.exports = WarehouseRepositoryPostgres;
