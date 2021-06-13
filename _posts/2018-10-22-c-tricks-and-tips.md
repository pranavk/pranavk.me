---
layout: post
title: "C++ tricks and tips"
description: ""
category:
tags: [c++]
---
{% include JB/setup %}

## Placement new

This is a variant of new in C++ where you can specify the memory
address where to construct the object. When you use just plain 'new',
there are two things that happen - memory allocation and object
construction in that memory. Placement new separates both of it and
gives the user more control by allowing the user to specify the
address where object will be constructed. This is useful when you
don't want to waste time allocating memory such as garbage collector
and all that stuff.

## Special member generation in C++11

Scott Meyeres Item 17, last page.

However, here's the brief summary of what they want to say there. The
rational is that if you are trying to manage the resources yourself in
either destructor or copy or move ctor/assignment operator functions,
then the compiler cannot generate the other special member functions
for you. However, this rationale is not followed in C++98 and in some
cases in C++11 because they wanted to be backward-compatible. Eg: If
you are declaring a destructor, then it means that the default-way of
generating copy operations are probably not correct. Move operations
do follow this rational though. If you declare a destructor or copy
operations, then move operations are not generated automatically
because it suggests that user is trying to do something different, so
default way of generating functions might be faulty. However, if you
think that it's not faulty, you can always use `= default` to ask the
compiler to generate the special member functions the default way.

## Move semantics

std::move() doesn't move and std::forward<T>() doesn't
forward. Basically, they are cast funtions. Former does an
unconditional cast to rvalue and latter does a conditional cast to
rvalue only if the parameter passed to it is an rvalue - the
information whether the paramter is an rvalue is encoded in the
templated paramter to std::forward; so, T encodes whether the param is
lvalue or rvalue. This also means that T needs to have this encoded
information about the type and this is only available when T is a
universal reference in a templated context.

## Ternary expression types

exp1 ? exp2 : exp3

The compiler will try to convert exp3 into type of exp2. If
successfull, it will output exp3 casted to exp2's type.

It happened with me like this:
```
(count != 0 ? count : -1)
```

Type of count was unsigned. So -1 got converted to unsigned and got
wrapped around becoming a large number.

## string_view

`string_view` is a new member of C++ family in C++17. As the name
suggests, it provides a view over a sequence of characters. Therefore,
that sequence can be vector<char>, char a[], std::string, etc. This is
important performance-wise in many cases where we need to, for
example, get the prefix or suffix of a given string. If we have only
std::string at our disposal, we will use the std::string::substr
method to get the substring but with `string_view`, we can
`remove_prefix` or `remove_suffix` functions without doing any memory
allocation (which would be inevitable in std::string::substr). The
other convenience it provides is that you don't have to convert a
stream of characters into a std::string. You can just use
string_view. The benchmarks online shows tremenduous performance
benefits with string_view - 45x in some cases.

## Initailization of variables in C++

There are different types of initialization that happen in C++. There
is default-initialization, value-initialization, and then
zero-initialization.

### Default-initialization

This happens to objects of classes which have do not have a
user-provided constructor, that is, which have a default constructor.

### Value-intialization

This is a two-step initialization or sometimes even one. It depends.

If the class has a default constructor, then it is a 2 step - the
class is zero-initialized followed by default-initialization.

If the class doesn't have a default constructor, it is a 1 step - the
object is merely default-initialized.

### Zero-initialized

This means that the object of classes are initialized with zero.

### Some examples

So,
```
T obj; // default-initialization
T obj{}; // value-initialization
T obj = T(); // value-initialization
static T obj; // zero-initialization and then default-initialization
```

### Peculiar fundamental types

Fundamental types like int, unsigned are different in the sense that
they do not have any real default constructor even though we write
something like this:

`int a = int()`

This simply means that `a` will be value-initialized and a will have a
value of zero. This is antithetical to what we explained above because
`int` doesn't have a default constructor, so it shouldn't have been
gone through the zero-initialization phase as we explained in
value-initialization above, yet it does.

[Some](https://www.geeksforgeeks.org/c-default-constructor-built-in-types/)
[helpful](https://blog.tartanllama.xyz/initialization-is-bonkers/)
links are here.
