const AddStock = require('../../Domains/stocks/entities/AddStock');

class AddStockUseCase {
  constructor({ stockRepository, itemRepository, warehouseRepository }) {
    this._stockRepository = stockRepository;
    this._itemRepository = itemRepository;
    this._warehouseRepository = warehouseRepository;
  }

  async execute(useCasePayload) {
    // pengecekan payload
    const stock = new AddStock(useCasePayload);

    await this._itemRepository.verifyItemsExist(useCasePayload.itemId);
    await this._warehouseRepository.verifyWarehouseExist(
      useCasePayload.warehouseId
    );

    // tambahkan ke repository
    return this._stockRepository.addStock(stock);
  }
}

module.exports = AddStockUseCase;
