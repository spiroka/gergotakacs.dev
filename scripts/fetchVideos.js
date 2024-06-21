import EleventyFetch from '@11ty/eleventy-fetch';

export default async function fetchVideos() {
  const { items } = await EleventyFetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.YT_CHANNEL_ID}&type=video&key=${process.env.GOOGLE_API_KEY}`,
    { duration: '1d', type: 'json' }
  );

  return items || [];
};
