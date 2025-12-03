class GetStocksUseCase {
  constructor({ stockRepository }) {
    this._stockRepository = stockRepository;
  }

  async execute() {
    const items = await this._stockRepository.getStocks(stock);
    return items;
  }
}

module.exports = GetStocksUseCase;
