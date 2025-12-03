import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../api/category';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: '', category: '', storageType: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Deklarasi loadData sebelum useEffect (ESLint-friendly)
  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      // defensive: API mungkin mengembalikan struktur berbeda
      const list = Array.isArray(data) ? data : data?.categories ?? [];
      setCategories(list);
    } catch (err) {
      setError(err?.message || 'Gagal memuat categories');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      if (editing) {
        await updateCategory(form);
      } else {
        await createCategory({
          category: form.category,
          storageType: form.storageType,
        });
      }
      // reset & refresh
      setForm({ id: '', category: '', storageType: '' });
      setEditing(false);
      await loadData();
    } catch (err) {
      setError(err?.message || 'Gagal menyimpan category');
    }
  }

  function handleEdit(cat) {
    // mapping defensif (kadang nama field berbeda)
    setForm({
      id: cat.id,
      category: cat.category ?? cat.name ?? '',
      storageType: cat.storageType ?? cat.storageType ?? '',
    });
    setEditing(true);
  }

  async function handleDelete(id) {
    if (!confirm('Hapus category ini?')) return;
    setError(null);
    try {
      await deleteCategory(id);
      await loadData();
    } catch (err) {
      setError(err?.message || 'Gagal menghapus category');
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {loading && <p className="mb-4">Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">
          {editing ? 'Edit Category' : 'Add Category'}
        </h2>

        <input
          name="category"
          placeholder="Category name"
          className="border p-2 rounded w-full mb-3"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          name="storageType"
          placeholder="Storage Type"
          className="border p-2 rounded w-full mb-3"
          value={form.storageType}
          onChange={handleChange}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            {editing ? 'Update' : 'Create'}
          </button>

          {editing && (
            <button
              type="button"
              onClick={() => {
                setForm({ id: '', category: '', storageType: '' });
                setEditing(false);
              }}
              className="py-2 px-4 rounded border">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Storage Type</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No categories
                </td>
              </tr>
            )}
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="p-3">{cat.category ?? cat.name}</td>
                <td className="p-3">
                  {cat.storageType ?? cat.storageType ?? '-'}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    className="text-blue-600"
                    onClick={() => handleEdit(cat)}>
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(cat.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
