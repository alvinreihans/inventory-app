class AddItem {
  constructor(payload) {
    console.log('[AddItem] Constructor dipanggil');
    console.log('[AddItem] Payload diterima:', payload);

    this._verifyPayload(payload);

    const { name, categoryId } = payload;

    this.name = name;
    this.categoryId = categoryId;

    console.log('[AddItem] Entity berhasil dibuat:', this);
  }

  _verifyPayload({ name, categoryId }) {
    console.log('[AddItem] Verifikasi payload...');

    if (!name || !categoryId) {
      console.log('[AddItem] Gagal: property tidak lengkap');
      throw new Error('ADD_ITEM.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof name !== 'string' || typeof categoryId !== 'string') {
      console.log('[AddItem] Gagal: tipe data tidak sesuai');
      throw new Error('ADD_ITEM.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    console.log('[AddItem] Payload valid ✔️');
  }
}

module.exports = AddItem;
