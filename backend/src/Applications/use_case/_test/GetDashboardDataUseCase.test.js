const GetDashboardDataUseCase = require('../GetDashboardDataUseCase');

describe('GetDashboardDataUseCase', () => {
  it('should orchestrate getting dashboard data correctly', async () => {
    // ===== Arrange (Mock Repository) =====
    const mockDashboardRepository = {
      getStockPerWarehouse: jest.fn().mockResolvedValue([
        { warehouse: 'LAMPUNG', total_stock: 70 },
        { warehouse: 'PALEMBANG', total_stock: 15 },
      ]),
      getItemsPerCategory: jest.fn().mockResolvedValue([
        { category: 'Meal', count: 1 },
        { category: 'Beverage', count: 2 },
      ]),
    };

    const getDashboardDataUseCase = new GetDashboardDataUseCase({
      dashboardRepository: mockDashboardRepository,
    });

    // ===== Act =====
    const result = await getDashboardDataUseCase.execute();

    // ===== Assert =====
    expect(mockDashboardRepository.getStockPerWarehouse).toBeCalled();
    expect(mockDashboardRepository.getItemsPerCategory).toBeCalled();

    expect(result).toStrictEqual({
      stockPerWarehouse: [
        { warehouse: 'LAMPUNG', total_stock: 70 },
        { warehouse: 'PALEMBANG', total_stock: 15 },
      ],
      itemsPerCategory: [
        { category: 'Meal', count: 1 },
        { category: 'Beverage', count: 2 },
      ],
    });
  });
});
