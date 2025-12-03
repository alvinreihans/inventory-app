const AddCategory = require('../../Domains/categories/entities/AddCategory');

class AddCategoryUseCase {
  constructor({ categoryRepository }) {
    this._categoryRepository = categoryRepository;
  }

  async execute(useCasePayload) {
    console.log('[AddCategoryUseCase] Mulai execute');
    console.log('[AddCategoryUseCase] Payload:', useCasePayload);

    const category = new AddCategory(useCasePayload);
    console.log(
      '[AddCategoryUseCase] Payload valid → entity dibuat:',
      category
    );

    await this._categoryRepository.verifyCategoryNameAvailable(
      useCasePayload.category
    );
    console.log('[AddCategoryUseCase] Nama kategori tersedia');

    const result = await this._categoryRepository.addCategory(category);
    console.log('[AddCategoryUseCase] Kategori berhasil ditambahkan:', result);

    return result;
  }
}

module.exports = AddCategoryUseCase;
