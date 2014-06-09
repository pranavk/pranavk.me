---
layout: post
title: "MediaServer miner for gnome online miners"
description: "Adding a new media server miner in gnome-online-miners"
category: open-source
tags: [gnome-soc, gnome]
---
{% include JB/setup %}

After a working GOA [media server provider](http://bugzilla.gnome.org/730890) I had been working on, its the time
to start mining data from the added GOA account. Though media server provides
variety of media types, I am currently only considering browsing photos from the
media server.

Exported object on the D-Bus by the GOA daemon only provides with the
UDN (Unique Device Name) and the
DlnaSupported property of the media server. The DlnaSupported property tells if
the media server is DLNA certified or not. This can be useful if in future we
plan to integrate other types of media servers in GNOME. These two properties are just enough for the
miner to start working. The miner fetches the UDN of the added accounts and see
if the DMS with UDN is currently online or not. Also depending upon the
DlnaSupported property, it will instantiate the server manager accordingly
(Eg. DLNA server manager for DLNA devices, some XXX manager for some XXX type of
media server etc.). All online media servers are
then probed for photos. 

The mining task would really have been very easier had
all the media servers provide the searchable property on them. But
unfortunately, not all the media servers are searchable, you can't search them
by their MIMEType (eg: give me all photos). With all the current DMSes I am
playing out with while [Rygel](https://wiki.gnome.org/Rygel) supports searching,
there are quite few like my android device which prohibits searching at all. For
DMSes that do not allow searching for the content, the miner needs to
recursively check data in each of the container (directory) for photos.

At the time of writing this post, I have successfully implemented a basic mining
for photos on devices that are searchable. You can have a look at the work
attached to [Bug 728912](http://bugzilla.gnome.org/728912). I am still finding
my way out for efficiently searching for photos in DMSes that do not provide any
such searchable property at all or that prohibits searching via MIMEType.


