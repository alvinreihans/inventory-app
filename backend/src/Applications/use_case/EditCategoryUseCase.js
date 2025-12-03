const AddedCategories = require('../../Domains/categories/entities/AddedCategory');

class EditCategoryUseCase {
  constructor({ categoryRepository }) {
    this._categoryRepository = categoryRepository;
  }

  async execute(useCasePayload) {
    console.log('[EditCategoryUseCase] Mulai execute');
    console.log('[EditCategoryUseCase] Payload:', useCasePayload);

    const category = new AddedCategories(useCasePayload);
    console.log(
      '[EditCategoryUseCase] Payload valid → entity dibuat:',
      category
    );

    await this._categoryRepository.verifyCategoryExist(useCasePayload.id);
    console.log('[EditCategoryUseCase] Kategori exist');

    const oldCategory = await this._categoryRepository.getCategoryById(
      useCasePayload.id
    );
    console.log('[EditCategoryUseCase] Data kategori lama:', oldCategory);

    if (useCasePayload.category !== oldCategory.category) {
      await this._categoryRepository.verifyCategoryNameAvailable(
        useCasePayload.category
      );
      console.log('[EditCategoryUseCase] Nama kategori baru tersedia ✔️');
    } else {
      console.log(
        '[EditCategoryUseCase] Nama kategori tidak berubah, verifikasi dilewati'
      );
    }

    const result = await this._categoryRepository.updateCategory(category);
    console.log('[EditCategoryUseCase] Kategori berhasil diupdate:', result);

    return result;
  }
}

module.exports = EditCategoryUseCase;
