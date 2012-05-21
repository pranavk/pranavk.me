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

## What you can find here ?
# What you can find here ?
---
This is a informative/technology/computer oriented blog and I will be writing so many blog entries in the near future to make you aware of the latest technology. Infact I love to share knowledge in words.

I am no perfectionist in this regard, nor I think that I am some special personality in this tech field. I just want to share my knowledge with you all people. I will also be making the discussion platform available here on the website so that you can easily discuss and point out my mistakes if there is any. However I will fully try to minimize that at any cost. 

At the same time I would be happy if you would like to give some feedback on this blog. You can contact me on my email ID : **pranav913@gmail.com**
   
This is a informative/technology/computer oriented blog and I will be writing so many blog entries in the near future to make you aware of the latest technology. Infact I love to share knowledge in words.

I am no perfectionist in this regard, nor I think that I am some special personality in this tech field. I just want to share my knowledge with you all people. I will also be making the discussion platform available here on the website so that you can easily discuss and point out my mistakes if there is any. However I will fully try to minimize that at any cost. 

At the same time I would be happy if you would like to give some feedback on this blog. You can contact me on my email ID : **pranav913@gmail.com**
   This is a informative/technology/computer oriented blog and I will be writing so many blog entries in the near future to make you aware of the latest technology. Infact I love to share knowledge in words.

I am no perfectionist in this regard, nor I think that I am some special personality in this tech field. I just want to share my knowledge with you all people. I will also be making the discussion platform available here on the website so that you can easily discuss and point out my mistakes if there is any. However I will fully try to minimize that at any cost. 

At the same time I would be happy if you would like to give some feedback on this blog. You can contact me on my email ID : **pranav913@gmail.com**
   
<br />
<br />

## Recent posts
<!--- ALTERNATIVE TO SHOW POSTS
{% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span>  : <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
-->

{% assign posts = site.posts %}
{% assign listing_limit = 3 %}
{% include post-listing.html %}
