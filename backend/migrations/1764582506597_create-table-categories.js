exports.up = (pgm) => {
  pgm.createTable('categories', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    category: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    storage_type: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('categories');
};
