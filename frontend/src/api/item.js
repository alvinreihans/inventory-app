import { auth } from '../utils/auth';

const BASE_URL = 'http://localhost:5000/api';

export async function getItems() {
  const response = await fetch(`${BASE_URL}/item`, {
    headers: {
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
  });

  const result = await response.json();
  return result.data.items;
}

export async function createItem(payload) {
  const response = await fetch(`${BASE_URL}/item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

export async function updateItem(payload) {
  const response = await fetch(`${BASE_URL}/item`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

export async function deleteItem(id) {
  const response = await fetch(`${BASE_URL}/item`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
    body: JSON.stringify({ id }),
  });

  return response.json();
}
