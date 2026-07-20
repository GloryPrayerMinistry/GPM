'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import ImageUploadField from '@/app/components/admin/ImageUploadField';

interface Flyer {
  id: string;
  title: string;
  imageUrl: string;
  description: string | null;
  linkUrl: string | null;
  ctaLabel: string | null;
  isActive: boolean;
}

const emptyForm = {
  title: '',
  imageUrl: '',
  description: '',
  linkUrl: '',
  ctaLabel: '',
  isActive: true,
};

export default function AdminFlyersPage() {
  const [items, setItems] = useState<Flyer[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadFlyers = () => {
    setLoadError(null);
    void fetch('/api/admin/flyers', { credentials: 'include' })
      .then(async (res) => {
        if (res.status === 401) {
          setLoadError('Session expired. Please sign in again.');
          return [];
        }
        if (!res.ok) {
          setLoadError('Could not load flyers. Try refreshing the page.');
          return [];
        }
        return res.json() as Promise<Flyer[]>;
      })
      .then(setItems);
  };

  useEffect(() => {
    loadFlyers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/admin/flyers/${editingId}` : '/api/admin/flyers';
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      loadFlyers();
    }
  };

  const startEdit = (item: Flyer) => {
    setForm({
      title: item.title,
      imageUrl: item.imageUrl,
      description: item.description || '',
      linkUrl: item.linkUrl || '',
      ctaLabel: item.ctaLabel || '',
      isActive: item.isActive,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this flyer?')) return;
    await fetch(`/api/admin/flyers/${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Flyers</h1>
          <p className="text-gray-500 text-sm">
            Shown on homepage every Wednesday, Friday, and Sunday.
          </p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-primary text-sm font-semibold"
        >
          <Plus size={18} /> Add Flyer
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
          <h2 className="font-semibold">{editingId ? 'Edit' : 'New'} Flyer</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
          <ImageUploadField
            label="Flyer Image"
            value={form.imageUrl}
            onChange={(imageUrl) => setForm({ ...form, imageUrl })}
            required
          />
          <div>
            <label className="block text-sm font-medium mb-1">Description (optional)</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              placeholder="Short message shown below the flyer image"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CTA Link URL (optional)</label>
            <input value={form.linkUrl} onChange={(e) => setForm({ ...form, linkUrl: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CTA Button Label (optional)</label>
            <input value={form.ctaLabel} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Learn More" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
            Active (visible on flyer days)
          </label>
          <div className="flex gap-3">
            <button type="submit" className="px-5 py-2 rounded-lg btn-primary text-sm font-semibold">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 rounded-lg border text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Status</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(item)} className="p-1.5 text-gray-500 hover:text-blue-600"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-400">No flyers yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
