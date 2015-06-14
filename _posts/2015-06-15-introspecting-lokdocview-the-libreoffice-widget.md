---
layout: post
title: "Introspecting LOKDocView, the LibreOffice widget"
description: "As part of my GSoC 2015 work under LibreOffice"
category: open-source
tags: [pgo, libreoffice, gnome, gobject]
---
{% include JB/setup %}

This is in
[continuation](http://pranavk.github.io/open-source/integrate-los-tiled-rendering-in-gnome-documents/)
of my work under LibreOffice. For the past few days, I have been working on
restructuring the widget, LOKDocView, to make it
introspectable. I also ported the widget to gtk3 from gtk2, so applications can
now start thinking of using it.

To test its introspectability, I wrote a simple [test application](https://github.com/pranavk/lokdocviewer)
in javascript making use of this widget. Here is the small
[screencast](https://youtu.be/k7s7tfmQFTw) I made using the widget from javascript.

<iframe width="560" height="315" src="https://www.youtube.com/embed/k7s7tfmQFTw"
frameborder="0" allowfullscreen></iframe>

The widget still needs more
polishing to provide a sane, minimal, still useful, API to consumers and to hide the
still unstable LibreOfficeKit API. So, we would be improving that in coming weeks.
We also plan to try GtkGLArea instead of currently used GtkDrawingArea for the widget to
enable openGL while rendering tiles, and hence increase the performance. The
backend currently use tilebuffer, taking few ideas from gegl-buffer, and
Mozilla's tiled buffering logic. I also hope to make further improvement in this
backend to increase the widget's performance making use of efficient algorithms.

Here is the [feature
branch](http://cgit.freedesktop.org/libreoffice/core/log/?h=feature/gsoc-tiled-rendering)
for LOKDocView.




