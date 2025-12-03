const AddWarehouseUseCase = require('../../../../Applications/use_case/AddWarehouseUseCase');
const GetWarehousesUseCase = require('../../../../Applications/use_case/GetWarehousesUseCase');
const EditWarehouseUseCase = require('../../../../Applications/use_case/EditWarehouseUseCase');
const DeleteWarehouseUseCase = require('../../../../Applications/use_case/DeleteWarehouseUseCase');

class WarehousesHandler {
  constructor(container) {
    this._container = container;
    this.postWarehouseHandler = this.postWarehouseHandler.bind(this);
    this.getWarehousesHandler = this.getWarehousesHandler.bind(this);
    this.putWarehouseHandler = this.putWarehouseHandler.bind(this);
    this.deleteWarehouseHandler = this.deleteWarehouseHandler.bind(this);
  }

  async postWarehouseHandler(request, h) {
    const addWarehouseUseCase = this._container.getInstance(
      AddWarehouseUseCase.name
    );

    await addWarehouseUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
    });
    response.code(201);
    return response;
  }

  async getWarehousesHandler(request, h) {
    console.log('[ItemsHandler][GET] Handler berjalan');

    const getWarehousesUseCase = this._container.getInstance(
      GetWarehousesUseCase.name
    );

    const warehouses = await getWarehousesUseCase.execute();

    const response = h.response({
      status: 'success',
      data: { warehouses },
    });
    response.code(200);
    return response;
  }

  async putWarehouseHandler(request, h) {
    const editWarehouseUseCase = this._container.getInstance(
      EditWarehouseUseCase.name
    );

    await editWarehouseUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }

  async deleteWarehouseHandler(request, h) {
    const deleteWarehouseUseCase = this._container.getInstance(
      DeleteWarehouseUseCase.name
    );
    console.log('MULAI EXECUTE DELETE WAREHOUSE');
    await deleteWarehouseUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = WarehousesHandler;
