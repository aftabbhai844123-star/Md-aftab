import { useRef, useState } from 'react';
import ShareButton from './ShareButton';

interface Clip {
  id: string;
  url: string;
  duration: number;
  timestamp: string;
}

interface ClipPreviewProps {
  clip: Clip;
}

export default function ClipPreview({ clip }: ClipPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(clip.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `snafu-clip-${clip.id}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download clip');
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20">
      {/* Video Player */}
      <div className="relative bg-black rounded-xl overflow-hidden mb-6">
        <video
          ref={videoRef}
          src={clip.url}
          className="w-full h-auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls
        />
      </div>

      {/* Info */}
      <div className="mb-6 space-y-2">
        <h3 className="text-2xl font-bold text-white">📺 Clip Preview</h3>
        <p className="text-sm text-purple-100">Duration: {clip.duration} seconds</p>
        <p className="text-sm text-purple-100">Timestamp: {clip.timestamp}</p>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        <button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
        >
          <span>⬇️</span>
          <span>Download Clip</span>
        </button>

        <ShareButton clip={clip} />
      </div>

      {/* Tips */}
      <div className="mt-6 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-4">
        <p className="text-xs text-purple-200 mb-2">💡 Pro Tips:</p>
        <ul className="text-xs text-purple-300 space-y-1">
          <li>• Download clips to share on other platforms</li>
          <li>• Use Facebook share for direct posting</li>
          <li>• Clips are optimized for mobile</li>
        </ul>
      </div>
    </div>
  );
}