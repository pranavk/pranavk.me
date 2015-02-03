---
layout: post
title: "Libreoffice headless comes to the rescue"
description: "Mass conversion to pdf files"
category: 
tags: [general]
---
{% include JB/setup %}

During exam time, I often have to read a lot of .ppt files provided to me by our
instructors. That's what we are supposed to study so that sylabii can be
revised quickly. I don't windows at all and hence have to use libreoffice for
opening these presentation files but libreoffice is quite slow for me as
compared to microsoft powerpoint. I don't want to install Windows now just
because of this purpose. However, I observed that pdfs can be opened
comparitively faster than these .ppt files. Converting each ppt file to its pdf
equivalent is a cumbersome task.

Last week, I wanted to convert a bulk of .ppt files to their pdf equivalents and
this is where Libreoffice headless came to my rescue, it helped me do a mass
conversion with this following command :

`libreoffice --headless --convert-to pdf *.ppt`

This will convert all the ppt files in current directory to their pdf
equivalents.

If you don't know what a headless means, it means that you don't want the whole
GUI thing to woke up and do stuff for you, that increases the performance by
several folds such as in this case. We just want the conversion feature of
libreoffice. You can call other LO features too by passing a help flag and see
what are the functions that LO supports and try calling them headless.

Let me know in comments below. Happy hacking !
