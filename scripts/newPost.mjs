#!/usr/bin/env zx

import 'zx/globals';
import slugify from '@sindresorhus/slugify';

const todayStr = new Date().toISOString();
const title = await question('Title: ');
const slug = slugify(title);
let contents = (await fs.readFile(path.resolve(__dirname, '../templates/post.md'))).toString();

contents = contents
  .replace('${date}', todayStr)
  .replace('${title}', title)
  .replace('${slug}', slug);

await fs.mkdir(path.resolve(__dirname, `../src/blog/${slug}`));
await fs.writeFile(path.resolve(__dirname, `../src/blog/${slug}/index.md`), contents);
