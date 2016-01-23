---
layout: post
title: "Update on Libreoffice and GNOME integration"
description: "This post talks about the status of the project that we started
with GSoC 2015, how it evolved gradually and finally into the final integration stage"
category: open-source
tags: [pgo, tdf, libreoffice, gnome, pfo]
---
{% include JB/setup %}

It's been a long time I have talked about the [project](http://pranavk.github.io/open-source/integrate-los-tiled-rendering-in-gnome-documents/) that I started with GSoC
2015 some time back. We reached at pretty much [exciting
results](http://pranavk.github.io/open-source/gsoc-summer-wrapup-report/) by the
end of the summer where we could see the integration working pretty well with
LibreOffice. We finished and merged all the
major work on the Libreoffice side alongwith just-made-it-work integration
with gnome-documents. Things were still in the
development stage for gnome-documents, and we needed good amount of effort to
get it merged upstream. 

Things moved pretty slow on the integration because from time to time during the integration I would
realise that I had missed something in LO, and I need to fix it before I
could move forward with the integration. I would then jump back to LO, fix it,
and switch back to gnome-documents, and so on. But it was only till Dec 2015
that things were slow. I suspect
[this](https://wiki.gnome.org/Hackfests/ContentApps2015) thing to be the turning
point. [Bastien](http://www.hadess.net/), [Debarshi]
(https://debarshiray.wordpress.com/), and
[Cosimo](https://blogs.gnome.org/cosimoc/) held the string from
gnome-documents side, and started working with my earlier WIP work/patches for
gnome-documents. There were many issues that needed to be fixed for the proper
ready-to-merge LO
integration, and better user experience. But I was lucky now that I had the
experts to take care of it.

As I expected, there were still some minor fixes to be done on
LO side which they found out during the integration. Bastien would report LO
related bugs;
I would fix them in LO; [David](https://davetardon.wordpress.com/) would help
with the reviews, and build and ship the package for us. As I write this, I am glad
and feeling proud that we are now there with most of the [work](https://bugzilla.gnome.org/show_bug.cgi?id=753686) already
merged upstream in gnome-documents. With LO 5.1 release just few weeks away, gnome-documents seems to be all set to
integrate LO with its next major release, 3.20.

Here is the screencast I made running gnome-documents master with [LO 5.1.0 rc2
koji build on
fedora](http://koji.fedoraproject.org/koji/buildinfo?buildID=711257). There are
bug fixes that couldn't make to LO 5.1, and some more that you will uncover
as you use this. :) So, it might take little more time (one more release, maybe)
while it settles down. Note that LibreOfficeKit API (to expose LO functionality) is still unstable, but the widget is quite
usable in the view-only mode, and that is how we have integrated it in
gnome-documents for now.

Screencast is here :

<iframe width="560" height="315" src="https://www.youtube.com/embed/gDLkVUjGChg" frameborder="0" allowfullscreen></iframe>

Earlier, gnome-documents was converting these non-supported formats into PDFs
using unreliable command `unoconv`, which sometimes would not give good results
especially with spreadsheets where it would scramble things up during the
conversion. With the use of this new widget, now, you would see the documents as
they exactly are, unless you do not have LibreOffice installed on your box in
which case it would pop up an error asking you to install LibreOffice.

If you want to try it out yourself, you need to build atleast LibreOffice 5.1.0
rc2 and gnome-documents master branch. If you are on fedora, you can use this
[koji build](http://koji.fedoraproject.org/koji/buildinfo?buildID=711257) to
install LO 5.1.0 rc2 on your box, and you can use jhbuild to build
gnome-documents from master. Running gnome-documents now should automatically
make it to use LibreOffice in the background.

I would like to thank all the people, aforementioned, Bastien, Debarshi, and
Cosimo to finish the GNOME integration with LibreOffice. On the LibreOffice
side, [Miklos](http://vmiklos.hu/blog/) and
[Michael](https://people.gnome.org/~michael/) with whom I started this GSoC
project, and David Tardon who has helped us ship the LO package with much needed
fixes in time.

While I am at it, I also want to announce about my new job at Collabora
Productivity where I would be hacking on LibreOffice full-time. It would be an
exciting and wonderful learning experience for me. I am greatly looking forward
to it.



