---
layout: pro
title: testpage
group: projects
tabify : h2
project :
  name : jekyllbootstrap.com
  tagline : "Jekyll Bootstrap is the quickest way to start and publish your Jekyll powered blog. It's 100% compatible with GitHub pages."
  source : http://github.com/plusjade/jekyll-bootstrap
  website : http://jekyllbootstrap.com
  tagGroups :
    -
      name : platforms
      tags : [{name : web, why : "Jekyll bootstrap runs in the web-browser with plans to add mobile browser support."}]
    -
      name : languages
      tags :
        -
          {name : ruby, why : "Jekyll is implemented in ruby and I am most proficient in ruby." }
        - 
          {name : HTML, why : "HTML is needed for the website."}
        -
          {name : CSS, why : "CSS is needed for the website."}
        - 
          {name : javascript, why : "Since GitHub Pages does not run any custom ruby plugins I'm taking advantage of client-side programming to accomplish more advanced features."}
    -
      name : frameworks
      tags :
        -
          {name : jquery, why : "jQuery is the defacto way to interact easily with the DOM."}
        - 
          {name : twitter-bootstrap, why : "I chose twitter bootstrap as a way to standardize and speed up design iteration."}
        -
          {name : jekyll, why : "Jekyll was chosen because the static-blog movement really aligns with putting 'publishing' ahead of everything. No server infrastructure or database requirements means the fastest path to publishing." }
    -    
      name : infrastructure
      tags : [{name : github-pages, why : "Deploying to GitHub pages is beautiful in terms of speed and workflow. As a git/github user deploying cannot possibly be faster."}]
    -
      name : templating
      tags : 
        - 
          {name : "liquid", why : "To keep compatibility with GitHub Pages I needed to make extensive use of Liquid. All helpers are essentially packaged liquid code made available to the user."}
        -
          {name : "mustache", why : "On the client side mustache is used to easily provide HTML templating to data-objects." }

---

## Overview

### Jekyll-Bootstrap Framework

The Jekyll-Bootstrap framework is the codebase that provides structure and helpers for a standard blog.
Users clone the framework and build their blog on top. The framework can be deployed to GitHub Pages out-of-the-box and provides:

- Base directory structure and files with sensible configurations
- Base themes + extensible theming interface
- Data and layout formatters/helpers 
- Workflow automation (via rake tasks)
- Client-side javascript plugin interface

### Jekyll-Bootstrap Documentation

Comprehensive documentation is provided separately at <http://jekyllbootstrap.com>

The project originally started _from_ the documentation. That is to say I had just intended
to write blog posts about how I customized my jekyll blog. After much writing and organizing I realized
it would be helpful to create a framework that outlined and adopted my strategies. This blog is running on Jekyll-Bootstrap!



## Motivation

### Main Purpose

I want to make it very easy for developers to blog about technical topics.
I envision a blogging platform that adopts the same philosophy as [Markdown](http://daringfireball.net/projects/markdown/syntax#philosophy) in that 
it encourages _writing_ above all else. 

As a developer I want to formulate ideas and lessons _without_ thinking about formatting HTML/CSS/Jasascript
or how to highlight code, make a photo-gallery, or table-of-contents. 


### Why I work on Jekyll-Bootstrap

1. Create a blogging platform that I will actually use.
2. Make a name for myself in the Open Source community.
3. Improve my communication and teaching skills.

After 4+ years of head-down GID programming I finally realize being a good programmer is only half the battle - The other half is being a good human.

In order to establish more human connections I set out to start blogging.
Jekyll seemed like the most likely platform I'd _actually use_, so like any good programmer I spent hours hacking the source,
bending the gem to my will and spawning masterful plugins har-har-har!

After patting myself on the back I realized none of my hacks would ever be of any use because they are fundamentally incompatible with 
the author's (GitHub) main objectives; static website hosting through GitHub Pages.

### Wasting Time?

Hacking a forked version of a project and bending it to your will is easy.
Working within the constraints of a widely adopted system is much harder ...and much more human.

Jekyll-Bootstrap is for you my beloved humans! &lt;3


## Lessons

### Software is about People

I don't want to get all teary-eyed here but learning that my work is and always will be
_for the people_ is something I've only recently truly understood. Code doesn't matter, tools don't matter,
that clever-plugin-that's-so-clever-nobody-can-use doesn't matter. Ultimately only people matter.
Jekyll-Bootstrap is arguably the most impactful project I've made. It's also the one that contains the least amount of code.

### Teaching is Ridiculously Hard

Communication skills are necessary for all parts of life. Any person with skills will inevitably be called upon
to impart said skills and knowledge onto other people. This is a very fulfilling but also very hard responsibility.

### Share Everything

I finally understand why people love the freemium model. It just feels so good to 
give things away! I won't claim I know anything about business just yet so don't quote me on that.

The thing I learned with Jekyll-Bootstrap is how much better it is to solve a problem
that has an existing user-base. It was so trivial for me to add my link to the Jekyll documentation and _instantly_ start gaining traction.
Of course you can't spam your way into a market. Jekyll-Bootstrap took many days to build and addresses a genuine pain point.

If only I could go around solving pain points all day and give them away for free ... hmmm!

