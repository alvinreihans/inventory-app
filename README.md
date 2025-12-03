# Normalisasi Database

Normalisasi database adalah suatu metode untuk mengurangi redundancy data serta menghindari insert/update/delete anomaly.

Proses normalisasi dilakukan melalui beberapa tahapan, di antaranya:

- **1NF (First Normal Form)**
- **2NF (Second Normal Form)**
- **3NF (Third Normal Form)**

---

## Studi Kasus

Contoh **data inventori sebelum dinormalisasi**:

| Name            | Category | Storage_Type | Warehouse          | Qty    |
| --------------- | -------- | ------------ | ------------------ | ------ |
| Instant Noodles | Meal     | Dry_rack     | LAMPUNG, PALEMBANG | 20, 15 |
| Milk            | Beverage | Chiller      | LAMPUNG            | 50     |
| Candy           | Snacks   | Shelf        | JAKARTA            | 20     |

### Masalah :

- Satu kolom memiliki **lebih dari satu nilai** → sulit diproses query
- Jika ada perubahan kategori atau storage type → harus **update banyak baris**
- Jika ada warehouse baru → data item bisa **diduplikasi**
- Rentan error & data tidak konsisten

---

## Proses Normalisasi hingga 3NF

### 1NF — First Normal Form

**Aturan:**

1. Semua kolom hanya boleh memiliki **satu nilai per baris**
2. Tidak boleh ada data yang berupa list/komposit

**Perbaikan yang dilakukan:**

- Memecah nilai `Warehouse` dan `Qty` yang ganda menjadi baris terpisah

**Hasil 1NF:**
| Name | Category | Storage_Type | Warehouse | Qty |
|----------------|----------|--------------|-----------|-----|
| Instant Noodles | Meal | Dry_rack | LAMPUNG | 20 |
| Instant Noodles | Meal | Dry_rack | PALEMBANG | 15 |
| Milk | Beverage | Chiller | LAMPUNG | 50 |
| Candy | Snacks | Shelf | JAKARTA | 20 |

---

### 2NF — Second Normal Form

**Aturan:**

1. Sudah memenuhi 1NF
2. Semua kolom **bergantung penuh pada primary key**
   (tidak ada kolom yang bergantung hanya sebagian dari composite key)

**Analisis:**

- Pada tabel 1NF terdapat dua entitas berbeda:
  - **Items**: Name, Category, Storage_Type
  - **Warehouse dan Qty** → stok barang per lokasi

**Perubahan yang dilakukan:**

- Pisahkan tabel Items dan Warehouses
- Buat tabel relasi untuk stok barang di tiap warehouse

**Hasil 2NF:**

Tabel **Items**
| ID | Name | Category | Storage_Type |
|----|------|----------|--------------|
| ITEM-1 | Instant Noodles | Meal | Dry_rack |
| ITEM-2 | Milk | Beverage | Chiller |
| ITEM-3 | Candy | Snacks | Shelf |

Tabel **Warehouses**
| ID | Warehouse |
|----|-----------|
| WH-A | LAMPUNG |
| WH-B | PALEMBANG |
| WH-C | JAKARTA |

Tabel **Item_Warehouse_Stock**
| ID_ITEM | ID_WAREHOUSE | Qty |
|--------|--------------|-----|
| ITEM-1 | WH-A | 20 |
| ITEM-1 | WH-B | 15 |
| ITEM-2 | WH-A | 50 |
| ITEM-3 | WH-C | 20 |

---

### 🔹 3NF — Third Normal Form

**Aturan:**

1. Sudah memenuhi 2NF
2. Tidak boleh ada **transitive dependency**
   → kolom non-key bergantung pada kolom non-key lainnya

**Analisis:**

- Pada tabel Items, `Category` menentukan `Storage_Type`
- Artinya:  
  `Name → Category → Storage_Type` (dependency bertingkat)

**Perubahan yang dilakukan:**

- Pisahkan Category ke tabel sendiri

**Hasil 3NF:**

Tabel **Categories**
| ID | Category | Storage_Type |
|----|----------|--------------|
| CAT-1 | Meal | Dry_rack |
| CAT-2 | Beverage | Chiller |
| CAT-3 | Snacks | Shelf |

Tabel **Items**
| ID | Name | ID_Category |
|----|------|-------------|
| ITEM-1 | Instant Noodles | CAT-1 |
| ITEM-2 | Milk | CAT-2 |
| ITEM-3 | Candy | CAT-3 |

---

---

# Backend

## Cara menjalankan backend

### 1. Clone repository & masuk ke folder backend

```bash
git clone https://github.com/alvinreihans/inventory-app.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat file .env

```bash
# HTTP SERVER
HOST=localhost
PORT=5000

# POSTGRES
PGHOST=localhost
PGUSER=developer
PGDATABASE=inventoryapi
PGPASSWORD=Password123
PGPORT=5432

# TOKENIZE (example values — DO NOT use these in production)
ACCESS_TOKEN_KEY=8b7b4ef375716ab08b2a3951b29d52fc00b1c855f9d1a847229b8c5935bef56d9d271e76a9cf08e614300395c3b90ebe559cf968a0741b18c9505549394b2c70
REFRESH_TOKEN_KEY=5078605e074a462b1460608fcbe0d0963c644402e04ad334455ff5a856cb43fd99825861dde02957d5e3184c90c532ca7d0249df20fe93d535632f3d11be7bad
ACCESS_TOKEN_AGE=3000
REFRESH_TOKEN_AGE=30000

```

### 4. Buat database dengan nama `inventoryapi` menggunakan PostgreSQL.

### 5. Jalankan migration database

```bash
npm run migrate up
```

### 6. Jalankan server

```bash
npm run start
```

### Server akan berjalan pada:

```bash
http://localhost:5000
```

Aplikasi ini tidak memiliki halaman Register pada frontend, karena inventori umumnya memiliki kontrol user ketat. Namun proses register tetap tersedia sebagai endpoint. Untuk membuat admin/user pertama, dapat menggunakan cURL (powershell):

```bash
curl -Method POST "http://localhost:5000/api/users" `
-Headers @{ "Content-Type"="application/json" } `
-Body '{"username":"alvinreihans","password":"Test123#","fullname":"Alvin Reihansyah Makarim"}'


```

---

## Database

Struktur tabel dan sample data dikelola menggunakan `node-pg-migrate`.

Berikut daftar migration yang digunakan:

- create-table-users.js
- create-table-authentications.js
- create-table-categories.js
- create-table-warehouses.js
- create-table-items.js
- create-table-item-warehouse-stock.js
- create-data-seed.js

Dump database dapat dilihat pada file `database.sql`

---

---

# Frontend

## Cara menjalankan frontend

### 1. Clone repository (jika belum) & masuk ke folder frontend

```bash
git clone https://github.com/alvinreihans/inventory-app.git
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan aplikasi

```bash
npm run dev
```

### Frontend akan berjalan pada URL

```bash
http://localhost:5173
```

---

## Koneksi

Base URL frontend

```bash
http://localhost:5173

```

Base URL backend

```bash
http://localhost:5000
```

# Informasi akun login default

Untuk login ke dalam aplikasi silahkan jalankan command cURL (powershell) ini terlebih dahulu:

```bash
curl -Method POST "http://localhost:5000/api/users" `
-Headers @{ "Content-Type"="application/json" } `
-Body '{"username":"alvinreihans","password":"Test123#","fullname":"Alvin Reihansyah Makarim"}'

```

Lalu anda dapat masuk dengan username `alvinreihans` dan password `Test123#`
