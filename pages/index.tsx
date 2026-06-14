import { useState } from 'react';
import VideoUpload from '@/components/VideoUpload';
import ClipPreview from '@/components/ClipPreview';

export default function Home() {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [clips, setClips] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedClip, setSelectedClip] = useState<any>(null);

  const handleVideoUpload = (file: File) => {
    setUploadedVideo(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setClips([]);
    setSelectedClip(null);
  };

  const generateClips = async () => {
    if (!uploadedVideo) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('video', uploadedVideo);

      const response = await fetch('/api/process-clip', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to process video');

      const data = await response.json();
      setClips(data.clips || []);
      
      if (data.clips && data.clips.length > 0) {
        setSelectedClip(data.clips[0]);
      }
    } catch (error) {
      console.error('Error generating clips:', error);
      alert('Failed to generate clips. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Header */}
      <div className="bg-black bg-opacity-50 backdrop-blur-md sticky top-0 z-50 border-b border-purple-400">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🎬</div>
            <div>
              <h1 className="text-2xl font-bold text-white">SNAFU Clip Maker</h1>
              <p className="text-sm text-purple-200">Create & share anime clips instantly</p>
            </div>
          </div>
          <div className="text-xs bg-purple-500 bg-opacity-50 px-3 py-1 rounded-full text-white">
            v1.0 • PWA
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Upload & Generate */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <span>📤</span>
                <span>Upload Video</span>
              </h2>
              <VideoUpload onUpload={handleVideoUpload} />
              {uploadedVideo && (
                <div className="mt-4 p-3 bg-green-400 bg-opacity-20 border border-green-400 rounded-lg">
                  <p className="text-sm text-green-100">✓ {uploadedVideo.name}</p>
                  <p className="text-xs text-green-200 mt-1">{(uploadedVideo.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
            </div>

            {/* Generate Button */}
            {uploadedVideo && (
              <button
                onClick={generateClips}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin">⚙️</div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>⚡</span>
                    <span>Generate Clips</span>
                  </>
                )}
              </button>
            )}

            {/* Clips List */}
            {clips.length > 0 && (
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
                  <span>📺</span>
                  <span>Generated Clips ({clips.length})</span>
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {clips.map((clip, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedClip(clip)}
                      className={`w-full p-3 rounded-lg transition text-left ${
                        selectedClip?.id === clip.id
                          ? 'bg-pink-500 text-white'
                          : 'bg-white bg-opacity-10 hover:bg-opacity-20 text-white'
                      }`}
                    >
                      <p className="font-semibold">Clip {idx + 1}</p>
                      <p className="text-xs opacity-75">{clip.duration}s • {clip.timestamp}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Preview & Download */}
          <div className="lg:col-span-2">
            {selectedClip ? (
              <ClipPreview clip={selectedClip} />
            ) : uploadedVideo ? (
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 flex flex-col items-center justify-center min-h-96 text-center">
                <div className="text-5xl mb-4">⬅️</div>
                <p className="text-xl text-white font-semibold mb-2">Ready to create clips?</p>
                <p className="text-purple-100">Click "Generate Clips" to start analyzing your video</p>
              </div>
            ) : (
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 border-dashed flex flex-col items-center justify-center min-h-96 text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-2xl text-white font-bold mb-2">Welcome to SNAFU Clip Maker!</p>
                <p className="text-purple-100 mb-6">Upload a video file to get started</p>
                <p className="text-sm text-purple-200">Supports: MP4, WebM, MOV, AVI</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-purple-100 text-sm">
          <p>🚀 Powered by Next.js • Capacitor | 📱 Install as app for best experience</p>
        </div>
      </div>
    </div>
  );
}