'use client';

import { useState } from 'react';
import { Upload, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { resolveMediaUrl } from '@/app/lib/mediaUrl';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  placeholder = '/uploads/image.jpg or https://…',
  required = false,
  hint,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok) {
        setError(data.error || 'Upload failed. Please try again.');
        return;
      }

      if (!data.url) {
        setError('Upload succeeded but no image URL was returned.');
        return;
      }

      onChange(data.url);
      setSuccess('Image uploaded successfully.');
      window.setTimeout(() => setSuccess(null), 4000);
    } catch {
      setError('Network error. Check your connection and try again.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const clearImage = () => {
    onChange('');
    setError(null);
    setSuccess(null);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {hint && <p className="text-xs text-gray-500 mb-2">{hint}</p>}

      {value ? (
        <div className="mb-3 relative w-full max-w-sm aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveMediaUrl(value)}
            alt={`${label} preview`}
            className="w-full h-full object-cover"
            onError={() => setError('Preview could not load. Check the URL or upload again.')}
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-gray-600 hover:text-red-600 shadow border border-gray-200"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="mb-3 flex items-center justify-center w-full max-w-sm aspect-[4/3] rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400 text-sm">
          No image selected
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          required={required && !value}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setError(null);
          }}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border rounded-lg text-sm"
        />
        <label
          className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-medium cursor-pointer transition-colors ${
            uploading
              ? 'bg-gray-100 text-gray-400 cursor-wait'
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Uploading…
            </>
          ) : (
            <>
              <Upload size={16} /> Upload
            </>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            disabled={uploading}
            onChange={handleUpload}
          />
        </label>
      </div>

      {success && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-green-700">
          <CheckCircle2 size={16} />
          {success}
        </p>
      )}
      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle size={16} />
          {error}
        </p>
      )}
    </div>
  );
}
