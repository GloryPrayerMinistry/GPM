'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';

interface Devotional {
  id: string;
  date: string;
  dailyFocusImage: string;
  dailyFocus: string;
  dailyDeclaration: string;
  verseText: string;
  verseReference: string;
}

const emptyForm = {
  date: new Date().toISOString().split('T')[0],
  dailyFocusImage: '',
  dailyFocus: '',
  dailyDeclaration: '',
  verseText: '',
  verseReference: '',
};

export default function AdminDailyDevotionalsPage() {
  const [items, setItems] = useState<Devotional[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    void fetch('/api/admin/daily-devotionals')
      .then((res) => (res.ok ? res.json() : []))
      .then(setItems);
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    if (res.ok) {
      const { url } = await res.json();
      setForm((f) => ({ ...f, dailyFocusImage: url }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId
      ? `/api/admin/daily-devotionals/${editingId}`
      : '/api/admin/daily-devotionals';
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
      void fetch('/api/admin/daily-devotionals')
        .then((res) => (res.ok ? res.json() : []))
        .then(setItems);
    } else {
      const data = await res.json();
      alert(data.error || 'Save failed');
    }
  };

  const startEdit = (item: Devotional) => {
    setForm({
      date: item.date,
      dailyFocusImage: item.dailyFocusImage,
      dailyFocus: item.dailyFocus,
      dailyDeclaration: item.dailyDeclaration,
      verseText: item.verseText,
      verseReference: item.verseReference,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this devotional?')) return;
    await fetch(`/api/admin/daily-devotionals/${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Devotionals</h1>
          <p className="text-gray-500 text-sm">Manage daily devotional content and focus images.</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-primary text-sm font-semibold"
        >
          <Plus size={18} /> Add Entry
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 mb-8 space-y-4">
          <h2 className="font-semibold text-gray-900">{editingId ? 'Edit' : 'New'} Devotional</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Daily Focus</label>
              <input required value={form.dailyFocus} onChange={(e) => setForm({ ...form, dailyFocus: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Focus Image</label>
            <div className="flex gap-3 items-center">
              <input required value={form.dailyFocusImage} onChange={(e) => setForm({ ...form, dailyFocusImage: e.target.value })} placeholder="/uploads/image.jpg" className="flex-1 px-3 py-2 border rounded-lg text-sm" />
              <label className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm cursor-pointer hover:bg-gray-50">
                <Upload size={16} /> {uploading ? '…' : 'Upload'}
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Declaration</label>
            <textarea required rows={3} value={form.dailyDeclaration} onChange={(e) => setForm({ ...form, dailyDeclaration: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verse Text</label>
            <textarea required rows={2} value={form.verseText} onChange={(e) => setForm({ ...form, verseText: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verse Reference</label>
            <input required value={form.verseReference} onChange={(e) => setForm({ ...form, verseReference: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-5 py-2 rounded-lg btn-primary text-sm font-semibold">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 rounded-lg border text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Focus</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Verse</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3 font-medium">{item.dailyFocus}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{item.verseReference}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(item)} className="p-1.5 text-gray-500 hover:text-blue-600"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No devotionals yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
