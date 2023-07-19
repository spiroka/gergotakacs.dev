const { bundle, browserslistToTargets } = require('lightningcss');
const browserslist = require('browserslist');

let targets = browserslistToTargets(browserslist('>= 0.25%'));

module.exports = function(content) {
  return bundle({
    filename: 'src/_includes/styles/style.css',
    code: content,
    minify: true,
    targets
  }).code.toString();
};
