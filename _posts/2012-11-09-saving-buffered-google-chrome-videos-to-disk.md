---
layout: post
title: "Saving Buffered Google Chrome Videos to Disk"
description: "The post tells you how you can save the buffered video buffered in Google chrome to disk."
category: general
tags: [google-chrome, buffered-video-downloader]
---
{% include JB/setup %}

First of all, I must tell you that I will be talking exclusively about
Linux only. However with only small bit of headache you should be able
to copy the same procedure and implement the same thing in other
Operating Systems also like MacOS and Windows.

## Overview
First of all you should have cache enabled in your google chrome
browser for this trick to work. Just go to the browser settings and
then enable the cache. If it is already enabled you can increase the
cache limit to something appreciable if you watch big videos so that
whole of it resides in the cache itself and then you can save even
large buffered videos to your disk and watch them later.

## Procedure
The cache folder of your google chrome browser resides in your home
directory. There is a folder named `google-chrome` in there. Enter
into this folder and then enter into a directory named `Profile
1`. There are two directories inside that with name `Cache` and `Media
Cache`. Your media files, all pictures, music clips and video buffered
resides there. The problem is that its really hard to find which one
of them is the video file, which one of them is html page, script,
song or picture. 

Go to this folder as :

`cd ~/.cache/google-chrome/Profile\ 1/`

Video files usually resides in `Cache` folder. So go inside that
directory.

`cd Cache`

You will see a lot of files in there. Just sort them by date and the
latest videos buffered should be there. Just match few of the files
with the matching timestamp. You can check the type of those files
with a `file` command as :

`file f_00564e`

This will output the type of the file mentioned above. If its a video
file it tells you its a video file. You can check few of the matching
files with the timestamp and then play the video file with default
media player.

If you are using gnome, you can open the file like this with the
default media player to run that type of video, song or anything.

`gnome-open f_00564e`

If you are using kde, then use this :

`kde-open f_00564e`

This command shall open the default application with which that file
should be opened.

## Scope 

I see that this procedure is too manual and requires a bit of
headache. This procedure can be made very simpler for day to day use
by writing a script that shall automatically detect the new file
entered into that directory with its type as say video and then offer
the user if he/she wants to save the same to hard disk for further
use.

I will be working soon on this to create such kind of tool. If you do
before me, do tell me by dropping me an email.