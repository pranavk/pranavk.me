---
layout: post
title: "MediaServer Provider in gnome online accounts"
description: "This posts talks about adding a new server provider in g-o-a as a
part of browsing DMSes from gnome-photos"
category: open-source
tags: [gnome-soc, gnome]
---
{% include JB/setup %}

After discussion with gnome-design team about my GSoC [project](https://wiki.gnome.org/action/edit/ThreePointThirteen/Features/BrowseDMSPhotos) viz. Browse DMSes
from photos, the schedule line of the project changed slightly. Discussion with
the design team concluded that the new media servers would be added in the
gnome-online-accounts itself which means that I need to write a new provider for
media servers in gnome-online-accounts as an addition to my earlier proposed
project architecture which only included writing a miner for browsing DMSes and
then using the miner from the gnome-photos application.

So, I have been working on writing a new MediaServer provider currently in
gnome-online-accounts. I am using GtkListBox to show the currently available
Media Server devices on the network. There are plans to include the support for
AirPlay also in the future which would require extending this media server
provider. Currently I am only working for adding support for DLNA Media Servers.

The media server provider in g-o-a uses dleyna-server DBus API in the backend to
accomplish major part of its task. It calls the dleyna-server methods to get all
the servers around and then probe each one of them for their properties.

You can have a look at my code in a separate WIP branch I am maintaining over at
github
[here](https://github.com/pranavk/gnome-online-accounts/tree/mediaprovider). The
branch is quite buggy at the time of writing this. It just make things work as
of now. I am scrubbing and improving upon the code gradually.
