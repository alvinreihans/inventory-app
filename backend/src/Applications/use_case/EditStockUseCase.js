const AddedStock = require('../../Domains/stocks/entities/AddedStock');

class EditStockUseCase {
  constructor({ stockRepository, itemRepository, warehouseRepository }) {
    this._stockRepository = stockRepository;
    this._itemRepository = itemRepository;
    this._warehouseRepository = warehouseRepository;
  }

  async execute(useCasePayload) {
    const stock = new AddedStock(useCasePayload);

    await this._itemRepository.verifyItemsExist(useCasePayload.itemId);
    await this._warehouseRepository.verifyWarehouseExist(
      useCasePayload.warehouseId
    );

    const result = await this._stockRepository.updateStock(stock);

    return result;
  }
}

module.exports = EditStockUseCase;
