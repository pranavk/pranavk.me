---
layout: post
title: "Initial preview of LibreOffice integration with gnome documents"
description: "This post is about my initial preview of LO integration with
gnome-documents as part of my GSOC 2015 project"
category: open-source
tags: [pfo, tdf, gnome, libreoffice, pgo]
---
{% include JB/setup %}

I managed to integrate LibreOfficeKit's LOKDocView widget with gnome-documents,
finally. Here is the [screencast](https://youtu.be/NdSbqMvLYt4) for the same.

<iframe width="560" height="315" src="https://www.youtube.com/embed/NdSbqMvLYt4" frameborder="0" allowfullscreen></iframe>

There are still lot of improvements that I need, for example, we need to have a
new editing overlay now in gnome-documents so that you you can do operations
like bold, italics, underline, search, switch to edit mode and view mode, and
few other things. There are also crashes right now which possibly are because I
haven't yet written robust code to nicely separate the currently used EvinceView and
the newly used LOKDocView.

On the other hand, I have few ideas to improve the widget backend, for example,
improving the tile buffer backend by rendering nearby tiles to increase the visual
coherence. Right now, it only renders the visible tiles, but it would be good to
render the tiles nearby the boundary of the visual region so that the scrolling
is smooth.

I would be working on improving upon this in next coming weeks.
