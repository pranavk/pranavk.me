---
layout: post
title: "Begineer guide to Spectre"
description: ""
category:
tags: []
---
{% include JB/setup %}

# Spectre

I know I am quite late to the party. It was in my todo list for a long
time to deeply understand what these unprecedented bugs are but it's
now that I managed to dig through these bugs. Spectre as the name
suggests is a bug due to a feature in modern processors that forces
processor to predict and start executing ahead of time -- speculative
execution.

# V2

In variant 2 of spectre attacks, the attacker poisons the Branch
prediction buffer (BPB) which is used by the processors to jump to a target
before it knows for sure where it should actually jump. It reminds of
a classic [Indian
game](http://www.dsource.in/resource/indian-games/indoor-games/chidiyaudd)
played among kids in Indian households where you first poison the
kid's brain repeatedly in quick succession and then play your card
hoping that kid's mind is still poisonous.

There are two mitigations for this variant of Spectre.

Firstly, Intel released microcode that introduced a new instruction
called IBPB (Indirect Branch Prediction Barrier) which flushes the
BPB. You are supposed to use this instruction whenever a context
switch takes place so that attacker process cannot make the victim
process to use the poisonous BPB. But as you can imagine, this comes
with huge performance costs and still leaves a problem unsolved.

The unhandled case by IBPB is that of Intel hyperthreading -- when two
threads are running on the same processor, they are sharing the
BPB. Intel solved this with another microcode release which introduced
a new mode called STIBP which prevents indirect branch predictions to
be controled by a sibling hyperthread. This seems like it solves our
problem but it just essentially disables indirect branch prediction
entirely leading to huge performance regression.
