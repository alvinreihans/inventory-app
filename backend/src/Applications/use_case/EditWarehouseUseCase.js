const AddedWarehouse = require('../../Domains/warehouses/entities/AddedWarehouse');

class EditWarehouseUseCase {
  constructor({ warehouseRepository }) {
    this._warehouseRepository = warehouseRepository;
  }

  async execute(useCasePayload) {
    console.log('MASUK WAREHOUSE USE CASE');
    const warehouse = new AddedWarehouse(useCasePayload);
    console.log('BERHASIL VALIDASI PAYLOAD');

    await this._warehouseRepository.verifyWarehouseExist(useCasePayload.id);
    console.log('WAREHOUSE ADA');

    const result = await this._warehouseRepository.updateWarehouse(warehouse);
    console.log('UPDATE BERHASIL');

    return result;
  }
}

module.exports = EditWarehouseUseCase;
