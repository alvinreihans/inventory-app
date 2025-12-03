class AddStock {
  constructor(payload) {
    this._verifyPayload(payload);

    const { itemId, warehouseId, stock } = payload;

    this.itemId = itemId;
    this.warehouseId = warehouseId;
    this.stock = stock;
  }

  _verifyPayload({ itemId, warehouseId, stock }) {
    if (!itemId || !warehouseId || stock == null) {
      throw new Error('ADD_STOCK.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof itemId !== 'string' ||
      typeof warehouseId !== 'string' ||
      typeof stock !== 'number'
    ) {
      throw new Error('ADD_STOCK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddStock;
