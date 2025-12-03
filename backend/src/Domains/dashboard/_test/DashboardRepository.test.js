const DashboardRepository = require('../DashboardRepository');

describe('DashboardRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const dashboardRepository = new DashboardRepository();

    await expect(dashboardRepository.getStockPerWarehouse()).rejects.toThrow(
      'DASHBOARD_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );

    await expect(dashboardRepository.getItemsPerCategory()).rejects.toThrow(
      'DASHBOARD_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
