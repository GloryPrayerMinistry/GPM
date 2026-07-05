'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import ImageUploadField from '@/app/components/admin/ImageUploadField';

interface Devotional {
  id: string;
  date: string;
  dailyFocusImage: string;
  dailyFocus: string;
  dailyDeclarationImage: string;
  verseText: string;
  verseReference: string;
}

const emptyForm = {
  date: new Date().toISOString().split('T')[0],
  dailyFocusImage: '',
  dailyFocus: '',
  dailyDeclarationImage: '',
  verseText: '',
  verseReference: '',
};

export default function AdminDailyDevotionalsPage() {
  const [items, setItems] = useState<Devotional[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadItems = () => {
    setLoadError(null);
    void fetch('/api/admin/daily-devotionals', { credentials: 'include' })
      .then(async (res) => {
        if (res.status === 401) {
          setLoadError('Session expired. Please sign in again.');
          return [];
        }
        if (!res.ok) {
          setLoadError('Could not load devotionals.');
          return [];
        }
        return res.json() as Promise<Devotional[]>;
      })
      .then(setItems);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);

    if (!form.dailyFocusImage.trim()) {
      setSaveError('Please upload or enter a Daily Focus image before saving.');
      return;
    }
    if (!form.dailyDeclarationImage.trim()) {
      setSaveError('Please upload or enter a Daily Declaration image before saving.');
      return;
    }

    setSaving(true);
    const url = editingId
      ? `/api/admin/daily-devotionals/${editingId}`
      : '/api/admin/daily-devotionals';
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

  const startEdit = (item: Devotional) => {
    setForm({
      date: item.date,
      dailyFocusImage: item.dailyFocusImage,
      dailyFocus: item.dailyFocus,
      dailyDeclarationImage: item.dailyDeclarationImage,
      verseText: item.verseText,
      verseReference: item.verseReference,
    });
    setEditingId(item.id);
    setSaveError(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this devotional?')) return;
    await fetch(`/api/admin/daily-devotionals/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Devotionals</h1>
          <p className="text-gray-500 text-sm">
            Each entry has a Daily Focus image, a Daily Declaration image, and a verse.
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
          <Plus size={18} /> Add Entry
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
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 p-6 mb-8 space-y-4"
        >
          <h2 className="font-semibold text-gray-900">
            {editingId ? 'Edit' : 'New'} Devotional
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Daily Focus (title)
              </label>
              <input
                required
                value={form.dailyFocus}
                onChange={(e) => setForm({ ...form, dailyFocus: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="e.g. Faith, Hope, Love"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ImageUploadField
              label="Daily Focus Image"
              value={form.dailyFocusImage}
              onChange={(dailyFocusImage) => setForm({ ...form, dailyFocusImage })}
              required
              hint="Featured alongside the focus title on the homepage."
            />
            <ImageUploadField
              label="Daily Declaration Image"
              value={form.dailyDeclarationImage}
              onChange={(dailyDeclarationImage) =>
                setForm({ ...form, dailyDeclarationImage })
              }
              required
              hint="Shown in the Daily Declaration section below the verse."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verse Text</label>
            <textarea
              required
              rows={3}
              value={form.verseText}
              onChange={(e) => setForm({ ...form, verseText: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              placeholder="Enter the full verse text…"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verse Reference
            </label>
            <input
              required
              value={form.verseReference}
              onChange={(e) => setForm({ ...form, verseReference: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              placeholder="Hebrews 11:1"
            />
          </div>

          {saveError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {saveError}
            </p>
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

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Focus</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">
                Verse
              </th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3 font-medium">{item.dailyFocus}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                  {item.verseReference}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => startEdit(item)}
                    className="p-1.5 text-gray-500 hover:text-blue-600"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && !loadError && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                  No devotionals yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
