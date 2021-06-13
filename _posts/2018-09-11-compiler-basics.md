---
layout: post
title: "Compiler Basics"
description: ""
category:
tags: []
---
{% include JB/setup %}

If you are the dumbest person in the room, you are probably in the
right room. I find myself in a similar situation these days, sitting
in Advanced Compilers class. Everybody around me seems to be so
accomplished and I am probably the only guy there with least
experience in compilers and programming languages. But I see it as an
opportunity to learn more. In this post, I am going to mention all the
things that are basic but I don't know about. These are the things
that are sort of pre-requisites I find I should have the knowledge
before taking this class.

# Context free languages

Well, I know a bit about it from my undergrad days but this needs to
be revised. So Context free languages are the ones where you can make
use of derivation without considering context in mind.

## Derviation?

We need to look what Production is before we look into this.

## Production?

Production is a rule where a non terminal is replaced by a
terminal or set of terminals and non terminals. Eg:

N -> aA

Here N and A are non-terminals and a is a terminal.

Now coming back to the topic of Derivation.

Derivations make use of productions to form a string.

Eg:

taNta can be transformed to ta(aA)ta. The production that got used was
not dependent on the context of other characters around the
non-terminal N. That's why these are called CF languages.

Natural language is certainly not context free. You cannot just
randomly replace any set of characters with something else to make a
valid sentence in that language.
