class GetDashboardDataUseCase {
  constructor({ dashboardRepository }) {
    this._dashboardRepository = dashboardRepository;
  }

  async execute() {
    // Ambil data untuk chart stok per warehouse
    const stockPerWarehouse =
      await this._dashboardRepository.getStockPerWarehouse();

    // Ambil data untuk chart stok per warehouse
    const itemsPerCategory =
      await this._dashboardRepository.getItemsPerCategory();

    return {
      stockPerWarehouse,
      itemsPerCategory,
    };
  }
}

module.exports = GetDashboardDataUseCase;
