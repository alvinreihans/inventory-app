class AddedWarehouse {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, location } = payload;

    this.id = id;
    this.location = location;
  }

  _verifyPayload({ id, location }) {
    if (!id || !location) {
      throw new Error('ADDED_WAREHOUSE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof location !== 'string') {
      throw new Error('ADDED_WAREHOUSE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedWarehouse;
