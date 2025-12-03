import { auth } from '../utils/auth';

const BASE_URL = 'http://localhost:5000/api';

export async function refreshAccessToken() {
  const refreshToken = auth.getRefreshToken();

  const response = await fetch(`${BASE_URL}/authentications`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const result = await response.json();

  if (result.status === 'success') {
    auth.saveTokens(result.data.accessToken, refreshToken);
    return result.data.accessToken;
  }

  // refresh gagal → logout
  auth.clearTokens();
  window.location.href = '/';
  throw new Error('Refresh token failed');
}
