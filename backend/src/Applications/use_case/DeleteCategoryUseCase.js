class DeleteCategoryUseCase {
  constructor({ categoryRepository, itemRepository }) {
    this._categoryRepository = categoryRepository;
    this._itemRepository = itemRepository;
  }

  async execute(useCasePayload) {
    console.log('[DeleteCategoryUseCase] Mulai execute');
    console.log('[DeleteCategoryUseCase] Payload:', useCasePayload);

    await this._categoryRepository.verifyCategoryExist(useCasePayload.id);
    console.log('[DeleteCategoryUseCase] Kategori exist');

    await this._itemRepository.isCategoryUsed(useCasePayload.id);
    console.log('[DeleteCategoryUseCase] Kategori tidak digunakan item');

    await this._categoryRepository.deleteCategoryById(useCasePayload.id);
    console.log('[DeleteCategoryUseCase] Kategori berhasil dihapus');
  }
}

module.exports = DeleteCategoryUseCase;
