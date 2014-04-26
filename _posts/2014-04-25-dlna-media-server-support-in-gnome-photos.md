---
layout: post
title: "DLNA Media Server support in gnome photos"
description: "This post talks about adding DLNA Media server support in gnome-photos"
category: open-source
tags: [gnome-soc]
---
{% include JB/setup %}

[Photos](https://wiki.gnome.org/Design/Apps/Photos) is a wonderful application available in GNOME. Its written in C. It
helps you browse all the available photos in your standard directories (home,
Picture, Documents etc.). You can create new collections of photos, mark your
good ones as favorites.

As a part of my GSoC 2014 [project](https://wiki.gnome.org/action/edit/ThreePointThirteen/Features/BrowseDMSPhotos) under GNOME, I will be extending the code of
this application to add a new feature under GNOME i.e to add the support of DLNA
Media Servers.

## What is DLNA Media Server ?
So, lets talk about what a DLNA Media Server is ? There are lot of devices these
days around us that are DLNA Media Server (or DMS). These can be cameras,
smartphones, laptops etc. These servers serve the content to Digital Media
Renderers (DMR). The job of DMR is to get the content from the DMSes and render
them. So if the media content is a music, DMR would play it; if its a photo, it
would just show it. DMR can be your TV, smartphone etc.

My GSoC project this summer would enable gnome-photos to browse the content of
all the DMSes available around and show the content in the
application. Additionally, it can also push the content served by DMSes to DMRs
available on the local network. So as a result it can also act as a Digital
Media Controller (DMC). The application already had few DMC capabilities before,
this project would just extend them after writing the support for DMSes.

## Available approaches
There are two approaches I can follow to make the gnome-photos application
browse DMS contents. 
 
 * I can use the existing [grilo
   plugin](https://bugzilla.gnome.org/show_bug.cgi?id=707346) to do the same.

 * I can make use of [dleyna-server](https://github.com/01org/dleyna-server). It
   is a DBus service that provides an API to browse the contents of the DMS
   easily.

Pondering over above two options, I think using dleyna-server directly would be
a better option since using grilo plugin is still in development stage and might
not be reliable in the long run. Moreover, grilo plugin doesn't provide
support such as async calls and cancellable API.

## Current Progress
Making the dleyna-server my choice, I installed the dleyna-server
alongwith its dependencies (dleyna-core, dleyna-connector-dbus) and launched the
dleyna-server-service. The API it provides can be easily viewed using d-feet. So
now implementing DMS in gnome-photos reduces to just calling the functions
provided by the API from dleyna-server dbus service. Using the dbus services in
gnome-photos requires playing with
[gdbus-codegen](https://developer.gnome.org/gio/2.29/gdbus-codegen.html).
My mentor gave me a [bug](https://bugzilla.gnome.org/show_bug.cgi?id=726919) to
solve related to gdbus-codegen. I solved the bug and learnt how I can use 
dbus services from the application.

My next steps would involve making use of dleyna-server-service's API from the
application, browse its content and show them up in gnome-photos. But before
that, there are lot of decisions especially UI decisions that needs to be taken.
Eg: What if
there are lot of DMSes available on local network. The user might not want
contents of all of them to be shown in the application. The application should
give the user flexibility and full control over browsing content from DMSes
around in easiest possible interface possible. I need to discuss this with GNOME
UI design team for whats best in this case.

I am currently working on it and will update you soon about my progress.
