import { useState } from 'react';

interface Clip {
  id: string;
  url: string;
  duration: number;
  timestamp: string;
}

interface ShareButtonProps {
  clip: Clip;
}

export default function ShareButton({ clip }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!navigator.share) {
      alert('Sharing not supported on this device');
      return;
    }

    setIsSharing(true);
    try {
      await navigator.share({
        title: 'SNAFU Clip',
        text: 'Check out this hilarious SNAFU clip!',
        url: clip.url,
      });
    } catch (error) {
      console.error('Share error:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
    >
      <span>📤</span>
      <span>{isSharing ? 'Sharing...' : 'Share Clip'}</span>
    </button>
  );
}