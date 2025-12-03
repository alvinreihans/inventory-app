exports.up = (pgm) => {
  //
  // === Categories ===
  //
  pgm.sql(`
    INSERT INTO categories (id, category, storage_type)
    VALUES
      ('category-001', 'Snacks', 'Dry'),
      ('category-002', 'Beverage', 'Cold'),
      ('category-003', 'Meal', 'Hot')
  `);

  //
  // === Warehouses ===
  //
  pgm.sql(`
    INSERT INTO warehouses (id, location)
    VALUES
      ('warehouse-001', 'Jakarta'),
      ('warehouse-002', 'Palembang'),
      ('warehouse-003', 'Lampung')
  `);

  //
  // === Items ===
  //
  pgm.sql(`
    INSERT INTO items (id, name, category_id)
    VALUES
      ('item-001', 'Pop Mie', 'category-003'),
      ('item-002', 'Coca Cola', 'category-002'),
      ('item-003', 'Chitato', 'category-001')
  `);

  //
  // === Item Warehouse Stock ===
  //
  pgm.sql(`
    INSERT INTO item_warehouse_stock (item_id, warehouse_id, stock)
    VALUES
      ('item-001', 'warehouse-001', 10),
      ('item-001', 'warehouse-002', 5),
      ('item-001', 'warehouse-003', 3),

      ('item-002', 'warehouse-001', 12),
      ('item-002', 'warehouse-002', 20),
      ('item-002', 'warehouse-003', 18),

      ('item-003', 'warehouse-001', 8),
      ('item-003', 'warehouse-002', 15),
      ('item-003', 'warehouse-003', 7)
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DELETE FROM item_warehouse_stock`);
  pgm.sql(`DELETE FROM items`);
  pgm.sql(`DELETE FROM warehouses`);
  pgm.sql(`DELETE FROM categories`);
};
