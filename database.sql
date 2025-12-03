-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               PostgreSQL 17.5 on x86_64-windows, compiled by msvc-19.44.35209, 64-bit
-- Server OS:                    
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table public.authentications
CREATE TABLE IF NOT EXISTS "authentications" (
	"token" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"expires_at" TIMESTAMP NOT NULL,
	PRIMARY KEY ("token")
);

-- Dumping data for table public.authentications: 0 rows
/*!40000 ALTER TABLE "authentications" DISABLE KEYS */;
/*!40000 ALTER TABLE "authentications" ENABLE KEYS */;

-- Dumping structure for table public.categories
CREATE TABLE IF NOT EXISTS "categories" (
	"id" VARCHAR(50) NOT NULL,
	"category" VARCHAR(100) NOT NULL,
	"storage_type" VARCHAR(100) NOT NULL,
	PRIMARY KEY ("id")
);

-- Dumping data for table public.categories: 0 rows
/*!40000 ALTER TABLE "categories" DISABLE KEYS */;
INSERT INTO "categories" ("id", "category", "storage_type") VALUES
	('category-001', 'Snacks', 'Dry'),
	('category-002', 'Beverage', 'Cold'),
	('category-003', 'Meal', 'Hot');
/*!40000 ALTER TABLE "categories" ENABLE KEYS */;

-- Dumping structure for table public.items
CREATE TABLE IF NOT EXISTS "items" (
	"id" VARCHAR(50) NOT NULL,
	"name" VARCHAR(100) NOT NULL,
	"category_id" VARCHAR(50) NOT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Dumping data for table public.items: 3 rows
/*!40000 ALTER TABLE "items" DISABLE KEYS */;
INSERT INTO "items" ("id", "name", "category_id") VALUES
	('item-001', 'Pop Mie', 'category-003'),
	('item-002', 'Coca Cola', 'category-002'),
	('item-003', 'Chitato', 'category-001');
/*!40000 ALTER TABLE "items" ENABLE KEYS */;

-- Dumping structure for table public.item_warehouse_stock
CREATE TABLE IF NOT EXISTS "item_warehouse_stock" (
	"item_id" VARCHAR(50) NOT NULL,
	"warehouse_id" VARCHAR(50) NOT NULL,
	"stock" INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY ("item_id", "warehouse_id"),
	CONSTRAINT "item_warehouse_stock_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
	CONSTRAINT "item_warehouse_stock_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouses" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Dumping data for table public.item_warehouse_stock: 0 rows
/*!40000 ALTER TABLE "item_warehouse_stock" DISABLE KEYS */;
INSERT INTO "item_warehouse_stock" ("item_id", "warehouse_id", "stock") VALUES
	('item-001', 'warehouse-001', 10),
	('item-001', 'warehouse-002', 5),
	('item-001', 'warehouse-003', 3),
	('item-002', 'warehouse-001', 12),
	('item-002', 'warehouse-002', 20),
	('item-002', 'warehouse-003', 18),
	('item-003', 'warehouse-001', 8),
	('item-003', 'warehouse-002', 15),
	('item-003', 'warehouse-003', 7);
/*!40000 ALTER TABLE "item_warehouse_stock" ENABLE KEYS */;

-- Dumping structure for table public.pgmigrations
CREATE TABLE IF NOT EXISTS "pgmigrations" (
	"id" SERIAL NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"run_on" TIMESTAMP NOT NULL,
	PRIMARY KEY ("id")
);

-- Dumping data for table public.pgmigrations: -1 rows
/*!40000 ALTER TABLE "pgmigrations" DISABLE KEYS */;
INSERT INTO "pgmigrations" ("id", "name", "run_on") VALUES
	(1, '1764574793690_create-table-users', '2025-12-03 00:46:31.740496'),
	(2, '1764575457879_create-table-authentications', '2025-12-03 00:46:31.740496'),
	(3, '1764582506597_create-table-categories', '2025-12-03 00:46:31.740496'),
	(4, '1764582543818_create-table-warehouses', '2025-12-03 00:46:31.740496'),
	(5, '1764582566422_create-table-items', '2025-12-03 00:46:31.740496'),
	(6, '1764582567426_create-table-item-warehouse-stock', '2025-12-03 00:46:31.740496');
/*!40000 ALTER TABLE "pgmigrations" ENABLE KEYS */;

-- Dumping structure for table public.users
CREATE TABLE IF NOT EXISTS "users" (
	"id" VARCHAR(50) NOT NULL,
	"username" VARCHAR(50) NOT NULL,
	"password" TEXT NOT NULL,
	"fullname" TEXT NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE "users_username_key" ("username")
);

-- Dumping data for table public.users: 0 rows
/*!40000 ALTER TABLE "users" DISABLE KEYS */;
/*!40000 ALTER TABLE "users" ENABLE KEYS */;

-- Dumping structure for table public.warehouses
CREATE TABLE IF NOT EXISTS "warehouses" (
	"id" VARCHAR(50) NOT NULL,
	"location" VARCHAR(100) NOT NULL,
	PRIMARY KEY ("id")
);

-- Dumping data for table public.warehouses: 0 rows
/*!40000 ALTER TABLE "warehouses" DISABLE KEYS */;
INSERT INTO "warehouses" ("id", "location") VALUES
	('warehouse-001', 'Jakarta'),
	('warehouse-002', 'Palembang'),
	('warehouse-003', 'Lampung');
/*!40000 ALTER TABLE "warehouses" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
