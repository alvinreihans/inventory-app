/* eslint-disable no-unused-vars */
class ItemRepository {
  async addItem(newCategory) {
    throw new Error('ITEM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getItems() {
    throw new Error('ITEM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getItemById() {
    throw new Error('ITEM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateItem() {
    throw new Error('ITEM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteItemById(itemId) {
    throw new Error('ITEM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyItemsExist(categoryId) {
    throw new Error('ITEM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyItemNameAvailable(categoryId) {
    throw new Error('ITEM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async isCategoryUsed(categoryId) {
    throw new Error('ITEM_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ItemRepository;
