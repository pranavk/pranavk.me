---
layout: post
title: Blogging for Hackers
description: "Forget Wordpress, Blogspot"
category: general 
tags: [blogging hackers, custom blog]
---
{% include JB/setup %}

## A new platform : Jekyll

Well if you are looking for some blogging platform for yourself and you are a hacker (I don't mean the hacker those who hack into computer systems, I mean developer by hacker) or want to be a hacker, then you have come here to the right place. I also used to explore here and there on the internet to find a good platform for myself for blogging. I used blogspot, found that it is too common these days, switched to wordpress, it was okay with wordpress for few days then I got bored and find that too normal. It was not giving me the power to fully customize the things, I don't want to work with their made buttons, just wanted to creep inside those buttons. Then I found something on the internet, its Jekyll, yes you read it right. I read the stuff from here and there about it and now compiling here in my blog. Jekyll is a parsing engine, its not a language, its not a blogging platform, it just parses the file written by you and create a website for you. It was created by the GitHub founder 'Preston-Werner' for the GitHub pages because he want some secure way so that hackers couldn't hack easily into github pages. Hence it is very secure. Jekyll is very young open source project and is in its intial stages but it has successfully attracted many hackers towards itself who are finding to create their new blog or finding a new blogging platform (you can easily transfer whole of your data to jekyll created website) just because they are bored with their older ones.

## Jekyll behind the scenes
Jekyll server then parses all the file in the expected directory structure and then computes all the posts, pages, dates and everything and create a single ruby object named as site. All the data including posts, pages, categories and everything can be accessed using this object site. You don't need to get into details for starting.


## Jekyll : Introduction

You can create both static and dynamic websites with it, I like static websites, because I don't ever have so much time to maintain dynamically generated websites, managing security of dynamic websites from sql-injections and all that. And I think that if you are really blogging just for the sake of interest, just because you want to share thoughts, you also don't have that much time to get yourself into dynamic web pages unless you are planning to have some business included in your blog and want to provide users with more facilities also apart from blogging. Remember, I don't mean to say that in static webpages you won't be able to add comment options and all that, you can surely run scripts and can make your website interactive using disqus etc. But still if you are not able to hold yourself and want to go dynamic, you can refer this : 

[Heroku and jekyll sitting on a tree](http://bionicspirit.com/blog/2012/01/05/blogging-for-hackers.html)

As I said above that Jekyll is nothing more than a parsing engine, so all the time you play with the files and folders, write your content in a different way so that Jekyll parses it and generate webpages in a way you want. There are several ways to install jekyll, but the most easiest one is ruby's way. 

`gem install jekyll`

Make sure you have the root access, if you have any problem in installing the jekyll, then may be you are missing some headers needed for it, so you have to install other headers. Just do a 

`yum install ruby ruby-devel` 

or just install these two packages ruby and ruby-devel to get started from your package manager.

Now you can intiate the jekyll server with a single command and it will parse all the material in the directory in which it is invoked and generate a site for you. But before invoking the jekyll server you need to make sure that the directory in which you are invoking it has the same structure of sub-directories the jekyll expects it to be. There are plenty of websites available from where you can have the right structure. This website is also publicly available at github here :

[pranavk@github](https://www.github.com/pranavk/pranavk.github.com/)

I also forked it from bootstrap github account. 

After the structure is correct you can invoke the jekyll server as :

`jekyll --server` 

from the command line.

And then jekyll server will successfully create the website in site directory with an underscore prefixed in the same directory. 

## Websites to refer for complete documentation.

So that was the quick overview of jekyll and a motivation to start blogging hacker's way. This website is also created using jekyll, I also forked it from bootstrap and then modified it according to my needs.

Now from this point I don't want to keep yourself stuck to this page only. Surely there are better documentation about creating a successfull blog out there on the Internet.You can go to :

[Jekyll Boootstrap - A website framework](http://jekyllbootstrap.com)

for better documentation and having themes to choose from giving you more freedom. You will find almost everything out there to start your own website.

**Good luck !**




