const GetDashboardDataUseCase = require('../../../../Applications/use_case/GetDashboardDataUseCase');

class DashboardsHandler {
  constructor(container) {
    this._container = container;
    this.getDashboardDataHandler = this.getDashboardDataHandler.bind(this);
  }

  async getDashboardDataHandler(request, h) {
    const getDashboardDataUseCase = this._container.getInstance(
      GetDashboardDataUseCase.name
    );

    const data = await getDashboardDataUseCase.execute();

    const response = h.response({
      status: 'success',
      data,
    });
    response.code(200);

    return response;
  }
}

module.exports = DashboardsHandler;
