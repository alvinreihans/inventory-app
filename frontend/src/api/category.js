import { auth } from '../utils/auth';

const BASE_URL = 'http://localhost:5000/api';

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/category`, {
    headers: {
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
  });

  const result = await response.json();
  return result.data.categories;
}

export async function createCategory(payload) {
  const response = await fetch(`${BASE_URL}/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

export async function updateCategory(payload) {
  const response = await fetch(`${BASE_URL}/category`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

export async function deleteCategory(id) {
  const response = await fetch(`${BASE_URL}/category`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
    body: JSON.stringify({ id }),
  });

  return response.json();
}
