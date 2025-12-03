class DeleteItemUseCase {
  constructor({ itemRepository, stockRepository }) {
    this._itemRepository = itemRepository;
    this._stockRepository = stockRepository;
  }

  async execute(useCasePayload) {
    console.log('[DeleteItemUseCase] Mulai execute');
    console.log('[DeleteItemUseCase] Payload:', useCasePayload);

    await this._itemRepository.verifyItemsExist(useCasePayload.id);
    console.log('[DeleteItemUseCase] Item exist ✔️');

    await this._stockRepository.verifyItemNotStocked(useCasePayload.id);

    await this._itemRepository.deleteItemById(useCasePayload.id);
    console.log('[DeleteItemUseCase] Item berhasil dihapus');
  }
}

module.exports = DeleteItemUseCase;
