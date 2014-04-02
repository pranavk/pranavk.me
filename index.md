---
layout: page
title: Home
tabify: h2
tagline: 
---
{% include JB/setup %}

# Recent posts
---

{% assign posts = site.posts %}
{% assign listing_limit = 5 %}
{% include post-listing.html %}


