class AddedCategory {
  constructor(payload) {
    console.log('[AddedCategory] Constructor dipanggil');
    console.log('[AddedCategory] Payload diterima:', payload);

    this._verifyPayload(payload);

    const { id, category, storageType } = payload;

    this.id = id;
    this.category = category;
    this.storageType = storageType;

    console.log('[AddedCategory] Entity berhasil dibuat:', this);
  }

  _verifyPayload({ id, category, storageType }) {
    console.log('[AddedCategory] Verifikasi payload...');

    if (!id || !category || !storageType) {
      console.log('[AddedCategory] Gagal: property tidak lengkap');
      throw new Error('ADDED_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof category !== 'string' ||
      typeof storageType !== 'string'
    ) {
      console.log('[AddedCategory] Gagal: tipe data tidak sesuai');
      throw new Error('ADDED_CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    console.log('[AddedCategory] Payload valid ✔️');
  }
}

module.exports = AddedCategory;
