---
tags: blog
timestamp: 2025-09-26T18:22:55.140Z
title: What can YOU do for a more accessible web?
layout: layouts/post.webc
permalink: /blog/what-can-you-do-for-a-more-accessible-web/
draft: false
---
In most of the teams I've worked in, accessibility was an afterthought. Early in my career it was my own ignorance, later I was actively discouraged by managers from spending time on it. I care about the work I do, and I feel like it is - at least partly - my responsibility to make sure the products I work on are accessible to everyone. I've found a few ways how I, a single developer, can spread awareness and start meaningful change in the teams I work in.

## Step zero

First things first, **educate yourself** on the topic. If you have opened this article, you probably already have this box ticked. If you feel like doing a brush-up on the topic, I've listed some great resources at the end of the article.

## Convincing stakeholders

Depending on what kind of product you are working on, getting management on board can be **either easy or impossible**. If your team is developing internal tools, your manager will be quick to point out, that they personally know all the users, and they all have 20/20 vision, three perfectly healthy hands, and ears like a bat. I'd still argue that these tools should be accessible, but you will have a hard time convincing your boss.

You will have better chances at success if you are working on something public. Corporations only speak the language of money, so you should try to make your case by letting your manager know **how much money the company could lose by neglecting accessibility**.

### They lose customers

Nearly a **quarter of people aged 16 years or over in the EU had a disability in 2024**.^[[https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Population_with_disability](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Population_with_disability)] If people cannot use your company's product, they will go to a competitor.

Creating accessible websites can also indirectly boost SEO. Writing well-structured, semantic HTML helps both users of assistive technologies and web crawlers access a site's contents. 

### They can face fines

If your company operates in the EU, its products might be **legally required to meet a certain level of [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) compliance.**^[[https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en](https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en)] Businesses failing to comply can face serious fines.

### Accessibility overlays

As a quick aside I want to mention accessibility overlays. Companies like AccessiBe or AudiEye advertise their products as a **quick and easy solution** to make a website accessible, and avoid fines. Just add a single third-party script and \*poof\*, your site is accessible. However, the truth is that these tools not only **fail to fulfill this promise**, in some cases they can even make it harder for disabled users to use your site.^[[https://www.vice.com/en/article/people-with-disabilities-say-this-ai-tool-is-making-the-web-worse-for-them/](https://www.vice.com/en/article/people-with-disabilities-say-this-ai-tool-is-making-the-web-worse-for-them/)] Their pitch does sound good, so I don't blame businesses for falling for it. It is your job to let your boss know what they risk by taking this shortcut. [Overlay Fact Sheet](https://overlayfactsheet.com/en/) is a great resource to help you convince them.

## Fostering an accessibility culture

Having everyone on board is a good start, but not enough. In my experience, most companies don't have a dedicated accessibility team, so **it is up to you - the developer - to make sure your team's work is accessible**.

Automate as much as you can. Most testing frameworks and linters have accessibility add-ons. Use them! Make them part of your CI process!

Manual testing is also important, so make sure it is not forgotten. Even a single checklist item in your issue or PR template can go a long way. As an example here is what my team uses:

> - [] I have reviewed the **accessibility** impact of my changes and tested new UI features following our accessibility evaluation guide, or confirmed that no UI changes were made.

Good intentions are not enough if you don't know what you are doing. Compile a list of resources and tools to help your team properly test their work. I've listed some of my recommendations at the end of this article.

Do you have some downtime between tickets? Load up a page and conduct an audit. Let your manager know the results, so they can plan how you are going to tackle the issues.

## Can AI help?

You cannot write an article in 2025 without mentioning AI. I've found **some use cases where generative AI shines**, however **accessibility is not one of them**. The reason for this is that LLM's are trained on the web, and let's be honest, the web is in large, inaccessible.^[[https://almanac.httparchive.org/en/2024/accessibility](https://almanac.httparchive.org/en/2024/accessibility)] Surely, they can be used to generate alt text, newer models are great at describing images. Well, not so much... Yes, good alt text should describe what's on a particular image. But it should also capture context and nuance. For example, take the following alt text I've generated using ChatGPT. Try to imagine what the original image would look like.

> “An older man with a white beard and a light-colored shirt is smiling and giving a thumbs up, sitting indoors in a bright room.”

Now, take a look at [the image](./harold.png). If you are unfamiliar with this person, he is known by the name [Hide the Pain Harold](https://knowyourmeme.com/memes/hide-the-pain-harold). 
He got popular because of his facial expression that seems to hide some discomfort behind a forced smile. In the LLM's description this nuance is completely lost.

## Conclusion

Even though recent legislation brings more attention to the topic, without proper education and advocates, accessibility will not be solved. Are my tips groundbreaking? Definitely not. With a little attention and some proactivity, even a single dev can do a lot for a more accessible internet.

## Further reading

- [MDN: What is accessibility?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/What_is_accessibility#so_what_is_accessibility)
- [Checklist - The A11Y Project](https://www.a11yproject.com/checklist/)
- [WebAIM - WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist)
- [How to meet WCAG?](https://www.w3.org/WAI/WCAG22/quickref/)
- [Accessible UI patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [How to perform an accessibility audit?](https://www.freecodecamp.org/news/how-to-perform-a-web-accessibility-audit/)
- [Fostering an accessibility culture](https://www.smashingmagazine.com/2025/04/fostering-accessibility-culture/)