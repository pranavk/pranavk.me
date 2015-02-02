---
layout: post
title: "Spatial Computing"
description: "About the design of a computer architecture that computes in space"
category: architecture
tags: [wavescalar, spatial-computing, gnome-soc]
---
{% include JB/setup %}

I have been working for past few months on a research project in one of the cores of computer science,
Computer Architecture specifically trying to increase the efficiency of existing
processors in use by several folds. This would be possible because this new architecture is a dataflow
based architecture unlike the control flow architecture that we have been using
since Von Neumann invented it.

This new architecture can theoretically exploit the maximum possible parallelism and
hence making it super efficient. Here,
we are trying to generate a hardware and create a compiler for the programs written in imperative languages 
so that they can be executed on this new data flow based hardware. The [LLVM](http://llvm.org) compiler
infrastructure suits very well here. It has got frontends for various
programming languages, it then converts the source code of these programming
languages to a special LLVM IR (Intermediate Representation). This saved a lot
of time since we now do not have to deal with so many programming languages and
can work on a single language (LLVM IR) that would indirectly support all other
languages.

We have taken the concept of waves from the well known [Wavescalar
Architecture](http://wavescalar.cs.washington.edu). Since LLVM is a compiler
infrastructure, it provides writing a pass which takes LLVM IR input and do some
operations into it. Implementing this concept of waves from wavescalar
architecture in this LLVM pass helped us to annotate waves in the control flow
graph of any procedure given in imperative language. With the help of these
waves and the control flow graphs, we generate the data flow graph out of
it. This is the main thing that would break the sequentiality embedded in a
control flow programs, it would put in place a producer-consumer relationship
between various instructions and thats all. As soon any instruction produces
soemthing, all the consumer instructions will consume it. We have already got
rid of the sequentiality, no more waiting and hence faster.

Now why do we need waves here ? Well, conversion from control flow to data flow
may look easy and feasible but in reality it breaks alot of things. Loops and
branches are some of the programming constructs that would break this conversion
and output false results in the data flow equivalent of the program. Waves are
the independent units in which each instructions can execute at most once, they
have single entry point and all the instructions in a wave are partially
ordered. This ensures that the correctness of the code doesn't get affected in
our endeavour to increase the performance. After all, a program which doesn't
give correct result is of no use.

After we get a data flow graph by using the information from the control flow
graph of any program, we would write a systemC implementation to simulate things
so that we can check its feasibility of a real hardware. Writing a compiler to
generate a data flow binary to be run on the hardware would be next steps.

I am currently starting out with a very basic programming constructs such as
loops and
doesn't include pointers, runtime bindings etc. Pointers are one of the fundamental
things that we would have to take care of anyways because any major program will
make use of it. [Here](http://github.com/pranavk/spatial-computing) are very
basic LLVM passes I have written. 

More coming as soon as I get some major work done on this. :)

