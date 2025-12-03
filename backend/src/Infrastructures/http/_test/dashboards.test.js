const createServer = require('../createServer');
const container = require('../../container');
const pool = require('../../../Infrastructures/database/postgres/pool');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');

describe('/api/dashboards endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  it('should return dashboard data correctly when authorized', async () => {
    const server = await createServer(container);

    // Register + Login user
    const { accessToken } = await ServerTestHelper.registerAndLogin({
      server,
      userPayload: {
        username: 'tester',
        password: 'secret',
        fullname: 'Tester User',
      },
    });

    // Prepare seed data manually (optional)
    await pool.query(`
      INSERT INTO categories (id, category, storage_type) VALUES
      ('cat-1', 'Meal', 'Dry'),
      ('cat-2', 'Beverage', 'Cold')
      ON CONFLICT DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO items (id, name, category_id) VALUES
      ('item-1', 'Instant Noodle', 'cat-1'),
      ('item-2', 'Milk', 'cat-2')
      ON CONFLICT DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO warehouses (id, location) VALUES
      ('wh-1', 'LAMPUNG'),
      ('wh-2', 'PALEMBANG')
      ON CONFLICT DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO item_warehouse_stock (item_id, warehouse_id, stock) VALUES
      ('item-1', 'wh-1', 50),
      ('item-2', 'wh-2', 20)
      ON CONFLICT DO NOTHING;
    `);

    // Hit endpoint
    const response = await server.inject({
      method: 'GET',
      url: '/api/dashboards',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseJson = JSON.parse(response.payload);

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(responseJson.status).toBe('success');

    expect(responseJson.data.stockPerWarehouse).toBeDefined();
    expect(responseJson.data.itemsPerCategory).toBeDefined();

    expect(Array.isArray(responseJson.data.stockPerWarehouse)).toBe(true);
    expect(Array.isArray(responseJson.data.itemsPerCategory)).toBe(true);
  });

  it('should return 401 when no access token is provided', async () => {
    const server = await createServer(container);

    const response = await server.inject({
      method: 'GET',
      url: '/api/dashboards',
    });

    expect(response.statusCode).toBe(401);
  });
});
