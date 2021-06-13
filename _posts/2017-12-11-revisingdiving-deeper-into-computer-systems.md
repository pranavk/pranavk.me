---
layout: post
title: "Revising/Diving deeper into computer systems"
description: "All the good things I revised and learnt in past couple of hours"
category:
tags: [systems]
---
{% include JB/setup %}

I have always been delaying journalling these kind of things I learnt.
But let's start by pushing these to non-publishable branch in Github website
repo. Putting these things in the form of words will help me
contemplate about these things and understand them better. Plus, I can
easily revise them when I need them in future.

# Stack layout on x86

I started with reading some blog posts about the
x86 frame layout. [This
guy](http://duartes.org/gustavo/blog/post/journey-to-the-stack/)
explains it the best. The diagrams are so elaborate that there's no
way you can't understand it. The above link explained the stack
prologue and how the computation inside the stack happens. By the way,
prologue means the machinery that is installed at the start of the
function (stack). In the next blog post
[here](http://duartes.org/gustavo/blog/post/epilogues-canaries-buffer-overflows/),
he talks about buffer Epilogues, i.e, the stack machinery installed
when the function is about to return. Again, he used his wonderful
block diagrams to explain things there. One of the interesting thing I
found in this blog post is about "Canaries". Yes, these are those
small, low-maintenence pet birds that you can bring home. I also
thought, once upon a time, to keep one in my home but well, something
for future. So yeah, compilers use canaries. Does it make sense? Maybe
not. So in the past, the coal miners used to take canaries with them
to the coal mines. Canaries being very sensitive to toxic material,
they will die as soon miner approaches area that is dangerous to
go. This will let the miners know what areas to avoid before they
die. Similar concept follows in compilers. Some notorious people like
to smash the stack in the program. Before they smash the stack, we
need a sort of canary that can detect it and let us know that
something unexpected is happening. So compilers use stack-protection
-- installing canaries in the stack. When the attacker tries to write
the return address in the stack, they will hit the canary first. When
the function returns, it is checked if the canary is there, i.e., the
magic, unique value installed by the compilers at the start of the
stack is checked before functions exists. If value is intact, we are
safe, otherwise, we are not. It's not enabled by default in GCC, so
you need to provide -fstack-protector. This is what GCC man has to say
about it:

-fstack-protector
           Emit extra code to check for buffer overflows, such as
	   stack smashing attacks.  This is done by adding a guard
	   variable to functions with vulnerable objects.  This
	   includes functions that call "alloca", and functions with
	   buffers larger than 8 bytes.  The guards are initialized
	   when a function is entered and then checked when the
	   function exits.  If a guard check fails, an error message
	   is printed and the program exits.

And wow, we learn another thing. I didn't know that 'alloca' can be
used to allocate memory on the stack. I only knew about malloc and
family that are heap based only. Nice find through the man page ;)

There are some other helpful options: -fstack-protector-all,
-fstack-protector-strong, and -fstack-protector-explicit. The second
last one is what is used in LibreOffice!! Atleast in the
libreofficekit module that I tested it with.

-fstack-protector-strong = -fstack-protector + "those that have local
 array definitions, or have references to local frame
 addresses.". There's an LWN article about it
 [here](https://lwn.net/Articles/584225/).

How this will add extra protection?
For the array definition part, it will prevent any out of bounds write
and hence smashing the return address. For the references to local
frame addresses, I don't quite understand how. Let's think about it
later.

What else about stack layouting? Oh, yeah, there's this another good
article about it and how the modern x86 system use it. [Here's
it](https://eli.thegreenplace.net/2011/09/06/stack-frame-layout-on-x86-64#id8). I
didn't know about the "red zone" in the stack layout, for
example. This "red zone" is used a scratch pad for functions. Nice
thing to make things faster.

# Playing with GodBolt

If you don't know about this tool, you should [check it
out](https://godbolt.org/#) ASAP. I wrote a simple program and then
was able to connect all the dots with the assembly output that
Compiler Explorer showed me. Except one thing. [Here's my
doubt](https://stackoverflow.com/questions/47741554/gcc-x86-assembly-extra-space-in-functions-stack). A
duplicate question, yeah. I should have searched SO well before asking
a question. But everthing has good sides (which we will discuss
later). So my doubt was why the extra space? And the reason is because
of SSE.

So what's SSE?

It's Streaming SIMD Extension. SIMD is Single Instruction Multiple
Data. So processors who can sum your 100 length vector in one
instruction can make use of it. These instructions require their
operand to be at 16 byte boundary, so gaps like above were due to
alignment. The other reason is that it's just compiler's internal
behavior and we shouldn't worry about it. After all, that question was
without optimizations.

So a wonderful guy there helped me with the code and forced me to make
use of `volatile` keyword. I never used this in C++; always just
read in theory. But well, this is the good part of asking the question
on StackOverfow I mentioned earlier. I played with volatile then. It's
such a nice trick to force-spill the registers. Do you want to know
what's register spilling?

Register spilling is when the values to store exceeds the number of
registers available in the processor in which case your system stores
them in the memory. `Filling` on the other hand means filling the
registers from values in the memory. Now from where doesn volatile
come here? Volatile forces the compiler to spill the registers. How?
Volatile by definition tells the compiler that the variable declared
needs to be read from the memory everytime and that the compiler
cannot rely on caching it (i.e. storing it in register and not
invalidating it until a write occures to
it). [Here](https://godbolt.org/g/nEHBV1) is the simple code using
volatile. As you can see, the assembly is forcing the value to be
written to the memory and then read again. If you remove volatile, you
will notice that this is not the case.
