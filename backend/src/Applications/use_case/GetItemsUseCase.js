class GetItemsUseCase {
  constructor({ itemRepository }) {
    this._itemRepository = itemRepository;
  }

  async execute() {
    console.log('[GetItemsUseCase] Mulai execute');

    const items = await this._itemRepository.getItems();

    console.log('[GetItemsUseCase] Items ditemukan:', items);

    return items;
  }
}

module.exports = GetItemsUseCase;
