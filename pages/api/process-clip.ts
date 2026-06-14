import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  clips?: Array<{
    id: string;
    url: string;
    duration: number;
    timestamp: string;
  }>;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Mock clip generation - returns sample clips
    const mockClips = [
      {
        id: 'clip-1',
        url: 'https://via.placeholder.com/video1.mp4',
        duration: 15,
        timestamp: '00:00 - 00:15',
      },
      {
        id: 'clip-2',
        url: 'https://via.placeholder.com/video2.mp4',
        duration: 12,
        timestamp: '00:30 - 00:42',
      },
      {
        id: 'clip-3',
        url: 'https://via.placeholder.com/video3.mp4',
        duration: 18,
        timestamp: '01:15 - 01:33',
      },
    ];

    res.status(200).json({
      clips: mockClips,
    });
  } catch (error) {
    console.error('Video processing error:', error);
    res.status(500).json({ error: 'Failed to process video' });
  }
}