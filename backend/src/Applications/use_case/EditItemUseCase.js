const AddedItem = require('../../Domains/items/entities/AddedItem');

class EditItemUseCase {
  constructor({ itemRepository, categoryRepository }) {
    this._itemRepository = itemRepository;
    this._categoryRepository = categoryRepository;
  }

  async execute(useCasePayload) {
    console.log('[EditItemsUseCase] Mulai execute');
    console.log('[EditItemsUseCase] Payload:', useCasePayload);

    const item = new AddedItem(useCasePayload);
    console.log('[EditItemsUseCase] Entity dibuat:', item);

    await this._itemRepository.verifyItemsExist(useCasePayload.id);
    console.log('[EditItemsUseCase] Item exist ✔️');

    await this._categoryRepository.verifyCategoryExist(
      useCasePayload.categoryId
    );
    console.log('[EditItemsUseCase] Kategori exist ✔️');

    const oldItem = await this._itemRepository.getItemById(useCasePayload.id);
    console.log('[EditItemsUseCase] Data item lama:', oldItem);

    if (useCasePayload.name !== oldItem.name) {
      await this._itemRepository.verifyItemNameAvailable(useCasePayload.name);
      console.log('[EditItemsUseCase] Nama item baru tersedia ✔️');
    } else {
      console.log(
        '[EditItemsUseCase] Nama item tidak berubah, verifikasi dilewati'
      );
    }

    if (useCasePayload.category !== oldItem.category) {
      await this._categoryRepository.verifyCategoryNameAvailable(
        useCasePayload.category
      );
      console.log('[EditItemsUseCase] Nama kategori baru tersedia ✔️');
    } else {
      console.log(
        '[EditItemsUseCase] Nama kategori tidak berubah, verifikasi dilewati'
      );
    }

    const result = await this._itemRepository.updateItem(item);
    console.log('[EditItemsUseCase] Item berhasil diupdate:', result);

    return result;
  }
}

module.exports = EditItemUseCase;
