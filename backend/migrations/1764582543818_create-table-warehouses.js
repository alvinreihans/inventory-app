exports.up = (pgm) => {
  pgm.createTable('warehouses', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    location: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('warehouses');
};
