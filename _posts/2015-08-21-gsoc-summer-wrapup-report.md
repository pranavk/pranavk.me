---
layout: post
title: "GSoC Wrapup Report"
description: "The final summer report wrapping up whole GSoC work"
category: open-source
tags: [gnome, libreoffice, pgo, pfo, tdf]
---
{% include JB/setup %}

This is a GSoC wrap up report of everything I did this summer. Though, my official
GSoC organization was LibreOffice, the work also involved GNOME directly, and Mozilla
indirectly.
Some of you, who are already familiar with my work might find this post
repetitive since I would be repeating many of the things here that I have
already talked about in my earlier posts.

## Initial state of the widget

Before I started working on it as a summer of code project, the widget:

* used to render all tiles in the loaded document
* used to make calls to the LibreOffice core in the same UI thread
* was not introspectable
* was gtk2
* and needed such minor fixes here and there

## Tiled Rendering

I started with implementing tiled rendering in the widget. First plan was to
reuse the Mozilla tiled rendering code. After analyzing this and discussing it, we scraped
that plan as it was quite infeasible. Better approach was to understand how tiled
rendering is implemented and write our own class that handles the tiles for
you. We took ideas from Mozilla tiled rendering code, and GeglBuffer.

We started with a small TileBuffer class, and it gradually improved as
widget started to demand more from it. There is still some scope of
improvement in TileBuffer class which is already on my radar. At the moment it exposes enough API for the
widget to work smoothly.

## Only render visible tiles

Aforementioned, the widget used to render all of the tiles even if they are not
visible on the screen. This was a huge bottleneck to the widget
performance. Why render millions of tiles in a large document if most of them are
not even visible to the user?

We changed this to demand-based model. Only render tiles when there is a demand
for them, that is, when the user wants to see them. Also keep caching these tiles
with the help of TileBuffer so that next time user asks for these tiles, it
doesn't have to render the tile again.

## Free the main thread 

All the LibreOffice operations, like, rendering new tiles, selecting a
paragraph, bold the selected text etc. is a lot of work and if done in the main
thread would not give a very smooth user experience. So, we decided to move all
such heavy operations (all libreoffice calls) to a new dedicated worker thread
whose job is to perform the libreoffice calls and return the result to the main
thread. As a further optimization, we used a thread pool with a single thread so
that we don't have to create a new thread everytime. It is to be noted here that
we used a thread pool of single thread because libreoffice is almost
single-threaded, and it would be useless to create multiple worker threads
calling to the same libreoffice core instance. Further, thread pool with a single
thread would automatically queue the LibreOffice operations for us, and execute
them when thread becomes free.

As of this writing, we have moved all LibreOffice calls but one to the worker
thread. This has signficantly improved the widget performance.

## GObject friendly/introspectable widget 

One of the aim of this project was to integrate it with
gnome-documents. GNOME Document is written in javascript, and the widget is in
C++. GObject Introspection came to our rescue here. We started making this
widget more GObject friendly, added necessary comments/annotations, and finally
we were able to use this widget from any of the language bindings including
javascript.

## Gtk3 port

Since we wanted to integrate the widget with gnome-documents (gtk3), we modified
the widget to use gtk3. This also gave a new look and feel to the widget.

## Ship introspection files with LibreOffice

Installing the introspection files (.gir/.typelib) into their standard location
on user's computer is something that doesn't fit well into the LibreOffice
installation model. The current plan is to let the distributions execute a
script (create_tree.sh) provided by LibreOffice that would generate and install
the introspection files (.gir/.typelib) into their standard location. You would
most likely see this script being used by distributions with LO 5.1

## Integrating it with GNOME Documents 

For few days, I used a sample javascript application that uses this widget to
show and edit documents. This was useful for debugging. Gradually, I started to
write code for gnome-documents to use this widget. I had to change the
integration model a few times. Finally, I ended up writing a new class to handle
the libreoffice widget, and the integration works quite well now.

If you are interested in trying this widget out, you can checkout my
gnome-documents feature branch
[here](https://git.gnome.org/browse/gnome-documents/log/?h=wip/pranavk/lokdocview).
However to make this work, you have to generate the introspection files manually. I have
created a (wiki
page)[https://wiki.documentfoundation.org/Development/Integrating_LOKDocView_and_GNOME_Documents]
that should help you in this regard.

## ETA in GNOME Documents

All the work on the widget is already in LO master which will become LibreOffice
5.1 to be released around January 2016. This means we still got some time to
make improvements in widget, if any, till LO 5.1 freeze in November 2015. My hope is that we should be
able to see the widget integrated in gnome-documents in 3.20, if everything goes well.

Here is the screencast I made where gnome-documents is using the libreoffice
widget to show open documents, while still using evince view to show the pdf
documents.

<iframe width="560" height="315" src="https://www.youtube.com/embed/bxh4k0rFMc0" frameborder="0" allowfullscreen></iframe>

Overall, this was the best project that I ever worked on till now. I learnt a
lot this summer. I would like to thank my GSoC mentors - Michael Meeks,
Miklos Vajna for their continous support and ideas throughout the
summer. I would also like to thank Debarshi Ray and Cosimo Cecchi for their
invaluable suggestions that helped me finally integrate the widget with GNOME
Documents. Its still not in master, but it works well, and I hope to see it soon
in master. Also thanks to Mozilla community for helping me with tiled rendering concepts.
