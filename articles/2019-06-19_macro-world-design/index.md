---
title: PhotoVs - Macro World Design
author: Carim A
date: 19 Jun 2019
slug: photovs-macro-world-design
spoiler: In which I finally actually introduce this game and even talk a bit about my design decisions.
---

*(Note to self: come back to this and put on some pictures, stop being lazy!)*

## What is PhotoVs?
*(Skip ahead to the “Planning a World - Workload” section if you’re not interested in exposition)*

**PhotoVs is a monster collecting strategy RPG.** In it, players can find and collect 89 (planned) monsters named Photons. The Photons are captured using specially made cameras. The game takes place in a small hub-city with ancillary locations and dungeons.

## Why make PhotoVs?
I’ve been into hobby gamedev for quite a while now. I’ve “released” a few things (in that they were functionally complete and out there, but didn’t see the maintenance they needed to continue), holed away numerous proof-of-concepts and a few small games to myself and have countless failed projects. I think it’s about time that I actually try to make something that is commercially viable, if only for the experience.

Choosing this project was simple: it blends my love of many series (such as Shin Megami Tensei, Pokemon, Persona, Yakuza (more on this), Xenoblade Chronicles and more) and fit in my list of games that I want to make and games that I want to have made.

There is another reason: Pokemon itself. The series has, quite frankly, been pretty terrible since X and Y, and with the current issues surrounding Sword and Shield, I don’t see it improving anytime soon. What I really want is another Black and White. I decided to try my hand at it. If I could make something even 10% as captivating as Black and White, I’d be happy.

**This is obviously no small task, and I wanted to try to set myself up for the best chance of success**, so I’ve been keeping things as small in scope as reasonably possible (try to hold the laughter when you read further on, it was a delicate process of elimination). Part of the reason why it’s taken me so long to even write this post since initially mentioning PhotoVs is because I’ve been revisiting my requirements on a somewhat frequent basis, gradually chipping away so that my workload becomes more manageable, bit by bit.

## Planning a World - Workload
**The first thing I want to cover is design** (no implementation writeups yet, sorry 😣). While I did think a lot about the battle system and went to the effort of prototyping it with cute little squares, I didn’t really think too much about what kind of world I wanted. I just assumed I’d make something similar to a Pokemon region, and it became pretty clear that doing that would kill my project fast.

One thing to keep in mind: **I’ve been designing the gameplay first and fitting the story around what I want to do.** Doesn’t make total sense, but that’s mainly because I’m trying to defer actually writing anything as far as I can. 

![](https://i.imgur.com/nG8APEm.png)

I started with your typical Pokemon flow: a couple of towns and cities, some routes, 8 gyms in total and a league. That’s way too big. I’d need to make all of the tilesets, make all of the maps, populate them with NPCs, populate them with comprehensive scripts, etc.

So I downscaled to 6 gyms with a few towns/cities/routes. Then 4 gyms. Then 3. Then 2. It became pretty clear that no matter how small I scaled the content, the workload was unreasonably large, but there would be a point where I’d be doing so much work for so little content.

**It’s pretty clear that just blindly replicating the formula of some really popular series isn’t going to work**, I needed to fundamentally rework it: how could I present a monster collecting game with the capacity to still allow exploration.

### So...What Can Change?

At this time, I was finishing up yet another playthrough of Yakuza Zero, and it became pretty clear. Do a hub world! The Yakuza series takes place in a very small city district which is amazingly dense with content. Occasionally, you go to locations outside of this district for more focused gameplay segments.

Creating a single, small city with the ability to choose as much dungeons as I need is a pretty nice solution. So I started by making one based off of the local area. Using Google Maps, I composited together a reasonably small city district that I could iterate on.

Neat!

Except, for a little while, I kinda flew off and made a bad decision which has ultimately wasted some time: I decided to try and make the game 3D.

![](https://i.imgur.com/r3cxE1O.png)

At first, I thought about how I could actually achieve this with no 3D modelling skills and no assets to use. Normally, that'd be the end of that. Wouldn't that be easy? I kinda jumped too far ahead and went and implemented 3D utilising sprite stacking. I figured, I have a pretty good library of stacked sprites to use that I could extend, what's the big deal?

![](https://giant.gfycat.com/PowerfulThirstyIrishsetter.gif)

I even went and got ahead of myself working on some lighting...too bad I'll have to throw this out (for now)
![](https://i.imgur.com/GocyETC.png)

After the initial honeymoon period of getting things working, then it hit me: how exactly am I going to make a visually interesting world with this, what is my tooling like and can it facilitate this, *why are you being so difficult?*

### The True Solution Having Wasted About A Month

![](https://i.imgur.com/VxmG6BJ.png)

*From left to right: Shin Megami Tensei 4, Ace Attorney 3, Professor Layton 3*

My final solution came to me while playing Shin Megami Tensei 4 and Professor Layton 3: don't even bother with an overworld. Or at least, don't bother with one in a typical RPG fashion. Instead, have a series of static, pretty looking backgrounds that you'd find in the likes of visual novels and interconnect the world via UI options. This simplifies my world graphics workflow to drawing backgrounds, tilesets for limited scenarios and UI elements. Scripting also becomes considerably easier with less "moving parts", so to speak.

So now, we have some sense of direction in how to design the rest. Great!

*[(By the way, I have a Discord server for PhotoVs! I actually post images here!)](https://discord.gg/ew2X8Sy)*
