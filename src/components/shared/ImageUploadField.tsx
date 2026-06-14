import { useState, useRef, useCallback } from 'react';
import { Upload, Link, X, CheckCircle, AlertCircle, ImageIcon } from 'lucide-react';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  /** Optional folder tag for organizing in Cloudinary */
  folder?: string;
  placeholder?: string;
}

function isCloudinaryConfigured(): boolean {
  return !!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME && !!import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
}

export default function ImageUploadField({
  value,
  onChange,
  label = 'Image',
  required = false,
  folder = 'uploads',
  placeholder = '/images/desserts/example.webp',
}: ImageUploadFieldProps) {
  const cloudinaryAvailable = isCloudinaryConfigured();
  const [mode, setMode] = useState<'upload' | 'url'>(cloudinaryAvailable ? 'upload' : 'url');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputClass = "w-full px-4 py-3 bg-[#0f3460] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-sm";
  const labelClass = "text-gray-300 text-xs font-medium tracking-wider mb-2 block";

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file (JPEG, PNG, WebP, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image must be smaller than 10MB');
      return;
    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setUploadError('Cloudinary is not configured. Check your .env file.');
      return;
    }

    setUploadError(null);
    setUploadSuccess(false);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    if (folder) {
      formData.append('folder', `dr-doudou-bakes/${folder}`);
    }

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          onChange(response.secure_url);
          setUploadSuccess(true);
          setUploadProgress(null);
          setTimeout(() => setUploadSuccess(false), 3000);
        } else {
          console.error('Upload error:', xhr.responseText);
          try {
            const err = JSON.parse(xhr.responseText);
            setUploadError(err.error?.message || 'Upload failed');
          } catch {
            setUploadError('Upload failed');
          }
          setUploadProgress(null);
        }
      };

      xhr.onerror = () => {
        setUploadError('Network error occurred during upload');
        setUploadProgress(null);
      };

      xhr.send(formData);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to initiate upload');
      setUploadProgress(null);
    }
  }, [folder, onChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  }, [uploadFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
    e.target.value = '';
  }, [uploadFile]);

  return (
    <div>
      <label className={labelClass}>{label} {required && '*'}</label>

      {/* Mode Tabs */}
      {cloudinaryAvailable && (
        <div className="flex gap-1 mb-3 bg-[#0f3460]/60 rounded-lg p-1 w-fit">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === 'upload'
                ? 'bg-amber-500/20 text-amber-400 shadow-sm'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Upload className="w-3 h-3" />
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === 'url'
                ? 'bg-amber-500/20 text-amber-400 shadow-sm'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Link className="w-3 h-3" />
            URL
          </button>
        </div>
      )}

      {/* Upload Mode */}
      {mode === 'upload' && cloudinaryAvailable && (
        <div>
          {/* Drop Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 p-6 text-center ${
              isDragging
                ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                : uploadProgress !== null
                  ? 'border-blue-500/40 bg-blue-500/5'
                  : 'border-white/10 bg-[#0f3460]/40 hover:border-amber-500/30 hover:bg-[#0f3460]/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {uploadProgress !== null ? (
              <div className="space-y-3">
                <div className="w-10 h-10 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-blue-400 animate-pulse" />
                </div>
                <p className="text-blue-400 text-sm font-medium">Uploading... {uploadProgress}%</p>
                <div className="w-full max-w-xs mx-auto bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center transition-colors ${
                  isDragging ? 'bg-amber-500/20' : 'bg-white/5'
                }`}>
                  <ImageIcon className={`w-5 h-5 transition-colors ${isDragging ? 'text-amber-400' : 'text-gray-500'}`} />
                </div>
                <p className={`text-sm font-medium transition-colors ${isDragging ? 'text-amber-400' : 'text-gray-400'}`}>
                  {isDragging ? 'Drop image here' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-gray-600 text-xs">JPEG, PNG, WebP • Max 10MB</p>
              </div>
            )}
          </div>

          {/* Upload Success */}
          {uploadSuccess && (
            <div className="flex items-center gap-2 mt-2 text-emerald-400 text-xs">
              <CheckCircle className="w-3.5 h-3.5" />
              Image uploaded successfully!
            </div>
          )}

          {/* Upload Error */}
          {uploadError && (
            <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {uploadError}
              <button
                type="button"
                onClick={() => setUploadError(null)}
                className="ml-auto text-gray-500 hover:text-gray-300"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* URL Mode */}
      {mode === 'url' && (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          className={inputClass}
          placeholder={placeholder}
          required={required && !value}
        />
      )}

      {/* Preview */}
      {value && (
        <div className="mt-3 flex items-start gap-3">
          <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-black/20">
            <img
              src={value}
              alt="preview"
              className="w-full h-full object-cover"
              onError={e => (e.currentTarget.style.display = 'none')}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-gray-500 text-xs mb-1">Current image</p>
            <p className="text-gray-400 text-xs truncate font-mono">{value}</p>
            <button
              type="button"
              onClick={() => onChange('')}
              className="flex items-center gap-1 mt-1.5 text-red-400/70 hover:text-red-400 text-xs transition-colors"
            >
              <X className="w-3 h-3" />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
