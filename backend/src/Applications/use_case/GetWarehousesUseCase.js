class GetWarehousesUseCase {
  constructor({ warehouseRepository }) {
    this._warehouseRepository = warehouseRepository;
  }

  async execute() {
    const warehouses = await this._warehouseRepository.getWarehouses();

    return warehouses;
  }
}

module.exports = GetWarehousesUseCase;
