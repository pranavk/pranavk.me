---
layout: post
title: "Integrate Libreoffice with gnome-documents"
description: "This post talks aabout my work, part of GSoC 2015, which aims at
integrating LO tiled rendering with gnome-documents"
category: open-source
tags: [gnome-soc, gsoc15, gnome-documents, libreoffice, tdf]
---
{% include JB/setup %}

This year I am working on integrating Libreoffice with
gnome-documents. gnome-documents currently only supports viewing documents. It
indirectly makes use of poppler library to render PDF documents. To show any
other format such as .docx, .odt, .ods, it first converts the document into a
PDF format using unreliable `unoconv` command, and then render these PDFs using
poppler. Hence, this also disables gnome-documents from editing editable formats.

As part of my GSoC 2015 under Libreoffice, my main aim would be to improve an
existing widget under Libreoffice, LOKDocView, and integrate the widget with
gnome-documents. LOKDocView make calls to Libreoffice core using
LibreOfficeKit. The current LOKDocView implementation needs a little furnishing.
It also doesn't
support efficient tiled rendering, which is very essential especially at
larger zoom levels (You never want the application to render zillions of tiles
for you at 500x even if you don't want to see majority of them). One of the improvements that I would be making in this widget is efficient
tiled rendering so that it only renders the visible part, and while scrolling
tries to reuse the already renders tiles to the best of its ability.

To improve this tiled rendering, I have modfied the widget to make use of a tile
buffer taking ideas from Mozilla source code, and how it manages to do the tile
buffering. The current implementation of the tile buffer I created acts simply
as a cache returning already rendered tile instead of giving a new render tile
command to the LO core. This helps in easy navigation of documents. You can find
more about this on my [feature
branch](https://github.com/pranavk/core/commits/feature/gsoc-tiled-rendering).

To further improve the tiled rendering support, we are also trying to find ways
of rendering the tiles on GPU, rather than on the
CPU. [GtkGLArea](https://developer.gnome.org/gtk3/stable/GtkGLArea.html) seems
to be the good choice here, but is quite new, and most importantly Libreoffice
is still at Gtk2 and it might take some time for it to migrate to Gtk3.

Other than that, to make the rendering even more efficient, we can employ
techniques like
[double-buffering](https://en.wikipedia.org/wiki/Multiple_buffering) which I
would be analysing the feasiblity of, and then implementing them in the widget.

But this widget is still not a replacement for existing
[poppler](http://poppler.freedesktop.org/) library. The Libreoffice can render
other document formats such as odt, doc, docx etc., but it gives a terrible performance at rendering
PDFs. A better approach would be to use both in gnome-documents, but only
poppler for rendering PDF.

Please feel free to comment, if you have any idea/optimization regarding this.
