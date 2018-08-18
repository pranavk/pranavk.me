---
layout: post
title: "Dialog tunneling - Part 2"
description: "Now since dialog tunneling has finished, complete
overview of the current state"
category: open-source
tags: [libreoffice, tdf, pgo, pfo]
---
{% include JB/setup %}

This post is in continuation with the dialog tunneling post I talked
about last time [here](http://pranavk.me/open-source/dialog-tunneling/). The last post
talked about what we wanted to achieve and showcased it using a test
tool in C++, gtktiledviewer. The real aim was to integrate
this feature in LibreOffice Online so that people can use the
awesome features that already exist in the LibreOffice desktop
version.

Since last couple of months, we have been polishing it to look nicer,
kill minor inconsistencies left & right, and worked on tunneling the
modal dialogs as well where we faced interesting problems to deal
because of the collaborative editing in Online.

From the implementation point of view, the API is also now more
generic and
[simplified](https://gerrit.libreoffice.org/gitweb?p=core.git;a=commit;h=b5e27fd809845577a90cc1811de062c070110078). We
earlier used to have different LOK callbacks to notify about the
dialog invalidation and other controls like combo boxes, color picker,
etc. Now we have a single callback that handles all of these. This is
possible because now we assign unique window ID to each of these
entities (the main dialog frame as well as their child controls). So
all of them can talk to Online independently. The client (Online) of
course have to manage the parent-child relationships on its own (which
is indicated only when the windows are first created - emit the
'created' callback). Since we were also interested in tunneling other things like
autofilter menus, spelling suggestion context menus, etc., this
simplification of API helped immensely in achieving that goal.

Tunneling modal dialogs caused some grief when we started to test them
with collaborative editing. When we were launching a modal dialog in Online,
the dialog would start its own main-loop inside an already running
application-level main-loop. This is okay. But when the other user
in the same document opens same dialog (collaboratively edit it), this dialog
would launch its own main-loop on the same stack. So now the
first user cannot close its dialog because its main-loop is one level
up. Here's the illustration of what I want to say, if the text above
was confusing:
```
...
ExecuteDialog2-loop()
...
ExecuteDialog1-loop()
...
Application-level main-loop()
```
How do you close the Dialog1 without closing the Dialog2? Just don't let dialogs have their own main-loop. Rather execute them
asynchronously. Show them on the screen and tunnel them to
Online. [Kendy](http://holesovsky.blogspot.in/) did a great job here
in converting the dialogs to execute asynchronously
along with necessary infrastructure changes in dialog execution code.

Moving the dialogs to execute asynchronously helped solving another
problem - whole Online getting freezed with a launch of the dialog. Online has a single thread
to interact with LibreOffice core; so, when we launch a modal dialog
from Online, the thread will block and wait for the dialog execution
to finish (closing of dialog). And this would freeze Online because
now your key and mouse events wouldn't go to core and won't be
processed, not because core cannot process it but because the thread
that is responsbile for passing those events to core is blocked.

We have been continously polishing this feature to improve the user
experience for our Online users. Michael and Kendy localized the
dialogs and did some theming work on tunneled dialogs so that they suit our
Online theme better.

It was an interesting journey overall. You can
find all the patches
[here](https://gerrit.libreoffice.org/gitweb?p=core.git&a=search&h=HEAD&st=commit&s=lokdialog). Big
thanks to Collabora for sponsoring this work and all the team members
involved. You can find all the improvements talked above in the latest [CODE](https://www.collaboraoffice.com/code/).
