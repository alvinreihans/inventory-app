import { auth } from './auth';
import { refreshAccessToken } from '../api/auth';

export async function apiFetch(url, options = {}) {
  let accessToken = auth.getAccessToken();

  const config = {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  let response = await fetch(url, config);

  // Jika token expired → coba refresh
  if (response.status === 401) {
    try {
      accessToken = await refreshAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
      response = await fetch(url, config); // retry
    } catch (err) {
      throw err;
    }
  }

  return response;
}
