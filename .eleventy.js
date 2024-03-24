const processCss = require('./scripts/processCss');
const pluginWebc = require('@11ty/eleventy-plugin-webc');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItFootnote = require('markdown-it-footnote');
const pluginTOC = require('eleventy-plugin-toc');
const { eleventyImagePlugin } = require('@11ty/eleventy-img');
const fetchVideos = require('./scripts/fetchVideos');
const { readdir, readFile } = require('fs/promises');
const { join } = require('path');
const ogs = require('open-graph-scraper-lite');

require('dotenv').config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/_includes/javascript': '/' });
  eleventyConfig.addPassthroughCopy({ 'demos/build': '/demos' });
  eleventyConfig.setTemplateFormats(['md', 'jpeg', 'jpg', 'html', 'png']);
  eleventyConfig.addCollection('demos', async function () {
    const demoDirs = (await readdir('demos/build', { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory())
      .map(({ name }) => name);

    return Promise.all(demoDirs.map(async (name) => {
      const contents = await readFile(join('demos/build', name, 'index.html'));
      const { result: { ogTitle, ogDescription, articleTag } } = await ogs({ html: contents.toString() });

      return {
        title: ogTitle,
        description: ogDescription,
        name,
        url: `/demos/${name}`,
        tags: articleTag.split(';')
      };
    }));
  });
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
    components: [
      'src/_components/**/*.webc',
      "npm:@11ty/eleventy-img/*.webc"
    ],
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
  eleventyConfig.addPlugin(eleventyImagePlugin, {
    urlPath: '/img/',
    formats: ['webp', 'jpeg', 'png']
  });

  return {
    dir: {
      input: 'src',
    },
  };
};
