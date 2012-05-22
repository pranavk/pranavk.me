---
layout: page
title: PingMyGeek
tabify: h2
tagline: Ping the sleeping geek in you...
---
{% include JB/setup %}


# What you can find here ?
---
This is a informative/technology/computer oriented blog. Infact I love to share knowledge in words.

I am no perfectionist in this regard, nor I think that I am some special personality in this tech field. I just want to share my knowledge with you all people. There is comment section also included in the posts section so that you can easily discuss the subject and point out my mistakes if there is any. However I will fully try to minimize that at any cost. 

At the same time I would be happy if you would like to give some feedback on this blog. You can contact me on my email ID : 

**pranav913@gmail.com**
   


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
{% assign listing_limit = 5 %}
{% include post-listing.html %}


