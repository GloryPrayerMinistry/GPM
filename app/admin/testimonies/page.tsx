'use client';

import { useState, useEffect } from 'react';
import { Check, X, Trash2 } from 'lucide-react';

interface Testimony {
  id: string;
  title: string;
  content: string;
  authorName: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

const statusColors = {
  PENDING: 'bg-orange-100 text-orange-700',
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
};

export default function AdminTestimoniesPage() {
  const [items, setItems] = useState<Testimony[]>([]);
  const [filter, setFilter] = useState<string>('ALL');

  useEffect(() => {
    void fetch('/api/admin/testimonies')
      .then((res) => (res.ok ? res.json() : []))
      .then(setItems);
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/testimonies/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: status as Testimony['status'] } : t))
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimony?')) return;
    await fetch(`/api/admin/testimonies/${id}`, { method: 'DELETE' });
    setItems((prev) => prev.filter((t) => t.id !== id));
  };

  const filtered =
    filter === 'ALL' ? items : items.filter((t) => t.status === filter);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonies</h1>
          <p className="text-gray-500 text-sm">Review and moderate user submissions.</p>
        </div>
        <div className="flex gap-2">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                filter === s ? 'bg-navy text-cream' : 'bg-white border text-gray-600'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                {item.authorName && (
                  <p className="text-gray-500 text-sm">— {item.authorName}</p>
                )}
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                {item.status}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.content}</p>
            <div className="flex gap-2">
              {item.status !== 'APPROVED' && (
                <button
                  onClick={() => updateStatus(item.id, 'APPROVED')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100"
                >
                  <Check size={14} /> Approve
                </button>
              )}
              {item.status !== 'REJECTED' && (
                <button
                  onClick={() => updateStatus(item.id, 'REJECTED')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium hover:bg-red-100"
                >
                  <X size={14} /> Reject
                </button>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-xs font-medium hover:bg-gray-100 ml-auto"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">No testimonies found.</p>
        )}
      </div>
    </div>
  );
}
