const InvariantError = require('../../Commons/exceptions/InvariantError');
const ItemRepository = require('../../Domains/items/ItemRepository');

class ItemRepositoryPostgres extends ItemRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  // --- CREATE ---
  async addItem(newItem) {
    console.log('[ItemRepository] addItem() dipanggil');
    console.log('[addItem] Payload:', newItem);

    const { name, categoryId } = newItem;
    const id = `item-${this._idGenerator()}`;

    console.log('[addItem] Generated ID:', id);

    const query = {
      text: `
        INSERT INTO items (id, name, category_id)
        VALUES($1, $2, $3)
        RETURNING id, name, category_id
      `,
      values: [id, name, categoryId],
    };

    console.log('[addItem] Executing Query:', query);

    const result = await this._pool.query(query);

    console.log('[addItem] Query Result:', result.rows[0]);

    return result.rows[0];
  }

  // --- READ ALL ---
  async getItems() {
    console.log('[ItemRepository] getItems() dipanggil');

    const query = {
      text: `
        SELECT 
          i.id,
          i.name,
          i.category_id,
          c.category AS category_name,
          c.storage_type
        FROM items i
        JOIN categories c ON c.id = i.category_id
        ORDER BY i.name ASC
      `,
    };

    console.log('[getItems] Executing Query:', query);

    const result = await this._pool.query(query);

    console.log('[getItems] Result Count:', result.rowCount);

    return result.rows;
  }

  // --- READ DETAIL ---
  async getItemById(itemId) {
    console.log('[ItemRepository] getItemById() dipanggil');
    console.log('[getItemById] ID:', itemId);

    const query = {
      text: `
        SELECT 
          i.id,
          i.name,
          i.category_id,
          c.category AS category_name,
          c.storage_type
        FROM items i
        JOIN categories c ON c.id = i.category_id
        WHERE i.id = $1
      `,
      values: [itemId],
    };

    console.log('[getItemById] Executing Query:', query);

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      console.log('[getItemById] NOT FOUND');
      throw new InvariantError('Barang tidak ditemukan');
    }

    console.log('[getItemById] Found:', result.rows[0]);

    return result.rows[0];
  }

  // --- UPDATE ---
  async updateItem(payload) {
    console.log('[ItemRepository] updateItem() dipanggil');
    console.log('[updateItemsById] Payload:', payload);

    const { id, name, categoryId } = payload;

    const query = {
      text: `
        UPDATE items 
        SET name = $1, category_id = $2 
        WHERE id = $3 
        RETURNING id
      `,
      values: [name, categoryId, id],
    };

    console.log('[updateItemsById] Executing Query:', query);

    const result = await this._pool.query(query);

    console.log('[updateItemsById] Updated ID:', result.rows[0]?.id);

    return result.rows[0].id;
  }

  // --- DELETE ---
  async deleteItemById(itemId) {
    console.log('[ItemRepository] deleteItemById() dipanggil');
    console.log('[deleteItemById] ID:', itemId);

    const query = {
      text: `
        DELETE FROM items 
        WHERE id = $1 
        RETURNING id
      `,
      values: [itemId],
    };

    console.log('[deleteItemById] Executing Query:', query);

    const result = await this._pool.query(query);

    console.log('[deleteItemById] Deleted ID:', result.rows[0]?.id);
  }

  // --- VERIFICATIONS ---
  async verifyItemsExist(itemId) {
    console.log('[ItemRepository] verifyItemsExist() dipanggil');
    console.log('[verifyItemsExist] ID:', itemId);

    const query = {
      text: 'SELECT id FROM items WHERE id = $1',
      values: [itemId],
    };

    console.log('[verifyItemsExist] Executing Query:', query);

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      console.log('[verifyItemsExist] NOT FOUND → throw');
      throw new InvariantError('Barang tidak ditemukan');
    }

    console.log('[verifyItemsExist] Exists:', result.rows[0].id);
  }

  async verifyItemNameAvailable(itemName) {
    console.log('[ItemRepository] verifyItemNameAvailable() dipanggil');
    console.log('[verifyItemNameAvailable] Name:', itemName);

    const query = {
      text: 'SELECT name FROM items WHERE name = $1',
      values: [itemName],
    };

    console.log('[verifyItemNameAvailable] Executing Query:', query);

    const result = await this._pool.query(query);

    if (result.rowCount) {
      console.log('[verifyItemNameAvailable] Name EXISTS → throw');
      throw new InvariantError('Nama barang sudah digunakan');
    }

    console.log('[verifyItemNameAvailable] Name available');
  }

  async isCategoryUsed(categoryId) {
    console.log('[ItemRepository] isCategoryUsed() dipanggil');
    console.log('[isCategoryUsed] Category ID:', categoryId);

    const query = {
      text: 'SELECT id FROM items WHERE category_id = $1 LIMIT 1',
      values: [categoryId],
    };

    console.log('[isCategoryUsed] Executing Query:', query);

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError(
        'Kategori sedang digunakan oleh satu atau beberapa item'
      );
    }
  }
}

module.exports = ItemRepositoryPostgres;
