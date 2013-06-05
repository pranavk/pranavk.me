---
layout: page
title: Home
tabify: h2
tagline: 
---
{% include JB/setup %}

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


