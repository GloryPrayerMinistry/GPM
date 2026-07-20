'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { PRAYER_CATEGORIES } from '@/app/lib/prayers';

interface PrayerItem {
  id: string;
  title: string;
  category: string;
  description: string;
  scripture: string;
  text: string;
  isActive: boolean;
  isPinned: boolean;
  sortOrder: number;
}

const categoryOptions = PRAYER_CATEGORIES.filter((c) => c.id !== 'all');

const emptyForm = {
  title: '',
  category: 'morning',
  description: '',
  scripture: '',
  text: '',
  isActive: true,
  isPinned: true,
  sortOrder: 0,
};

export default function AdminPrayersPage() {
  const [items, setItems] = useState<PrayerItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadItems = () => {
    setLoadError(null);
    void fetch('/api/admin/prayers', { credentials: 'include' })
      .then(async (res) => {
        if (res.status === 401) {
          setLoadError('Session expired. Please sign in again.');
          return [];
        }
        if (!res.ok) {
          setLoadError('Could not load prayers.');
          return [];
        }
        return res.json() as Promise<PrayerItem[]>;
      })
      .then(setItems);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setSaving(true);

    const url = editingId ? `/api/admin/prayers/${editingId}` : '/api/admin/prayers';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setSaveError(data.error || 'Save failed. Please try again.');
        return;
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      loadItems();
    } catch {
      setSaveError('Network error. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (item: PrayerItem) => {
    setForm({
      title: item.title,
      category: item.category,
      description: item.description,
      scripture: item.scripture,
      text: item.text,
      isActive: item.isActive,
      isPinned: item.isPinned,
      sortOrder: item.sortOrder,
    });
    setEditingId(item.id);
    setSaveError(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this prayer?')) return;
    await fetch(`/api/admin/prayers/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const categoryLabel = (id: string) =>
    categoryOptions.find((c) => c.id === id)?.label ?? id;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prayers</h1>
          <p className="text-gray-500 text-sm">
            Manage prayers shown on the public Prayers page.
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm(emptyForm);
            setSaveError(null);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-primary text-sm font-semibold"
        >
          <Plus size={18} /> Add Prayer
        </button>
      </div>

      {loadError && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
          {loadError}{' '}
          <a href="/admin/login" className="underline font-medium">
            Go to login
          </a>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 mb-8 space-y-4">
          <h2 className="font-semibold">{editingId ? 'Edit' : 'New'} Prayer</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="Morning Prayer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Short description</label>
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              placeholder="Brief summary shown on the prayer card"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Scripture reference</label>
            <input
              value={form.scripture}
              onChange={(e) => setForm({ ...form, scripture: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              placeholder="Psalm 5:3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prayer text</label>
            <textarea
              required
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              rows={8}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              placeholder="Heavenly Father…"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-1">Sort order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm({ ...form, sortOrder: parseInt(e.target.value, 10) || 0 })
                }
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Used among non-pinned prayers. Pinned prayers always appear first.
              </p>
            </div>
            <div className="space-y-2 pb-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isPinned}
                  onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
                />
                Pin to top of prayers page
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                Active (visible on website)
              </label>
            </div>
          </div>

          {saveError && (
            <p className="text-sm text-red-600">{saveError}</p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg btn-primary text-sm font-semibold disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2 rounded-lg border text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">
                Category
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden lg:table-cell">
                Status
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">
                  {item.title}
                  {item.isPinned && (
                    <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-800">
                      Pinned
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                  {categoryLabel(item.category)}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      item.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item.isActive ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => startEdit(item)}
                    className="p-1.5 text-gray-500 hover:text-blue-600"
                    aria-label={`Edit ${item.title}`}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600"
                    aria-label={`Delete ${item.title}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                  No prayers yet. Add one or run <code className="text-xs">npm run db:seed</code>.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
