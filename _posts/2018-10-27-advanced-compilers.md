---
layout: post
title: "Advanced Compilers"
description: ""
category:
tags: []
---
{% include JB/setup %}

## SSA

Single Static Assignment (SSA) is a form of program where each and
every variable is assigned only once. Each use of the variable has
only a single reaching-definition.

SSA form has two properties - the minimality which states the minimal
number of phi nodes that we need to insert for the CFG. And the other
the dominance property which enables the live range of various
variables to become a chordal graph that can then be solved in
polynomial time as a graph coloring problem.

## Analysis

### GVN (Global Value Numbering)
