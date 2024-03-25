---
tags: blog
timestamp: '2024-03-24T18:47:27.672Z'
title: 'Showcasing my demos'
layout: 'layouts/post.webc'
permalink: '/blog/showcasing-my-demos/'
---
I have a [repository for my demos and experiments](https://github.com/spiroka/demos) that I wanted to showcase on my website. I wanted to keep these separate from and agnostic of my site code. For this I needed a set of constraints that each demo follows, that are flexible enough to allow me to build them any way I want.

## First rule: each demo should be a static website

This is a static site, built with [11ty](https://11ty.dev) and hosted on a CDN. I wanted my demos to be a directory that I can just copy as-is to my 11ty build output. The demos repository is an npm workspaces project with a build script in the root project, that just calls the build script of each subproject. The build step of each subproject can be anything, as long as the result is a directory in the root project's build folder with **at least an `index.html`** in it.

Since all these projects are and will be web-related, this rule was easy to follow.

## Second rule: each demo should be able to describe itself

I needed some metadata about each demo to be able to display them in a collection. For this I chose the [Open Graph protocol](https://ogp.me/). **Open Graph tags** are easy to parse and 11ty agnostic so they fit the bill perfectly. For scraping the metadata from the html content of each demo, I chose the [open-graph-scraper-lite](https://github.com/jshemas/openGraphScraperLite) npm package.

## Bringing it all together

Now all I needed was to make each demo reachable as a page on my site and to have them available as an [11ty collection](https://www.11ty.dev/docs/collections/), so I can render them into a list.

For the prior all I needed was a simple [passthrough copy](https://www.11ty.dev/docs/copy/) to copy the demos folder to the build output.

```js
eleventyConfig.addPassthroughCopy({ 'demos/build': '/demos' });
```

To create a collection I needed to read all directories in the demos folder, scrape the Open Graph tags and add each item to the `demos` collection.

```js
const ogs = require('open-graph-scraper-lite');

eleventyConfig.addCollection('demos', async function () {
    // read all directories
    const demoDirs = (await fs.readdir('demos/build', { withFileTypes: true }))
      .filter(dirent => dirent.isDirectory())
      .map(({ name }) => name);

    return Promise.all(demoDirs.map(async (name) => {
      // get html content
      const contents = await fs.readFile(
        path.join('demos/build', name, 'index.html')
      );
      // scrape OG tags
      const { 
        result: { ogTitle, ogDescription, articleTag }
      } = await ogs({ html: contents.toString() });

      return {
        title: ogTitle,
        description: ogDescription,
        name,
        url: `/demos/${name}`,
        tags: articleTag.split(';')
      };
    }));
  });
```

The last step was to create a page for showcasing the demos. Behold [the shed](/the-shed).