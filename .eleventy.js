const processCss = require('./scripts/processCss');
const pluginWebc = require('@11ty/eleventy-plugin-webc');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const pluginTOC = require('eleventy-plugin-toc');
const fetchVideos = require('./scripts/fetchVideos');
require('dotenv').config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/_includes/javascript': '/' });
  eleventyConfig.addCollection('feed', async function (collectionApi) {
    const posts = collectionApi.getFilteredByTag('blog');
    const videos = await fetchVideos();

    const postFeed = posts.map(({ data: { title, timestamp }, url }) => ({
      title,
      timestamp,
      url,
      tags: ['blog']
    }));
    const videoFeed = videos.map(({ id, snippet }) => ({
      title: snippet.title,
      url: `https://youtube.com/watch?v=${id.videoId}`,
      image: snippet.thumbnails.medium.url,
      timestamp: snippet.publishedAt.split('T')[0],
      isExternal: true,
      tags: ['video']
    }));

    return [...postFeed, ...videoFeed].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  });
  eleventyConfig.setLibrary(
    'md',
    markdownIt().use(markdownItAnchor)
  )

  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginTOC);
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
