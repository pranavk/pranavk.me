---
layout: page
title: PingMyGeek
tagline: Ping the sleeping geek in you...
---
{% include JB/setup %}

# What you can find here ?
---
This is a informative/technology/computer oriented blog and I will be writing so many blog entries in the near future to make you aware of the latest technology. Infact I love to share knowledge in words.

I am no perfectionist in this regard, nor I think that I am some special personality in this tech field. I just want to share my knowledge with you all people. I will also be making the discussion platform available here on the website so that you can easily discuss and point out my mistakes if there is any. However I will fully try to minimize that at any cost. 

At the same time I would be happy if you would like to give some feedback on this blog. You can contact me on my email ID : **pranav913@gmail.com**
   
<br />
<br />

# Recent posts
---
<!--- ALTERNATIVE TO SHOW POSTS
{% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span>  : <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
-->

{% assign posts = site.posts %}
{% assign listing_limit = 3 %}
{% include post-listing.html %}


