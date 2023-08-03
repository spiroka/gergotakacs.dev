module.exports = async function () {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.YT_CHANNEL_ID}&type=video&key=${process.env.GOOGLE_API_KEY}`,
  );
  const { items } = await response.json();

  return items;
};
