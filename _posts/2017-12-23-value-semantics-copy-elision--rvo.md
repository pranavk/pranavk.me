---
layout: post
title: "Value semantics, copy elision & RVO"
description: ""
category: cpp
tags: []
---
{% include JB/setup %}

I watched a talk by the legendary Sean Parent who works for Adobe
Systems on the Photoshop team. He's an amazing guy who has a very
deep knowledge of C++ and computer systems.

The first thing that I learnt about was Value Semantics. Not that I
didn't know about it, but I didn't know much that what I knew is
called "Value Semantics". I thought it's some complicated concept in
C++. Value Semantics simply means that we care about the value that
objects contain in C++ than the object itself. C++ is a language that
follows value semantics. It's designed with value semantics in mind.

# Passing arguments by const ref
This is silly in many of the situations in post-c++11 era. The passing
of arguments by const ref is an old school technique. You should know
about copy elisions, RVO (Return Value Optimizations), and move
semantics. Passing arguments by const ref in some situations means
worse performance than passing arguments by rvalue, or just by
value. 'Pass just by value' is sometimes much more beneficial than it
at first appears to be. So start moving away from this pass by const
ref thing really.

# Copy elision
Copy elision means that compilers will help you elide a copy where it
can. [This](http://definedbehavior.blogspot.in/2011/08/value-semantics-copy-elision.html)
guy explains the copy elision very well.
