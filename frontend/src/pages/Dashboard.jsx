import Layout from '../components/Layout/Layout';
import useDashboard from '../hooks/useDashboard';
import StockPerWarehouseChart from '../components/charts/StockPerWarehouseChart';
import ItemsPerCategoryChart from '../components/charts/ItemsPerCategoryChart';

export default function Dashboard() {
  const { loading, error, stockPerWarehouse, itemsPerCategory } =
    useDashboard();

  const fixedWarehouse = stockPerWarehouse.map((d) => ({
    warehouse: d.warehouse,
    total_stock: Number(d.total_stock),
  }));

  const fixedCategory = itemsPerCategory.map((d) => ({
    category: d.category,
    count: Number(d.count),
  }));

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        {/* <span className="text-gray-600 text-sm">Updated just now</span> */}
      </div>

      {loading && (
        <div className="bg-white p-6 rounded shadow text-center">
          Loading data...
        </div>
      )}

      {error && (
        <div className="bg-red-100 p-4 rounded text-red-600 font-medium shadow">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-all duration-300">
            <StockPerWarehouseChart data={fixedWarehouse} />
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-all duration-300">
            <ItemsPerCategoryChart data={fixedCategory} />
          </div>
        </div>
      )}
    </Layout>
  );
}
