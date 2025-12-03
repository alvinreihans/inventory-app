import { apiFetch } from '../utils/apiClient';

const BASE_URL = 'http://localhost:5000/api';

export async function getDashboardData() {
  const response = await apiFetch(`${BASE_URL}/dashboards`);

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  const result = await response.json();
  return result.data;
}
