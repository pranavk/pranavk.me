---
layout: post
title: "Dialog Tunnelling"
description: "Bringing more features to Collabora Online"
category: open-source
tags: [pgo, tdf, libreoffice, gnome, pfo]
---
{% include JB/setup %}

So I'm finally resurrecting this blog to life after a long time.

I'm simply going to talk about what I've been currently working on in Collabora Online or LibreOffice Online, as part of my job at Collabora.

In our quest to bring more features available to our users editing documents in the browser, we are attacking something that contains the majority of the features in LibreOffice -- the dialogs. One of the complaints that power users make in Online is that it lacks advanced features: they cannot add coloured borders in their paragraphs, manage tracked changes/comments, correct the spelling and grammar in the document, etc. The question before us is how do we bring these functionalities to the cloud at your disposal in your browser tab?

We really don't want to write another million lines of code in Javascript to make them available in your browser and then dealing with separate set of bugs for time to come.

So we decided to come up with a plan to just tunnel all the hard work that developers have done for the past couple of decades: come up with appropriate infrastructure to open the dialog in headless mode, paint them as a bitmap in the backend, and tunnel then image to you in the browser. And then add life to them by tunnelling your mouse/key events as well which will invalidate and update the new image you are seeing the browser. Don't worry; we are not sending the whole dialog image back to your browser every time. Only the part that needs updating in the dialog is sent back to the browser saving us precious time and network bandwidth improving your UX.

The current state of the project looks really promising. Not just the modeless dialogs, we are able to tunnel the modal ones as well which is not something we had expected earlier.

Since text is boring, here's a preview that shows dialog tunnelling in action in our test tools, GtkTiledViewer. The integration with Online is ready too and undergoing some final polishing. But it's not something you'd have to wait for too long; we are polishing a [big refactor](https://gerrit.libreoffice.org/gitweb?p=core.git;a=shortlog;h=refs/heads/feature/lok_dialog2) to LibreOffice core master to install the dialog infrastructure needed for integration. Now you will be able to do pretty much all the things in Online (and in [CODE](https://www.collaboraoffice.com/code/) version 3.0 soon to be released) that you've always wanted to do.

<iframe width="560" height="315" src="https://www.youtube.com/embed/AHETaLkhftg?rel=0" frameborder="0" allowfullscreen></iframe>


[Here](/documents/native_dialogs.pdf) are the slides from the talk I delivered on the same topic in our annual LibreOffice Conference in Rome this year.