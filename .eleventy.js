const processCss = require('./scripts/processCss');
const pluginWebc = require('@11ty/eleventy-plugin-webc');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItFootnote = require('markdown-it-footnote');
const pluginTOC = require('eleventy-plugin-toc');
const fetchVideos = require('./scripts/fetchVideos');

require('dotenv').config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/_includes/javascript': '/' });
  eleventyConfig.setTemplateFormats(['md', 'jpeg', 'jpg', 'html', 'png']);
  eleventyConfig.addCollection('feed', async function (collectionApi) {
    const posts = collectionApi.getFilteredByTag('blog');
    const videos = await fetchVideos();

    const postFeed = posts.map(({ data: { title, timestamp }, url }) => ({
      title,
      timestamp: new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium'
      }).format(new Date(timestamp)),
      url,
      tags: ['blog']
    }));
    const videoFeed = videos.map(({ id, snippet }) => ({
      title: snippet.title,
      url: `https://youtube.com/watch?v=${id.videoId}`,
      image: snippet.thumbnails.medium.url,
      timestamp: new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium'
      }).format(new Date(snippet.publishedAt)),
      isExternal: true,
      tags: ['video', 'HUN'],
    }));

    return [...postFeed, ...videoFeed].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  });
  eleventyConfig.setLibrary(
    'md',
    markdownIt()
      .use(markdownItAnchor)
      .use(markdownItFootnote)
  );

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
