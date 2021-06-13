---
layout: post
title: "Logic, Implications"
description: ""
category:
tags: [maths]
---
{% include JB/setup %}

# Motivation

I was never serious when studying discrete mathematics in college but after some good amount of experience in the computer industry, I realize the importance of having a strong Mathematics background. If you want to be a good computer scientist, you should have a good mathematics background. No exceptions. Sure, you can write normal programs and do cargo-cult programming but if you want to do something substantial, then it is necessary for you to have strong hold on Mathematics, especially discrete mathematics. And unfortunately, this was the subject that I ignored the most in my ndergrads. I really regret having done so. My logic per se is not bad. I do pretty well but a formal education is Logic would be beneficial, I suppose.

# Introduction

Before I start to dig deeper into complicated concepts, let's revise some fundamental concepts.

## Proposition

For the purpose of this article, I will only stick to propositions. Now what is proposition? Proposition is a statement that can either be true or false. Not all sentences in English that we use in our daily life are propositions. Eg: Please clean the floor. This is an imperative sentence and doesn't have a true or false value. This is certainly not a proposition. But a sentence like: It is raining outside. It is a proposition since there're only two possible values for the statement. It might be true in which case it's raining outside or it might be false in which case it's not raining outside.

## Conditional statements

Conditional statements have a huge role to play in Logic theory. A conditional statement consists of two or more propositions. For simplicity, in this article, I will only be discussing conditional statements that are made up of two propositions. So, something like this:

`If it's raining outside, I'll take a leave`

Both the clauses in this sentence are propositions. So we can assign a variable to each of the proposition. So,

`P: It's raining outside`
`Q: I'll take a leave`

## Implications

Implication means that if one thing exists then other thing is also there. Most people, including me, at some point of time, have confused implication with causation. Implication is not causation. Consider our last example in the form of implication:

`If P, then Q`

This means P implies Q. This doesn't mean that P is causing Q to occur. It just simply means that if P is there, then Q is there. Let's consider an English sentence example which will strengthen our understanding of this.

`If we have direct sunlight, then sun is above the horizon`

(I have stolen this example from wikipedia [entry](https://en.wikipedia.org/wiki/Necessity_and_sufficiency)). Again, assiging P and Q to them:

`If P, then Q`

while P = we have a direct sunlight
and   Q = sun is above the horizon

This can also be written as:

`P IMPLIES Q`

or

`P only if Q (will discuss later)`

This last statement can be confusing to some. Atlast it was for me, for some time. This statement suggests that Q is necessary for P to exist. That is, having the sun above the horizon is necessary for direct sunlight to fall on earth. Sure, it might be that there are clouds and there's no sunlight falling on earth still. But if there's no sun above horizion, there's no way to have direct sunlight whatsoever. Note that, we can now observe that last statement (which can actually be written as ~Q -> ~P) is logically equivalent to saying P IMPLIES Q. Hence, we just proved that a conditional statement is logically equivalent to its contrapositive.

Similarly, P is sufficient condition for Q to happen. In other words, P guarrantes Q. That is, if P is there, we are sure that Q would be there.

This example was a bit easy to understand because we know that if sun is above the horizon, we cannot have direct sunlight.

Let's get back to our first example:

P: It's raining
Q: I'll take a leave

In this example, it's promised that "IF" it's raining, I'll take a leave. Note that, I didn't promise that if it's not raining, I will not take leave. The only way my promise would be broken is when it's raining and I do not take a leave. Let's think of which condition is sufficient/necessary in this case. This example is little bit harder because our intuition makes us think of P as the cause of Q. While the truth is that they are just things that happen to occur if some conditions are met. So, `leave has been taken` is a necessary condition for `it's raining`. Sure, it might happen that leave has been taken but it's not raining such as when the user is sick or when there's a solar eclipse. But what I am trying to say here is that `leave has been taken` should necessarily be there if `it's raining`. If we think negatively about it, it means that if leave has not been taken, then it must not be raining. This is actually the contrapositive (~Q -> ~P) of our original statement P -> Q.

## If and only if

Logically equivalent statements have a `if and only if` relation between them. This means, that if there are two statements P and Q, and P is necessary and sufficient condition for Q, then they are both logically equivalent; we can replace them with each other when doing proofs in Mathematics.

## Material implication