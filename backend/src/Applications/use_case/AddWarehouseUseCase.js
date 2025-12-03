const AddWarehouse = require('../../Domains/warehouses/entities/AddWarehouse');

class AddWarehouseUseCase {
  constructor({ warehouseRepository }) {
    this._warehouseRepository = warehouseRepository;
  }

  async execute(useCasePayload) {
    const warehouse = new AddWarehouse(useCasePayload);

    const result = this._warehouseRepository.addWarehouse(warehouse);

    return result;
  }
}

module.exports = AddWarehouseUseCase;
