const AddItem = require('../../Domains/items/entities/AddItem');

class AddItemUseCase {
  constructor({ itemRepository, categoryRepository }) {
    this._itemRepository = itemRepository;
    this._categoryRepository = categoryRepository;
  }

  async execute(useCasePayload) {
    console.log('[AddItemUseCase] Mulai execute');
    console.log('[AddItemUseCase] Payload:', useCasePayload);

    const item = new AddItem(useCasePayload);
    console.log('[AddItemUseCase] Entity dibuat:', item);

    await this._categoryRepository.verifyCategoryExist(
      useCasePayload.categoryId
    );
    console.log('[AddItemUseCase] Kategori exist ✔️');

    await this._itemRepository.verifyItemNameAvailable(useCasePayload.name);
    console.log('[AddItemUseCase] Nama item tersedia ✔️');

    const result = await this._itemRepository.addItem(item);
    console.log('[AddItemUseCase] Item berhasil ditambahkan:', result);

    return result;
  }
}

module.exports = AddItemUseCase;
