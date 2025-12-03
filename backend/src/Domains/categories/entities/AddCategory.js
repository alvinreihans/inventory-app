class AddCategory {
  constructor(payload) {
    console.log('[AddCategory] Constructor dipanggil');
    console.log('[AddCategory] Payload diterima:', payload);

    this._verifyPayload(payload);

    const { category, storageType } = payload;

    this.category = category;
    this.storageType = storageType;

    console.log('[AddCategory] Entity berhasil dibuat:', this);
  }

  _verifyPayload({ category, storageType }) {
    console.log('[AddCategory] Verifikasi payload...');

    if (!category || !storageType) {
      console.log('[AddCategory] Gagal: property tidak lengkap');
      throw new Error('ADD_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof category !== 'string' || typeof storageType !== 'string') {
      console.log('[AddCategory] Gagal: tipe data tidak sesuai');
      throw new Error('ADD_CATEGORY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    console.log('[AddCategory] Payload valid ✔️');
  }
}

module.exports = AddCategory;
