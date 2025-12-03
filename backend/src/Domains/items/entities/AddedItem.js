class AddedItem {
  constructor(payload) {
    console.log('[AddedItem] Constructor dipanggil');
    console.log('[AddedItem] Payload diterima:', payload);

    this._verifyPayload(payload);

    const { id, name, categoryId } = payload;

    this.id = id;
    this.name = name;
    this.categoryId = categoryId;

    console.log('[AddedItem] Entity berhasil dibuat:', this);
  }

  _verifyPayload({ id, name, categoryId }) {
    console.log('[AddedItem] Verifikasi payload...');

    if (!id || !name || !categoryId) {
      console.log('[AddedItem] Gagal: property tidak lengkap');
      throw new Error('ADDED_ITEM.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof name !== 'string' ||
      typeof categoryId !== 'string'
    ) {
      console.log('[AddedItem] Gagal: tipe data tidak sesuai');
      throw new Error('ADDED_ITEM.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    console.log('[AddedItem] Payload valid ✔️');
  }
}

module.exports = AddedItem;
