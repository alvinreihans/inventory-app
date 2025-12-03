const AddCategoryUseCase = require('../../../../Applications/use_case/AddCategoryUseCase');
const GetCategoriesUseCase = require('../../../../Applications/use_case/GetCategoriesUseCase');
const EditCategoryUseCase = require('../../../../Applications/use_case/EditCategoryUseCase');
const DeleteCategoryUseCase = require('../../../../Applications/use_case/DeleteCategoryUseCase');

class CategoriesHandler {
  constructor(container) {
    this._container = container;
    this.postCategoryHandler = this.postCategoryHandler.bind(this);
    this.getCategoriesHandler = this.getCategoriesHandler.bind(this);
    this.putCategoryHandler = this.putCategoryHandler.bind(this);
    this.deleteCategoryHandler = this.deleteCategoryHandler.bind(this);
  }

  async postCategoryHandler(request, h) {
    console.log('[CategoriesHandler][POST] Handler berjalan');
    console.log('[POST] Payload:', request.payload);

    const addCategoryUseCase = this._container.getInstance(
      AddCategoryUseCase.name
    );

    await addCategoryUseCase.execute(request.payload);

    console.log('[CategoriesHandler][POST] Berhasil menambahkan kategori');

    const response = h.response({
      status: 'success',
    });
    response.code(201);
    return response;
  }

  async getCategoriesHandler(request, h) {
    console.log('[CategoriesHandler][GET] Handler berjalan');

    const getCategoriesUseCase = this._container.getInstance(
      GetCategoriesUseCase.name
    );

    const categories = await getCategoriesUseCase.execute();

    console.log('[CategoriesHandler][GET] Categories ditemukan:', categories);

    const response = h.response({
      status: 'success',
      data: { categories },
    });
    response.code(200);
    return response;
  }

  async putCategoryHandler(request, h) {
    console.log('[CategoriesHandler][PUT] Handler berjalan');
    console.log('[PUT] Payload:', request.payload);

    const editCategoryUseCase = this._container.getInstance(
      EditCategoryUseCase.name
    );

    await editCategoryUseCase.execute(request.payload);

    console.log('[CategoriesHandler][PUT] Berhasil mengedit kategori');

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }

  async deleteCategoryHandler(request, h) {
    console.log('[CategoriesHandler][DELETE] Handler berjalan');
    console.log('[DELETE] Payload:', request.payload);

    const deleteCategoryUseCase = this._container.getInstance(
      DeleteCategoryUseCase.name
    );

    await deleteCategoryUseCase.execute(request.payload);

    console.log('[CategoriesHandler][DELETE] Berhasil menghapus kategori');

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = CategoriesHandler;
