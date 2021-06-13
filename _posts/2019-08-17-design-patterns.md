---
layout: post
title: "Design patterns"
description: ""
category:
tags: []
---
{% include JB/setup %}

# Visitor pattern

[This](https://manski.net/2013/05/the-visitor-pattern-explained/) is a
very nice description of what a visitor pattern is and includes all
the advantages and disadvantages. Let me try to summarize what I
understood and learnt from here.

So, visitor pattern is simple. It's only purpose is to separate the
object heirachy from the algorithms. It's more suitable to stuff like
you did in your MSFT internship with the scriptdom library - the
library will parse the SQL for you and you are supposed to attach your
algorithms to the datastructure parsed using a visitor pattern. I say
it's more suited to that kind of things because changing the object
structure in an algorithm that uses visitor pattern is a big mess
because you need to teach every existing visitor about this new thing
that exist now.

The other important disadvantage is the iteration order. In visitor
pattern, you can visit the object structure either in one way or
other. But if you want to implement two algorithmst hat depend on the
order in which you visit the herirachy you are screwed.

Read the above link for more information.

# Iteration pattern

This just means exposing your collections with iterators so that you
have the flexibilty of changing the implementation without changing
the API.
