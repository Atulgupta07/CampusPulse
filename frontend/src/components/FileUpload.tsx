import { useState } from "react";
import { filesApi } from "../api";
import { FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function FileUpload({ onUploadSuccess }: { onUploadSuccess?: (data: any) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setStatus('idle');
    try {
      const response = await filesApi.upload(file);
      setStatus('success');
      setMessage('File uploaded successfully!');
      if (onUploadSuccess) onUploadSuccess(response);
      setFile(null);
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 flex flex-col items-center justify-center bg-blue-50/50 hover:bg-blue-50 transition">
      <FaCloudUploadAlt className="text-4xl text-blue-500 mb-3" />
      <input 
        type="file" 
        id="file-upload" 
        className="hidden" 
        onChange={handleFileChange}
      />
      <label 
        htmlFor="file-upload" 
        className="cursor-pointer bg-white px-4 py-2 rounded-lg shadow text-blue-600 font-semibold mb-3 hover:shadow-md transition"
      >
        Choose File
      </label>
      
      {file && (
        <div className="text-sm text-gray-600 text-center mb-4">
          Selected: <span className="font-semibold text-gray-800">{file.name}</span>
          <br/>
          <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</span>
        </div>
      )}

      {file && (
        <button 
          onClick={handleUpload}
          disabled={uploading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {uploading ? <FaSpinner className="animate-spin" /> : null}
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      )}

      {status === 'success' && (
        <p className="mt-4 text-green-600 flex items-center gap-2">
          <FaCheckCircle /> {message}
        </p>
      )}

      {status === 'error' && (
        <p className="mt-4 text-red-600 flex items-center gap-2">
          <FaExclamationCircle /> {message}
        </p>
      )}
    </div>
  );
}
