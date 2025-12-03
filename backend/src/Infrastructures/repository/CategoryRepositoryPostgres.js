const InvariantError = require('../../Commons/exceptions/InvariantError');
const CategoryRepository = require('../../Domains/categories/CategoryRepository');

class CategoryRepositoryPostgres extends CategoryRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addCategory(newCategory) {
    console.log('[CategoryRepository] addCategory() dipanggil');
    console.log('[addCategory] Payload:', newCategory);

    const { category, storageType } = newCategory;
    const id = `category-${this._idGenerator()}`;

    console.log('[addCategory] Generated ID:', id);

    const query = {
      text: 'INSERT INTO categories (id, category, storage_type) VALUES($1, $2, $3) RETURNING id, category, storage_type',
      values: [id, category, storageType],
    };

    console.log('[addCategory] Executing Query:', query);

    const result = await this._pool.query(query);

    console.log('[addCategory] Query Result:', result.rows[0]);

    return result.rows[0];
  }

  async getCategories() {
    console.log('[CategoryRepository] getCategories() dipanggil');

    const query = {
      text: 'SELECT id, category, storage_type AS "storageType" FROM categories ORDER BY category ASC',
    };

    console.log('[getCategories] Executing Query:', query);

    const result = await this._pool.query(query);

    console.log('[getCategories] Result Count:', result.rowCount);

    return result.rows;
  }

  async getCategoryById(categoryId) {
    console.log('[CategoryRepository] getCategoryById() dipanggil');
    console.log('[getCategoryById] ID:', categoryId);

    const query = {
      text: 'SELECT id, category, storage_type FROM categories WHERE id = $1',
      values: [categoryId],
    };

    console.log('[getCategoryById] Executing Query:', query);

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      console.log('[getCategoryById] NOT FOUND');
      throw new InvariantError('Kategori tidak ditemukan');
    }

    console.log('[getCategoryById] Found:', result.rows[0]);

    return result.rows[0];
  }

  async updateCategory(payload) {
    console.log('[CategoryRepository] updateCategory() dipanggil');
    console.log('[updateCategory] Payload:', payload);

    const { id, category, storageType } = payload;

    const query = {
      text: 'UPDATE categories SET category = $1, storage_type = $2 WHERE id = $3 RETURNING id',
      values: [category, storageType, id],
    };

    console.log('[updateCategory] Executing Query:', query);

    const result = await this._pool.query(query);

    console.log('[updateCategory] Updated ID:', result.rows[0]?.id);

    return result.rows[0].id;
  }

  async deleteCategoryById(categoryId) {
    console.log('[CategoryRepository] deleteCategoryById() dipanggil');
    console.log('[deleteCategoryById] ID:', categoryId);

    const query = {
      text: 'DELETE FROM categories WHERE id = $1 RETURNING id',
      values: [categoryId],
    };

    console.log('[deleteCategoryById] Executing Query:', query);

    const result = await this._pool.query(query);

    console.log('[deleteCategoryById] Deleted ID:', result.rows[0]?.id);
  }

  async verifyCategoryExist(categoryId) {
    console.log('[CategoryRepository] verifyCategoryExist() dipanggil');
    console.log('[verifyCategoryExist] ID:', categoryId);

    const query = {
      text: 'SELECT id FROM categories WHERE id = $1',
      values: [categoryId],
    };

    console.log('[verifyCategoryExist] Executing Query:', query);

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      console.log('[verifyCategoryExist] NOT FOUND → throw');
      throw new InvariantError('Kategori tidak ditemukan');
    }

    console.log('[verifyCategoryExist] Exists:', result.rows[0].id);
  }

  async verifyCategoryNameAvailable(categoryName) {
    console.log('[CategoryRepository] verifyCategoryNameAvailable() dipanggil');
    console.log('[verifyCategoryNameAvailable] Name:', categoryName);

    const query = {
      text: 'SELECT category FROM categories WHERE category = $1',
      values: [categoryName],
    };

    console.log('[verifyCategoryNameAvailable] Executing Query:', query);

    const result = await this._pool.query(query);

    if (result.rowCount) {
      console.log('[verifyCategoryNameAvailable] Name EXISTS → throw');
      throw new InvariantError('Nama kategori sudah digunakan');
    }

    console.log('[verifyCategoryNameAvailable] Name available');
  }
}

module.exports = CategoryRepositoryPostgres;
