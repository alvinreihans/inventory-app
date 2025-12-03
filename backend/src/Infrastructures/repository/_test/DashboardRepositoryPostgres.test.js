const pool = require('../../database/postgres/pool');
const DashboardTestHelper = require('../../../../tests/DashboardTestHelper');
const DashboardRepositoryPostgres = require('../DashboardRepositoryPostgres');

describe('DashboardRepositoryPostgres', () => {
  // Pastikan tabel bersih sebelum dan sesudah pengujian setiap skenario
  afterEach(async () => {
    await DashboardTestHelper.cleanTable();
  });

  // Pastikan koneksi database ditutup setelah semua pengujian selesai
  afterAll(async () => {
    await pool.end();
  });

  describe('getStockPerWarehouse function', () => {
    it('should return total stock per warehouse correctly', async () => {
      // Arrange
      // Menggunakan ID yang lebih unik untuk memastikan tidak ada konflik ID
      const warehouse1Id = 'wh-test-1';
      const warehouse2Id = 'wh-test-2';
      const itemId1 = 'item-test-1';
      const itemId2 = 'item-test-2';
      const categoryId = 'cat-test-1'; // ID kategori baru

      // Setup Data
      // Wajib: Menambahkan kategori agar item bisa dibuat (Foreign Key Constraint)
      await DashboardTestHelper.addCategory({
        id: categoryId,
        category: 'Test Category',
      });

      // Menambahkan Gudang
      await DashboardTestHelper.addWarehouse({
        id: warehouse1Id,
        location: 'Warehouse A',
      });
      await DashboardTestHelper.addWarehouse({
        id: warehouse2Id,
        location: 'Warehouse B',
      });

      // Item 1: 10 di A, 5 di B
      await DashboardTestHelper.addItem({ id: itemId1, categoryId });
      await DashboardTestHelper.addItemWarehouseStock({
        itemId: itemId1,
        warehouseId: warehouse1Id,
        stock: 10,
      });
      await DashboardTestHelper.addItemWarehouseStock({
        itemId: itemId1,
        warehouseId: warehouse2Id,
        stock: 5,
      });

      // Item 2: 20 di A
      await DashboardTestHelper.addItem({ id: itemId2, categoryId });
      await DashboardTestHelper.addItemWarehouseStock({
        itemId: itemId2,
        warehouseId: warehouse1Id,
        stock: 20,
      });

      const dashboardRepositoryPostgres = new DashboardRepositoryPostgres(pool);

      // Action
      const stocks = await dashboardRepositoryPostgres.getStockPerWarehouse();

      // Assert
      expect(stocks).toHaveLength(2);
      // PostgreSQL mengembalikan nilai SUM sebagai string
      expect(stocks).toEqual([
        { warehouse: 'Warehouse A', total_stock: '30' }, // 10 + 20
        { warehouse: 'Warehouse B', total_stock: '5' },
      ]);
    });

    it('should return empty array when no stock data exists', async () => {
      // Arrange
      const dashboardRepositoryPostgres = new DashboardRepositoryPostgres(pool);

      // Action
      const stocks = await dashboardRepositoryPostgres.getStockPerWarehouse();

      // Assert
      expect(stocks).toHaveLength(0);
    });
  });

  // ---

  describe('getItemsPerCategory function', () => {
    it('should return count of items per category correctly', async () => {
      // Arrange
      const category1Id = 'cat-1';
      const category2Id = 'cat-2';

      // Setup Data
      await DashboardTestHelper.addCategory({
        id: category1Id,
        category: 'Food',
      });
      await DashboardTestHelper.addCategory({
        id: category2Id,
        category: 'Beverage',
      });

      // Kategori Food: 2 Item
      await DashboardTestHelper.addItem({
        id: 'item-3',
        categoryId: category1Id,
      });
      await DashboardTestHelper.addItem({
        id: 'item-4',
        categoryId: category1Id,
      });

      // Kategori Beverage: 1 Item
      await DashboardTestHelper.addItem({
        id: 'item-5',
        categoryId: category2Id,
      });

      const dashboardRepositoryPostgres = new DashboardRepositoryPostgres(pool);

      // Action
      const itemsCount =
        await dashboardRepositoryPostgres.getItemsPerCategory();

      // Assert
      expect(itemsCount).toHaveLength(2);
      // Urutan disesuaikan karena 'ORDER BY c.category ASC' (B sebelum F)
      expect(itemsCount).toEqual([
        { category: 'Beverage', count: '1' },
        { category: 'Food', count: '2' },
      ]);
    });

    it('should return empty array when no item data exists', async () => {
      // Arrange
      const dashboardRepositoryPostgres = new DashboardRepositoryPostgres(pool);

      // Action
      const itemsCount =
        await dashboardRepositoryPostgres.getItemsPerCategory();

      // Assert
      expect(itemsCount).toHaveLength(0);
    });
  });
});
