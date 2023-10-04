const processCss = require('./scripts/processCss');
const pluginWebc = require('@11ty/eleventy-plugin-webc');
const fetchVideos = require('./scripts/fetchVideos');
require('dotenv').config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/_includes/javascript': '/' });
  eleventyConfig.addCollection('feed', async function (collectionApi) {
    const posts = collectionApi.getFilteredByTag('post');
    const videos = await fetchVideos();

    const postFeed = posts.map(({ data: { title, timestamp } }) => ({
      title,
      timestamp
    }));
    const videoFeed = videos.map(({ id, snippet }) => ({
      title: snippet.title,
      url: `https://youtube.com/watch?v=${id.videoId}`,
      image: snippet.thumbnails.medium.url,
      timestamp: snippet.publishedAt.split('T')[0],
      isExternal: true
    }));

    return [...postFeed, ...videoFeed];
  });
  eleventyConfig.addPlugin(pluginWebc, {
    components: 'src/_components/**/*.webc',
    bundlePluginOptions: {
      transforms: [
        function (content) {
          if (this.type === 'css') {
            return processCss(content);
          }

          return content;
        }
      ]
    }
  });

  return {
    dir: {
      input: 'src',
    },
  };
};
