exports.up = (pgm) => {
  pgm.createTable('categories', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(100)',
      notNull: true,
      unique: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('categories');
};
