---
title: The Making of Icy Blog
author: Carim A
date: 27 January 2017
slug: the-making-of-icy-blog
spoiler: "***Alternative Title:*** *Why Does PHP Still Exist (I promise, this isn't a PHP complaint article.)*"
---

Shortly before making *Icy Blog*, I took a good look at *Glaciate*. It was stagnant with little (if any) content and half of the systems that I had painstakingly wrote were broken during a web host transfer. I wasn't ever really happy about nothing happening. 

I thought hard about what I wanted it to be. Or rather, what I wanted to use to get it to be what I wanted it to be. **My requirements were simple**:

1. **It had to be something I could actually understand to make changes to.** This ruled out anything PHP-based, as frankly, I don't want to think of a single hilarity that goes on with that thing.
2. **It had to be something I could easily style.** As much as I love WordPress, too much trial-and-error goes on for my liking. This is more of a me issue than a WordPress issue.
3. **It had to be something I could easily publish to.** I don't like having account systems for things that only I can have access to. Many blog systems are more complex than my needs. I can easily make a new post by just creating a new text file, commiting it to git and pushing the change to heroku.

## My History With JavaScript
For the longest time, *I hated JavaScript*. I hated everything about writing it that I dreaded making websites: the hellish combo of having to use PHP on top of it was sure to take away any motivation I had for seeing a completed site. Or so I thought.

When I say I *"learned"* JavaScript, what I really mean is that I learned jQuery, then the Document Object Model, then JavaScript. It turned out what I really hated was jQuery and the DOM; what with how different browsers would behave extremely inconsistently and how something I wrote would break with little change and I didn't appreciate the weak typing of the language itself.

If I had to look back, I would say to reverse the order of how I *"learned"* the language. 

Maybe I would have reached this conclusion sooner.

## Enter NodeJS
For the unaware, [NodeJS](https://nodejs.org/en/) is an event-driven runtime environment for developing server-side JavaScript apps. Put simply, it's incredible. It's *easy* to set up an Express server where I can specify how I should route my traffic instead of exposing my entire filesystem. It's *easy* to set up a templating system that makes making coherent websites effortless. It's *easy* to set up a markdown parser when there are a bunch of helpful ready-to-use packages on npmjs. 

It's *easy* to actually get something great done, and in reasonable time.

**Perhaps the best change for me is that it's created an opportunity for me to just raze my old content to the ground**: I can start fresh and pay some small amount for the site to run on a [heroku](https://heroku.com/) dyno. It's time for the stagnation to end!

## Icy Blog
Now, I had no intention of reinventing the wheel (even though I've seemingly done exactly that), so my aim was to spend no more than 2 hours on programming. The very first thing I did was write out a sample blog post in the format I wanted to write it. Part of the solution was simple: use [Markdown](https://daringfireball.net/projects/markdown/).

I love Markdown! It's incredibly simple and I could just write in a text editor with no need for any additional buttons or features. Just the page and me. I also needed some place to put metadata associated with the blog post, and it had to be something I could add to at any time with no hassle. 

This was also simple: use JSON. JavaScript will parse it natively. This was nice and all, but I didn't know how to associate said metadata with the post itself...turns out I was overthinking it. Within the `/content/blogs/` directory, I simply save each text file like [this](http://pastebin.com/raw/tVfeB4Vm), and append it with `.md`. On start up, they will be parsed, sorted be creation order and that makes the blog!

With each push to heroku, the dyno restarts and the blog is rebuilt. Probably not the best of methods, but simple and effective enough to not need to involve a database.

Next came actually writing somthing to parse it, which was...also pretty simple. I used a packaged called [marked](https://www.npmjs.com/package/marked) which lets me fling a string of Markdown at it and it spits out compiled HTML. 

Finally, to actually serve it, [express](https://www.npmjs.com/package/express) made light work of it, complete with proper routing for pages and each individual blog post.

Not bad for 2 hours of work, huh? I think I spent more time tweaking the style than actually programming.

Later on *(read: when I feel compelled to)*, I'll add the remaining planned features (tagging, feeds, custom pages and authoring)!
