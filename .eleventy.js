import pluginWebc from '@11ty/eleventy-plugin-webc';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import markdownIt from 'markdown-it';
import pluginTOC from 'eleventy-plugin-toc';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItAbbrev from 'markdown-it-abbr';
import ogs from 'open-graph-scraper-lite';
import dotenv from 'dotenv';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

import processCss from './scripts/processCss.js';
import fetchVideos from './scripts/fetchVideos.js';

dotenv.config();

export default function (eleventyConfig) {
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

    const postFeed = posts.map(({ data: { title, timestamp, draft }, url }) => ({
      title,
      timestamp: new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium'
      }).format(new Date(timestamp)),
      url,
      tags: ['blog'],
      draft
    })).filter(({ draft }) => !draft || process.env.ELEVENTY_RUN_MODE === 'serve');

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
      .use(markdownItAbbrev)
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

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    urlPath: '/img/',
    formats: ['webp', 'jpeg', 'png']
  });

  return {
    dir: {
      input: 'src',
    },
  };
};
