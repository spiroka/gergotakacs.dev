import { bundle, browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

let targets = browserslistToTargets(browserslist('>= 0.25%'));

export default function processCss(content) {
  return bundle({
    filename: 'src/_includes/styles/style.css',
    code: content,
    minify: true,
    drafts: {
      nesting: true,
      customMedia: true
    },
    targets
  }).code.toString();
};
