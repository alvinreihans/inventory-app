import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function StockPerWarehouseChart({ data }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Stock per Warehouse</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="warehouse" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_stock" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
