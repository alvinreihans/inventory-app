/* eslint-disable no-unused-vars */
class StockRepository {
  async addStock(newStock) {
    throw new Error('STOCK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getStocks() {
    throw new Error('STOCK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateStock() {
    throw new Error('STOCK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyItemNotStocked(itemId) {
    throw new Error('STOCK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyWarehouseNotUsed(warehouseId) {
    throw new Error('STOCK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = StockRepository;
