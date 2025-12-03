class GetCategoriesUseCase {
  constructor({ categoryRepository }) {
    this._categoryRepository = categoryRepository;
  }

  async execute() {
    console.log('[GetCategoriesUseCase] Mulai execute');

    const categories = await this._categoryRepository.getCategories();
    console.log('[GetCategoriesUseCase] Categories ditemukan:', categories);

    return categories;
  }
}

module.exports = GetCategoriesUseCase;
