exports.up = (pgm) => {
  pgm.createTable('item_warehouse_stock', {
    item_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"items"',
      onDelete: 'cascade',
    },
    warehouse_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"warehouses"',
      onDelete: 'cascade',
    },
    stock: {
      type: 'INT',
      notNull: true,
      default: 0,
    },
  });

  pgm.addConstraint('item_warehouse_stock', 'item_warehouse_pkey', {
    primaryKey: ['item_id', 'warehouse_id'],
  });
};

exports.down = (pgm) => {
  pgm.dropTable('item_warehouse_stock');
};
