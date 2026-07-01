'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { toDateKey, toMonthKey, toYearKey } from '@/app/lib/dates';

interface BiblePlan {
  id: string;
  type: string;
  periodKey: string;
  title: string | null;
  imageUrl: string;
  description: string | null;
  isActive: boolean;
}

const TYPES = ['DAILY', 'MONTHLY', 'YEARLY'] as const;

function defaultPeriodKey(type: string) {
  if (type === 'MONTHLY') return toMonthKey();
  if (type === 'YEARLY') return toYearKey();
  return toDateKey();
}

const emptyForm = {
  type: 'DAILY' as string,
  periodKey: toDateKey(),
  title: '',
  imageUrl: '',
  description: '',
  isActive: true,
};

export default function AdminBiblePlansPage() {
  const [items, setItems] = useState<BiblePlan[]>([]);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const q = filterType === 'ALL' ? '' : `?type=${filterType}`;
    void fetch(`/api/admin/bible-plans${q}`)
      .then((res) => (res.ok ? res.json() : []))
      .then(setItems);
  }, [filterType]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    if (res.ok) {
      const { url } = await res.json();
      setForm((f) => ({ ...f, imageUrl: url }));
    }
    setUploading(false);
  };

  const handleTypeChange = (type: string) => {
    setForm((f) => ({ ...f, type, periodKey: defaultPeriodKey(type) }));
  };

  const periodInputType = (type: string) => {
    if (type === 'DAILY') return 'date';
    if (type === 'MONTHLY') return 'month';
    return 'number';
  };

  const periodInputValue = (type: string, key: string) => {
    if (type === 'YEARLY') return key;
    if (type === 'MONTHLY') return key;
    return key;
  };

  const handlePeriodChange = (type: string, value: string) => {
    if (type === 'YEARLY') {
      setForm((f) => ({ ...f, periodKey: value }));
    } else {
      setForm((f) => ({ ...f, periodKey: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/admin/bible-plans/${editingId}` : '/api/admin/bible-plans';
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
      const q = filterType === 'ALL' ? '' : `?type=${filterType}`;
      void fetch(`/api/admin/bible-plans${q}`)
        .then((r) => (r.ok ? r.json() : []))
        .then(setItems);
    } else {
      const data = await res.json();
      alert(data.error || 'Save failed');
    }
  };

  const startEdit = (item: BiblePlan) => {
    setForm({
      type: item.type,
      periodKey: item.periodKey,
      title: item.title || '',
      imageUrl: item.imageUrl,
      description: item.description || '',
      isActive: item.isActive,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this bible plan?')) return;
    await fetch(`/api/admin/bible-plans/${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bible Plans</h1>
          <p className="text-gray-500 text-sm">Manage daily, monthly, and yearly bible plans.</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-primary text-sm font-semibold"
        >
          <Plus size={18} /> Add Plan
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {['ALL', ...TYPES].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${filterType === t ? 'bg-navy text-cream' : 'bg-white border text-gray-600'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 mb-8 space-y-4">
          <h2 className="font-semibold">{editingId ? 'Edit' : 'New'} Bible Plan</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Period</label>
              {form.type === 'YEARLY' ? (
                <input
                  type="number"
                  required
                  min="2020"
                  max="2100"
                  value={form.periodKey}
                  onChange={(e) => handlePeriodChange(form.type, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              ) : (
                <input
                  type={periodInputType(form.type)}
                  required
                  value={periodInputValue(form.type, form.periodKey)}
                  onChange={(e) => handlePeriodChange(form.type, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              )}
              <p className="text-xs text-gray-400 mt-1">
                {form.type === 'DAILY' && 'Date (YYYY-MM-DD)'}
                {form.type === 'MONTHLY' && 'Month (YYYY-MM)'}
                {form.type === 'YEARLY' && 'Year (YYYY)'}
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title (optional)</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Plan Image</label>
            <div className="flex gap-3 items-center">
              <input required value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
              <label className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm cursor-pointer hover:bg-gray-50">
                <Upload size={16} /> {uploading ? '…' : 'Upload'}
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description (optional)</label>
            <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
            Active
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
              <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Period</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">Title</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">{item.type}</td>
                <td className="px-4 py-3 font-medium">{item.periodKey}</td>
                <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{item.title || '—'}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(item)} className="p-1.5 text-gray-500 hover:text-blue-600"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-500 hover:text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No bible plans yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
