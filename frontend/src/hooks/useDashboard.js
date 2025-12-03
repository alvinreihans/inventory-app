import { useEffect, useState } from 'react';
import { getDashboardData } from '../api/dashboard';

export default function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [stockPerWarehouse, setStockPerWarehouse] = useState([]);
  const [itemsPerCategory, setItemsPerCategory] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    getDashboardData()
      .then((data) => {
        setStockPerWarehouse(data.stockPerWarehouse);
        setItemsPerCategory(data.itemsPerCategory);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return {
    loading,
    error,
    stockPerWarehouse,
    itemsPerCategory,
  };
}
