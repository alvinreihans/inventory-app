import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { getItems, createItem, updateItem, deleteItem } from '../api/item';
import { getCategories } from '../api/category';

export default function Items() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    id: '',
    name: '',
    categoryId: '',
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [itemsData, categoriesData] = await Promise.all([
        getItems(),
        getCategories(),
      ]);
      const itemsList = Array.isArray(itemsData)
        ? itemsData
        : itemsData?.items ?? [];
      const categoriesList = Array.isArray(categoriesData)
        ? categoriesData
        : categoriesData?.categories ?? [];
      setItems(itemsList);
      setCategories(categoriesList);
    } catch (err) {
      setError(err?.message || 'Gagal memuat data');
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
        await updateItem(form);
      } else {
        // API expects { name, categoryId }
        await createItem({ name: form.name, categoryId: form.categoryId });
      }
      setForm({ id: '', name: '', categoryId: '' });
      setEditing(false);
      await loadData();
    } catch (err) {
      setError(err?.message || 'Gagal menyimpan item');
    }
  }

  function handleEdit(item) {
    setForm({
      id: item.id,
      name: item.name,
      // defensive mapping: item may contain category_id or categoryId
      categoryId: item.category_id ?? item.categoryId ?? item.category ?? '',
    });
    setEditing(true);
  }

  async function handleDelete(id) {
    if (!confirm('Hapus item ini?')) return;
    setError(null);
    try {
      await deleteItem(id);
      await loadData();
    } catch (err) {
      setError(err?.message || 'Gagal menghapus item');
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Items</h1>

      {loading && <p className="mb-4">Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">
          {editing ? 'Edit Item' : 'Add Item'}
        </h2>

        <input
          name="name"
          placeholder="Item name"
          className="border p-2 rounded w-full mb-3"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* CATEGORY DROPDOWN */}
        <select
          name="categoryId"
          className="border p-2 rounded w-full mb-3"
          value={form.categoryId}
          onChange={handleChange}
          required>
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.category ?? cat.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            {editing ? 'Update' : 'Create'}
          </button>

          {editing && (
            <button
              type="button"
              onClick={() => {
                setForm({ id: '', name: '', categoryId: '' });
                setEditing(false);
              }}
              className="py-2 px-4 rounded border">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No items
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.name}</td>
                <td className="p-3">
                  {item.category_name ?? item.category ?? '-'}
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    className="text-blue-600"
                    onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(item.id)}>
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
