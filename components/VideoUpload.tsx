import { useRef } from 'react';

interface VideoUploadProps {
  onUpload: (file: File) => void;
}

export default function VideoUpload({ onUpload }: VideoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onUpload(files[0]);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center cursor-pointer hover:border-pink-300 hover:bg-white hover:bg-opacity-5 transition"
    >
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <div className="text-4xl mb-3">📽️</div>
      <p className="text-white font-semibold mb-1">Drag & drop your video</p>
      <p className="text-sm text-purple-200 mb-4">or click to browse</p>
      <button
        onClick={() => inputRef.current?.click()}
        className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
      >
        Select Video
      </button>
    </div>
  );
}