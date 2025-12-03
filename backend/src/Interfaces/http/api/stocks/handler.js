const AddStockUseCase = require('../../../../Applications/use_case/AddStockUseCase');
const GetStocksUseCase = require('../../../../Applications/use_case/GetStocksUseCase');
const EditStockUseCase = require('../../../../Applications/use_case/EditStockUseCase');

class StocksHandler {
  constructor(container) {
    this._container = container;
    this.postStockHandler = this.postStockHandler.bind(this);
    this.getStocksHandler = this.getStocksHandler.bind(this);
    this.putStockHandler = this.putStockHandler.bind(this);
  }

  async postStockHandler(request, h) {
    const addStockUseCase = this._container.getInstance(AddStockUseCase.name);

    await addStockUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
    });
    response.code(201);
    return response;
  }

  async getStocksHandler(request, h) {
    const getStocksUseCase = this._container.getInstance(GetStocksUseCase.name);

    const stocks = await getStocksUseCase.execute();

    const response = h.response({
      status: 'success',
      data: { stocks },
    });
    response.code(200);
    return response;
  }

  async putStockHandler(request, h) {
    const editStockUseCase = this._container.getInstance(EditStockUseCase.name);

    await editStockUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = StocksHandler;
