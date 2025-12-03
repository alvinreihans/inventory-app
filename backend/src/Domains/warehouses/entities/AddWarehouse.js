class AddWarehouse {
  constructor(payload) {
    this._verifyPayload(payload);

    const { location } = payload;

    this.location = location;
  }

  _verifyPayload({ location }) {
    if (!location) {
      throw new Error('ADD_WAREHOUSE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof location !== 'string') {
      throw new Error('ADD_WAREHOUSE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddWarehouse;
