class DeleteWarehouseUseCase {
  constructor({ warehouseRepository, stockRepository }) {
    this._warehouseRepository = warehouseRepository;
    this._stockRepository = stockRepository;
  }

  async execute(useCasePayload) {
    console.log('MASUK DELETE WAREHOUSE USE CASE');
    console.log('verifyWarehouseExist');
    await this._warehouseRepository.verifyWarehouseExist(useCasePayload.id);
    console.log('AMAN');
    console.log('verifyWarehouseNotUsed');
    await this._stockRepository.verifyWarehouseNotUsed(useCasePayload.id);
    console.log('AMAN');
    console.log('deleteWarehouseById');
    await this._warehouseRepository.deleteWarehouseById(useCasePayload.id);
    console.log('AMAN');
  }
}

module.exports = DeleteWarehouseUseCase;
