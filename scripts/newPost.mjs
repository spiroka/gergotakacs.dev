#!/usr/bin/env zx

import 'zx/globals';

const todayStr = new Date().toISOString();
const title = await question('Title: ');
let contents = (await fs.readFile(path.resolve(__dirname, '../templates/post.md'))).toString();

contents = contents
  .replace('${date}', todayStr.split('T')[0])
  .replace('${title}', title);


await fs.mkdir(path.resolve(__dirname, `../src/posts/${todayStr}`));
await fs.writeFile(path.resolve(__dirname, `../src/posts/${todayStr}/index.md`), contents);
