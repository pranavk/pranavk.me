---
layout: post
title: "Photos: Browsing DLNA Servers - One step closer"
description: "This post is about my progress for GSoC project under GNOME"
category: open-source
tags: [gnome-soc, gnome]
---
{% include JB/setup %}

This post is in [series](http://pricked.in/gsoc.xml) about my [GSoC project:
Browsing DLNA Media Servers in Photos](https://wiki.gnome.org/ThreePointThirteen/Features/BrowseDMSPhotos).

If you checked out latest GNOME 3.13.3 release, you might have observed that
gnome-online-accounts now has learned to set up access to the media servers in
your local network as mentioned in this [blog post by
mclasen](http://blogs.gnome.org/mclasen/2014/06/26/gnome-3-13-3/). Good to see
one part of the project committed in this release.

I have been working for past few weeks on making this whole setup at least
work and have finally able to make all of it work. I have a working [media server miner](https://bugzilla.gnome.org/728912)
that mines the content from added media server accounts in GOA. I have even
taken care of the albums in this regard. Photos from your media servers are not
thrown randomly into the tracker, rather their parent directory information
comes along with photos. This makes it easy to view photos in the application in
more organized way provided you have organized your
photos well in your media server.

Here's a screenshot that is showing photos in
their albums according to the directory structure of the media server.

<p>
<img src="/images/photos_collection.png">
</p>

The albums you are seeing in above screenshot are directly taken from the media
server directory information.

I have written a
[patch](https://bugzilla.gnome.org/728913) that adds a media-server extension to
gnome-photos. Applying this patch would enable you to see media-server content in your gnome-photos application. 

With this, I have been able to connect all the dots but there are still many issues that needs to be considered. Further, the setup
requires testing to find bugs that might have crept in during the coding phase.

### Performance issues
Performance in mining the media server content is one of the main
issues right now. If you followed my
[previous
post](http://pricked.in/open-source/mediaserver-miner-for-gnome-online-miners/)
about the media server miner, I mentioned about searching for content in non
searchable devices. I had to adopt a recursive directory by directory approach
to mine contents in non searchable media servers. It currently takes around 6 to
7 seconds to mine photos from my android device (non searchable) having less
than 100 photos currently and about 1.5 seconds on searchable devices (Rygel
serving around 150 photos). I am currently working on adopting approaches that
might serve as a performance boost in mining content especially for non
searchable devices.

### Design issues
There are few things that needs to be decided. Do we want to control our media server directly from the application ? For
instance, delete and upload photo from/to media server. Or do we just want to
make media servers read only for content applications ?

If you have any suggestion or query, you are most welcome to leave a comment. 

### Attending GUADEC - 2014
Last but not the least, I would like to thank GNOME Foundation and travel
committee for sponsoring me to attend GUADEC - 2014. Excited to attend my first
conference and meet you all there.

<p>
<img src="/images/gnome_sponsored.png" >
</p>
