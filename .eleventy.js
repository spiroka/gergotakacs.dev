const processCss = require('./scripts/processCss');
const pluginWebc = require('@11ty/eleventy-plugin-webc');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/_includes/javascript': '/' });
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
