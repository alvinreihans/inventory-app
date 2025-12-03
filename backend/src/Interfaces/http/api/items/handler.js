const AddItemUseCase = require('../../../../Applications/use_case/AddItemUseCase');
const GetItemsUseCase = require('../../../../Applications/use_case/GetItemsUseCase');
const EditItemUseCase = require('../../../../Applications/use_case/EditItemUseCase');
const DeleteItemUseCase = require('../../../../Applications/use_case/DeleteItemUseCase');

class ItemsHandler {
  constructor(container) {
    this._container = container;
    this.postItemHandler = this.postItemHandler.bind(this);
    this.getItemsHandler = this.getItemsHandler.bind(this);
    this.putItemHandler = this.putItemHandler.bind(this);
    this.deleteItemHandler = this.deleteItemHandler.bind(this);
  }

  async postItemHandler(request, h) {
    console.log('[ItemsHandler][POST] Handler berjalan');
    console.log('[POST Item] Payload:', request.payload);

    const addItemUseCase = this._container.getInstance(AddItemUseCase.name);

    await addItemUseCase.execute(request.payload);

    console.log('[ItemsHandler][POST] Item berhasil ditambahkan');

    const response = h.response({
      status: 'success',
    });
    response.code(201);
    return response;
  }

  async getItemsHandler(request, h) {
    console.log('[ItemsHandler][GET] Handler berjalan');

    const getItemsUseCase = this._container.getInstance(GetItemsUseCase.name);

    const items = await getItemsUseCase.execute();

    console.log('[ItemsHandler][GET] Items ditemukan:', items);

    const response = h.response({
      status: 'success',
      data: { items },
    });
    response.code(200);
    return response;
  }

  async putItemHandler(request, h) {
    console.log('[ItemsHandler][PUT] Handler berjalan');
    console.log('[PUT Item] Payload:', request.payload);

    const editItemUseCase = this._container.getInstance(EditItemUseCase.name);

    await editItemUseCase.execute(request.payload);

    console.log('[ItemsHandler][PUT] Item berhasil diupdate');

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }

  async deleteItemHandler(request, h) {
    console.log('[ItemsHandler][DELETE] Handler berjalan');
    console.log('[DELETE Item] Payload:', request.payload);

    const deleteItemUseCase = this._container.getInstance(
      DeleteItemUseCase.name
    );

    await deleteItemUseCase.execute(request.payload);

    console.log('[ItemsHandler][DELETE] Item berhasil dihapus');

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = ItemsHandler;
