---
tags:
  - blog
timestamp: 2024-11-14
title: What do I use AI for?
layout: layouts/post.webc
permalink: /blog/what-do-i-use-ai-for/
draft: false
---
*[AGI]: Artificial General Intelligence
*[RTFM]: Read The Fucking Manual

For better or worse generative AI is a part of our lives now. As a tool it can be [entertaining](https://kotaku.com/twitch-streamer-ai-jesus-fortnite-star-wars-chatgpt-1850533473) but useless, very handy, or even downright [scary](https://arstechnica.com/information-technology/2024/02/deepfake-scammer-walks-off-with-25-million-in-first-of-its-kind-ai-heist/). People's opinion on it is just as varied. Doomers think the current generation of AI is the harbinger of a more powerful AGI that will bring the [end of civilization](https://futureoflife.org/open-letter/pause-giant-ai-experiments/). On the other end of the spectrum there are people who think it's the best thing since sliced bread. For companies it is a money printing machine. Everyone is trying to replicate OpenAI's success. This is how you end up with [AI in your mouse software](https://daringfireball.net/linked/2024/05/06/hackett-logitech-mouse-driver).

I'm – and I assume most people are – somewhere in the middle. I find most of the criticism against generative AI to be genuinely concerning, I don't think we should be pouring as much money into it as we are now. However I don't see it as the destroyer of worlds, neither do I think it will drastically change how I work. It's just another tool in my toolbox.

## The bad

Generative AI in its current form is far from being ethical or environmentally friendly. As is often the case with technological advancements, regulators are playing catch-up. It is used by malicious actors to spread misinformation, it is being [trained on content it was told to ignore](https://www.wired.com/story/perplexity-is-a-bullshit-machine/), it requires a [shit-ton of electricity](https://www.washingtonpost.com/business/2024/10/08/google-meta-omaha-data-centers/) to train and run... I could go on for paragraphs. Does this mean I completely avoid using these tools? No, just as I still use a car and travel by plane, even though I'm aware of their impact on our planet. However I try to be considerate – even conservative – in my usage of AI.
## The good

Now to answer the question in the title, I will go over some use cases where I've found AI (more specifically LLMs) to be genuinely helpful.

One such area is search. Traditional search engines can be pretty good at knowing what you are looking for, even if you are not searching for the right words. However if you are looking for something that you can't easily express in a couple of keywords, finding the exact thing you need can seem impossible. A piece of relevant context, if it does not appear in the page you are looking for, can completely derail your keyword search, but can be just what ChatGPT needs to point you in the right direction.

Considering how shitty Google search results have become, I can't wait for more AI based search engines to emerge^[Since I've started writing this article OpenAI has released [ChatGPT Search](https://openai.com/index/introducing-chatgpt-search/), which – as a non-premium user – I have not had a chance to try yet.]. 

As a non-english speaker I also reach for an LLM when I'm struggling to make a sentence sound professional. This is an area where I really want to avoid overusing it. I only use it as a last resort, and only for rephrasing no more than a single sentence. It should improve my vocabulary, not make me lazy^[I don't use it for blog posts though. On this site you will only find 100% handcrafted, artisan, freerange sentences.].

It is also really good at reading documentation, so you don't have to RTFM. I work a lot with a datagrid library called [AG Grid](https://ag-grid.com). It has a crazy number of configuration options, so sometimes it can be a pain to figure out which ones I need to “make it work like Excel”. Often the easiest way is to just describe to ChatGPT what I need and let it figure it out for me. For a popular library like AG Grid it works pretty well. Some companies even provide an LLM-backed chat interface right in their documentation. This lets them train the model on their docs to provide even better answers^[[https://houston.astro.build/](https://houston.astro.build/)].

When it comes to writing code, I don't rely on AI tools too much. My typing speed is not what prevents me from shipping features faster, so tools like [GitHub Copilot](https://github.com/features/copilot) – although impressive – don't provide too much value to me. The times when I reach for ChatGPT are when I'm working on repetitive, but hard to automate tasks, typically refactoring.

***

As these tools mature I can see myself incorporating them into my workflow in more ways. More and more tools are popping up where AI is not just an optional feature but the whole premise. Tools like Vercel's [v0](https://v0.dev/) or StackBlitz's [bolt.new](https://bolt.new/) are already empowering people to quickly prototype their ideas even if they lack the technical expertise to develop something from scratch. I'm certain our IDE of the future will look a lot like these tools. As to what this means for the quality of our software? Well...