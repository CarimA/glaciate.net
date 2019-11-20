---
title: Spring Cleaning
author: Carim A
date: 20 Sep 2018
slug: weekly-roundup-spring-cleaning
spoiler: Woah, a lot of changes for a site that barely sees use anyway.
---

**gamedev**: uhh I said I'd make a post about my current project, that is still coming, I just got a bit sidetracked in doing my, uh, spring cleaning over here.

**glaciate**: this one is gonna need a bit more...

 Last post I mentioned doing a few changes...well, I've gone considerably overboard since then. Think of this as a detailed changelog.

 - Removed the font for the logo and am now only using one font. Loading an extra font just for one use seemed like a waste.
 - Increased font size and line height. Posts are especially more readable on mobile.
 - Changed the background to pure white for increased contrast.
 - Reduced the size of post image sails. It was rather unnecessary before.
 - Moved the author note from below a post to above and removed the description. It didn't have anything of value anyway, and it just flows better.
 - Posts now have buttons to go to the next/previous post.
 - Changed the layout of how posts display on the listings page.
 - Reduced the amount of text used in post previews, which let me...
 - ...increase the number of blog posts per page from 4 to 7.
 - Ran all images under Kraken.io, which trimmed off about 40% of the total filesize.
 - Implemented image thumbnails; further reducing the filesize of many posts. These are generated dynamically and cached, so far Heroku's 512MB of memory hasn't collapsed from it. Continuing to monitor this one!
 - Changed the favicon.
 - Removed the navigation elements. The about and projects pages still exist (for now), but I wanted to remove clutter while I figure out what to do with it.
 - Removed font awesome icons. 
 - Disabled the footer.
 - Fixed an issue that caused horizontal scrolling on a post on mobile.
 - Remove a script that pings Twitch to check if I'm streaming and display a notification if so.
 - Completely tidied up all of the LESS/CSS. Removed all dead code, !important statements and did a bit of refactoring. I also swapped out express-less for less-middleware, which has the bonus of minifying CSS output.
 - Removed InstantClick. A page has gone from on average 1.2MB to 400KB. It's not really needed anymore.

One of the big goals with these changes was to reduce the filesize of the site to reduce bandwidth. So far, I've got the first page of the blog to roughly 340KB and the overall site to be about 452KB cached!
  
I still have a few changes to make, namely:

 - Converting all images to JPEGs.
 - Redoing the archive page to look better.
 - Adding tags and recent posts to the footer (note that it's currently gone).
 - More possible style changes?
