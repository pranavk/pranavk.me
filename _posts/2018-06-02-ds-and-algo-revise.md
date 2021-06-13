---
layout: post
title: "DS and Algo revise"
description: ""
category:
tags: [algods]
---
{% include JB/setup %}

After a long time I decided to revisit all the algorithm and DS stuff
that I learned in undergrads. Here are some notes so that I can get
on the track quickly the next time I am in the same situation.

Started with this wonderful article
[here](http://codeforces.com/blog/entry/57282) on Codeforces. By the
time of this post, I have touched few concepts that I would be talking
about in this blog post.

1) C++ Tricks: The author mentions some very important C++ tricks that I
had no idea about.

I like the error reporting thing that the author has
mentioned. Even though I knew that you can make a macro definition
such that it prints the name of the arguments passed to it, the
kind of use the author has discovered is amazing. The author uses
a macro expansion and a template expansion (meta-programming) such
that a simple call like : print(a, b, c) prints `a = value; b =
value; ...`. You can read more about the usage of single pound and
double pound sign (`#`) in the 'Adanced topic' section
[here](https://www.cprogramming.com/tutorial/cpreprocessor.html). In
brief, the single pound sign (#) is used to put the parameter in the
macro as a string. So whatever is passed to the macro will be pasted
after being wrapped in a `"`. The double pound sign (##) will put the paramter in
the macro as a token (so, no `"` wraps the paramter). When I say
macro, I mean a function, not a simple #define of a variable with a value.

The __builtin_fns functions that the author introduced are great
as well. I knew about __gcd(val1, val2) but had no idea about ffs,
clz, ctz, popcount functions. They seems to be pretty nice things
to employ in real life programming.

I had no idea we can have raw strings since c++11. I can declare a
raw string and store it in std::string as : R"delim(This is a raw
string\n)delim". The escape sequences in this kind of string is not
interpreted and are printed as it is, when printed using cout,
etc. Internally, \n is two characters in this string in comparison to
just one character that we would have got if it was just a
std::string. Note the peculiar brackets inside the inverted commas instead
of outside. I almost missed it the first time I tried it on my
compiler. The "delim" before and after the brackets is useful in some
cases where your string contents contain the closing parenthesis in
which case parser will confuse it with the raw string ending.

2) The second topic talks about maps and sets in general. I know about
them quite a lot, I think, and there's nothing that I found much
useful in that article except this thing - that the lower_bound and
upper_bound have a definition that can be hard to comprehend
sometimes. Here's how you should think about it.

```
1 1 2 2 2 3 4 5
    ^     ^
```

The first arrow above is the lower_bound(2) and the second arrow in
there is the upper_bound(2). Not to mention that this is a binary
search on the array. So, finding a lower_bound or upper_bound takes
log n time which is quite good.

3) The last, but not the least, I learnt something entirely new. The
policy based DS that we have in libstdc++. They are not in the
standard but they can be used by #including <ext/pb_ds/...> This is
amazing really. You can create your custom maps and sets with custom
update policies and container to use.

### What is associative array?
It's where there is an association in the array. Eg: map is an
associative array.

Here's the sample template class:
```
  template<
	  typename Key, // Key type
	  typename Mapped, // Mapped-policy
	  typename Cmp_Fn = std::less<Key>, // Key comparison functor
	  typename Tag = rb_tree_tag, // Specifies which underlying data structure to use
	  template<
	  typename Const_Node_Iterator,
	  typename Node_Iterator,
	  typename Cmp_Fn_,
	  typename Allocator_>
	  class Node_Update = null_node_update, // A policy for updating node invariants
	  typename Allocator = std::allocator<char> > // An allocator type
  class tree;
```

```
Key: string or whatever.
Mapped: If you define it as null, it will behave like a set. If you
define it to something else, then it will behave like a map. Note that
map is implemented using RedBlack tree, so looks in std::map are
O(log(n)). Don't confuse it with hash map which have lookup of O(1). in
STL, they are represented by std::unordered_map; as the name suggests,
the keys are not ordered in that unliked std::map. If you don't want
any kind of association in the container you can just replace "map"
with set. Other variant is multimap and multiset. As the name
suggests, the multi implies that multiple keys can be inserted in that
container. If you want the iterator that can iterate for you on some
key, k, you need to use multiemap::equal_range(k). This will return
the std::pair<iterator, iterator> with first element of the pair
pointing to the start of the range and second element to the end of
the range.
Cmp_Fn: Comparator used to sort the keys.
Tag: You can make this tree use RedBlack tree or splay tree or
avl or whatever.
Node_Update: can be null_node_update or can be set to a policy already
defined by C++ - tree_order_statistics_node_update
```

## Order statistics
The order statistics of a tree is the ranking of its elements in the
ascending order. Eg: the k-th order statistics of a tree means k-th
smallest element in a tree. Yeah, the tree is a binary search tree and
the k-th smallest element means k-th element in the sorted list of numbers.

One can change the red-black tree to store additional information to
be able to find the order-statistics of the elements in O(logn)
time. [Source](https://en.wikipedia.org/wiki/Order_statistic_tree). The
modified RB tree is called order statistics tree. So, this is what the
`tree_order_statistics_node_update` policy I stated above is used
to. It stores additional information in the vertices. It also gives
two additional methods to our `tree` class:

    `find_by_order(k)`
    `order_of_key(k)`

The first finds the element from its order.
The second finds the order of a given element.

### Quick select

Order statistics can also be found by a very clever algorithm called
quickselect. Say you have to find the k-th smallest element. This is a variation of quicksort where you find the
pivot's index and then recursively move to the right or
left of the pivot after comparing k with the pivot index. You would be
able to find the k-th smallest element in linear time this way. The
advantage over order-statistics-tree that I talked above is that
everything happens in-place.

#### Differences with Order statistics tree

Note that the main difference with order statistics tree is the time
complexity. Order statistics take O(log n) time to find the kth
smallest element while quickselect takes O(n). However, creating a
order statistics takes time and extra space. So, there's a tradeoff
here. Also, the order statistics tree is not a normal BST, it's
augmented BST where each of node in the tree contains the number of
elements present in its left subtree. Based on that one can deduce
where to go when looking for kth smallest element. Algorithm is
defined
[here](https://www.geeksforgeeks.org/find-k-th-smallest-element-in-bst-order-statistics-in-bst/).

This was asked to one of my friends at a Facebook interview. He came
up with a quickselect algorithm and got rejected. I guess they were
looking for Order statistics tree.


## Sorting

### Some terms & properties of sorting algorithms

Online - Sorting the list as the items are received. Eg: insertion
sort.

Stable - The relative order of elements whose keys are equal are not
changed.

In-place - doesn't use extra space to sort the elements.


### Bubble sort

A stable sort, in-place, horribly slow, inefficient algorithm. The only
advantage of bubble sort is that the ability to detect already sorted
array is inbuilt into the algorithm. It takes O(n) time if array is
already sorted as compared to other algorithms which does full sorting
even on sorted arrays. Insertion sort is considered better than it
because insertion sort can also detect already sorted array in same
time complexity.

You iterate the array and swap adjacent elements if previous is
greater than the next element. You do this iteration over the array
until no elements are swapped at which point you are sure that array
is sorted. It's a stable sort which is something good.

### Insertion sort

It's an online, stable, in-place algorithm.

You are given an unsorted array. You make a place for sorted array at
the start of the array and keep increasing the higher bound of that
sorted array from 0 to length of the array. That is, you insert the
element one by one into the sorted section of the array until that
sorted section becomes whole of the array. [Wikipedia](https://en.wikipedia.org/wiki/Insertion_sort) has nice gif
for this.

Complexity is O(n2), same as bubble sort.

### Selection sort

You find the minimum element and put that on the top of the
array. This [animation](https://en.wikipedia.org/wiki/Selection_sort)
should help.

This is an unstable algorithm but can be made stable somehow (I don't
know how).

Time complexity is again O(n2).

### Merge sort

Time complexity is O(nlogn). This is a divide and conquer sorting
algorithm. You divide the array into two and then recursively sort
those arrays. When you have the two sorted arrays, you merge them
using a procedure that does it in O(n) time. Therefore, O(nlogn)
complexity.

It's also a stable sort algorithm but doesn't sort in-place. Requires
O(n) auxillary space to do the merge procedure.

One application of merge sort is in sorting linked lists. Since the
merge procedure of the merge sort doesn't require random access to the
elements, linked list doesn't become an overhead for the merge
procedure. On the other hand, quick sort requires a lot of random
access, so if elements are given in a linked list, then you will end
up increasing the overhead because everytime quicksort wants to access
some random element somewhere, you have to traverse the linked
list. In other words, you can read the application [here](https://www.geeksforgeeks.org/merge-sort/).

### Quick sort

You partition the array using a pivot element. You sort all the arrays
less than the pivot element to the left and greater than pivot to the
right. The choice of the pivot element is really important
here. [This](http://theoryofprogramming.com/2015/01/20/quick-sort-algorithm/)
person explains this concept very well and also introduces some
methods of partitioning such as Dijsktra 3-way partitioning where you
partition the array into three parts with the middle one holding
elements equal to the pivot. Dual pivot is when we choose two pivots
and divide the array into 3 parts. Again, the above link does a good
job in explaining this stuff.

This is an unstable algorithm.

There are few subtle points here that one need to be careful about
coding - the corner cases. As mentioned in the link above, we choose
the middle element as the pivot and then swap it with last element
before doing our quicksort operation. In the end, assuming that i was
set to 0 and j was set to the element just before the pivot, we are
supposed to swap the ith element with last element because it's
guaranteed that any element at ith position, after i becoems greater
than j, is greater than the pivot; so, swapping ith position will keep
the new position of the pivot in its correct position.

### Heapsort

You create min-heap or max-heap. Then you take the elements out from
the heap one by one.

This is also an unstable algorithm.

### Bucket Sort

It's a sorting algorithm such that you take the numbers and put them
in separate buckets. After all the numbers have been put in separate
buckets, you take each bucket and sort them further (using insertion
sort or whatever). Then you take all the numbers out of the bucket
print them (all numbers are printed in sorted order now). This video
screenshot helps with the [imagination](https://youtu.be/geVyIsFpxUs?t=4m58s).

Complexity:
O(n) is required to visit all the numbers. And there's some constant
amount of time required to sort numbers in each bucket. Let's ignore
that. But during concatenating, we require O(r) where r is the numbers
of buckets. So, the total complexity is O(n + r). This implies that
when the numbers are dense, then our complexity would be O(n) as r
would be less than n. But when the numbers are sparse, then the
complexity would be O(r) which is bad.

### Radix Sort

There are two types of radix sorting:

1) MSB radix sort
   Let's assume our elements are either string or numbers. In this
   sorting, we take the MSB of each element and then put them in a
   r buckets (yes, much like bucket sort). Then we take each bucket and
   recursively sort them.

   Complexity: We take O(n) time to iterate through all the
   strings/numbers, and then we do this thing L times, where L is the
   length of the longest string. Therefore, O(nL) is the complexity.


2) LSB radix sort

   Let's assume the elements to be numbers here. We take their LSB
   digit and then do bucket sort on the elements. We concatenate them
   and then do bucket sort again on their tens digit. The key here is
   that the bucket sort we do here should be stable (that is two equal
   elements should remain in the same order after the sorting).

   Complexity: O(n) time to iterate through numbers. Then O(r) time to
   concatenate all the numbers from the buckets to form an array. And
   we do whatever said above L times where L is the length of the
   longest string. Therefore, O(L(r + n)).


This is an excellent
[source](https://www.cs.cmu.edu/~avrim/451f11/recitations/rec0921.pdf)
if you are looking for different wordings for bucket, radix sort as I
explained above.

## Trie

Trie is kind of on-the-fly MSB radix sort since when we are constructing
the trie, we are putting each character into the buckets and then
doign the same for the next MSB.

It's called a prefix tree DS. It's a kind of search tree. One
can store keys in there and then look them up by the key's prefix. Eg:
In case the key is std::string, you can have a trie with each node
containing separate characters of many strings. It's easy then to find
all the strings with a given prefix. It's used in dictionaries.

The compressed tries are when you compress all the nodes, which are the
only child of their parent, into one node. They save up some space.

```
    e - l - l - o
  /
h - a - t
      \
       v - e
```

Compressed would be this:

```
            *
           /
        (ello)
         /
* - h - * -(a) - * - (t) - *
                 \
                 (ve)
                   \
                    *
```

Radix tries are compressed tries with radix r (r is power of 2). When I say radix, r, it
means that we make a r-way decision at one point of time. Eg: If r =
2, then we make a 2-way decision. This can be related to the number of
bit comparison made to make the decision. If r = 2, then we are
comparing 1 bit at a time to make our decision. If can be either 0 or
1, therefore, there are two ways to make a decision. If r = 4, that
means, we are making 4-way decision by comparing two bits at a
time. In above examples, in uncompressed tries, we were making a
26-way decision which is not a power of 2. So that wasn't a radix tree
at all.

PATRICIA ties - Practical Algorithm To Retrieve Information Coded in
Alphanumeric. They are the radix tries with radix = 2 that
is there are atmost two branches of a node [Source](https://cs.stackexchange.com/questions/63048/what-is-the-difference-between-radix-trees-and-patricia-tries).

## String pattern matching

String pattern matching problem is finding a particular pattern in a
string. So, you are given a pattern, `pat`, and a string `string`. You
find if `pat` is a substring of `string` or not.

### Naive approach

The most simple approach is to iterate through `string` and then for
each element, compare them with elements of `pat`. If length(`string`)
is m and length(`pat`) is n, then it would take O(mn) time to do this
kind o thing.

### Robin Karp

This makes use of hashing to reduce the complexity. It finds the hash
of the `pat` (length n) and then finds the hashes of each substring of
`string` of length n in O(n) time by sliding the window to the right
one by one.

Eg:

Let's say that `string` is this:

`Hello word`

and `pat` = 'Hell'

Then we first find hash of `Hell` and then we process the string
`Hello world` such that we have hashes of each substring of length n
there. Let array, `arr`, be the one containing hashes of substring
starting at index i. To find the hash of substring start at index, i +
1, we just derive it from arr[i] and `string[i + 1 + m]`. This is a
nice video that shows
[this](https://www.youtube.com/watch?v=H4VrKHVG5qI).

Complexity: We preprocess the pattern `pat` in O(n) time and
preprocess the string `string` in O(m) time. To find if pattern is in
the string, we take O(m) time - we compare if any of the hash of the
string matches to that of the pattern.

### KMP

This is another string pattern matching algorithm that takes O(m)
time, where m is the length of the string. Here, we just iterate over
the given string and never look back. This is possble by preprocessing
the pattern given. We find the LPS (longest proper prefix which is
also a suffix) of the pattern. And then use this LPS array to do
efficient pattern matching in a given string. So, this really consist
of two sophisticated algorithms:

1) Finding the LPS of the pattern. I find this to be harder than
actually using the LPS to see if pattern is found. Best resource for this is
[here](https://www.youtube.com/watch?v=tWDUjkMv6Lc). It's really the best.

2) Using the LPS to find the pattern. The punchline here is that once
you find out that your string character didn't match with the pattern,
you move the pointer on the pattern string back according to what the
LPS array says. Whenever you find a
mismatching character, you do not need to go all the way to the start
of the pattern to look for string again. You have already compared
suffix upto this point. Now if someone tells you that this is also a
prefix of the pattern, then you can use this information to just start
comparing from where the prefix ended.

### Suffix tree

Above approaches such as KMP preprocess the pattern and then iterate
over the string of length. Therefore, they are O(m).

What if we have multiple small length patterns (n is small), say k patterns,
and length of our string, m, is huge. It would take O(km) time.
Instead in such a case, we can preprocess the string itself and then
for every pattern, we use the preprocessed string. Finding pattern
would then take O(kn). If n << m, this is quite efficient.

Suffix trees is one such DS. Here, you create a tree consistin of all
suffixes of the given string. So if you are given "banana", the
suffixes will be:

```
banana
anana
nana
ana
na
a
```

We then use these suffixes and create a trie out of it. When someone
gives us a pattern, `pat`, we traverse this tree and see if we reach
a leaf node or not. If we did, pattern is found otherwise not.

This is a O(N^2) algorithm by bruteforce as you are considering every
possible suffix of the text of length N.

There's a very clever algorithm called Ukkonen's algorithm that does
this job in O(N). Check this
[video](https://www.youtube.com/watch?v=aPRqocoBsFQ) by Tushar. It's a
really long video.

## Tree traversals

### DFS

1) Take extreme care that you do not revisit the nodes already visited.

### BFS

1) BFS is like Dijskta except that weight of the edges is considered
one.

2) You can find the depth of a node in a tree using BFS by inserting
null nodes. [Here](https://stackoverflow.com/a/31248992/1174984) you
can find how.

3) Take extreme care that you do not revisit the nodes already visited.

### Pre-order (NLR)

The pre means that root must come before all.

### Post-order (LRN)

The post means that root must come after all.

### In-order (LNR)

The root comes in the middle.

## More Trees

### BST

Note that BST just doesn't say that element to the right should be
greater. It says that all elements in the right subtree should be
greater than it. There's a huge difference.

### Red-Black trees
These are the self-balancing trees that follow some properties
following which helps it to keep itself balanced leading to improved
insertion, deletion, and lookup. They are called red black trees
because unlike BST, their nodes have additional characterstics such as
color which can be either black or red. And then there are some
constraints that apply to the arrangement of those nodes. Everytime
when we insert or delete the node, we check if constraints are
voilated. If yes, we fix them and after we fix them, we automatically
get a balanced tree.

### Segment trees

Segment trees are BSTs where you *create* intervals of the array
indexes and form a BST out of it with highest/lowest/sum values in the
nodes. This is best explained
[here](https://www.youtube.com/watch?v=ZBHKZF5w4YU)

### Interval trees

Interval trees are similar to segment trees except in this problem
statement includes the interval and you are asked to find the interval
which matches with the given interval. You create a BSTs with lower
member of the interval as the key to the BST.

This is nicely explained [here](https://www.youtube.com/watch?v=q0QOYtSsTg4).

## Graphs

### Dijsktra

It's for finding shortest path in a graph from given source to
target. It doesn't work when edge weights are negative.

You make use of priority queue that contains the distance of nodes
from the source. You pick the first element from the priority queue
and then start exploring nodes from there until all nodes are
complete.

### Prim

This is for finding the minimum spanning tree (MST) of a graph. It's
similar to Dijkstra except in priority queue, you put the edges
prioritised by the weight of the edges. Take the element from the
queue (with the minimum weight) and then visit the node on the other
end of the edge. By visiting I mean, add its edges to the priority
queue.

#### Implementation of Prim and Dijkstra

It's really easy to implemenet these using STL priority_queue. You can
initialize std::priority_queue like this:

`std::priority_queue<int, std::vector<int>, std::greater<int>>`

The template is something like this, if it helps:

```
template<
	class T,
	class Container = std::vector<T>,
	class Compare = std::less<typename Container::value_type>
> class priority_queue;
```

One gotcha here is that providing std::less to the priority_queue
(which is actually the default) places the highest element on the
front. Yeah, it's the reverse. If you want to place the smallest
element on the front, you need to explicitly provide std::greater<int>
in there as third argument to template instantiation.

Or you can give your custom comparator something like this:

```
auto compfunc = [](int a, int b) {
     	      	       return a > b; // this '>' sign creates min-heap
     	      	}
std::priority_queue<int, std::vector<int>, decltype(compfunc)> pq(compfunc);
```

### Hamiltonian Path/Cycle

Path that visits each vertex in a graph exactly once. A Hamiltonian
cycle is a hamiltonian path that is a cycle. This problem is
NP-Complete. The graph is called Hamiltonian if it has a Hamiltonian
cycle.

There are some theorems that can tell you if a graph has a hamiltonian
circuit. These theorem, but, only provide you with sufficient
condition. Necessary conditions are not provided which means that
given a graph you can say that graph has a H circuit if some condition
exist but you cannot say when a circuit won't exist. One such theorem
is [Ore's
theorem](https://en.wikipedia.org/wiki/Ore%27s_theorem#Formal_statement)
which if satisified by a graph, then we can find the Hamiltonian cycle
in O(n^2). Such a graph is called Ore's graph.

It's common sense that if there's any articulation point or bridge in
a graph, then there's no hamiltonian cycle existing in the graph.

### Euler Path/Cycle

Path that visits each edge in a graph exactly once. A Euler cycle is
that Euler path which is also a cycle that is start and end at same
vertex. This problem is P. It can be solved in O(V + E). A graph is
called Eulerian if it has a Euler cycle and called semi-Eulerian if it
has only an Eulerian path but not cycle.

There are some mathematical theorems for finding euler
paths/cycle. These theorems give you both necessary and sufficient
condition for existence of euler path and cycle in a graph.

Note that in Euler Path/Cycle, you can visit a single node multiple
times while you cannot do this in Hamiltonian path/cycle. One would
think that reverse could be applicable to Hamiltonian, that is, you
could visit same edge multiple times but that doesn't make sense
unless one edge is being connected to more than two nodes (which is
indeed non-sense).

More information alongwith relevant theorems which tells when a euler/hamiltonian
circuit or path exist in a graph can be found [here](https://www.geeksforgeeks.org/mathematics-euler-hamiltonian-paths/)

### Travelling Salesman problem

It's similar to finding a Hamiltonian cycle except that you have a
weighted graph and you have to find the shortest Hamiltonian
cycle. Also, unlike Hamiltonian cycle, this problem is NP-hard, not
NPC, that is, solution to TSP cannot be verified in polynomial time
unlike Hamiltonian cycle. This is because if you are given a solution
to TSP, then to verify that it is indeed the shortest, you have to
solve TSP which is known to be NP-hard. On the contrary, given a
solution of a hamiltonian cycle, you can easily verify it in
polynomial time; therefore, it's NP-Complete. See section on 'P vs NP'
on this page for more details.

This is a NP-hard problem. Naive approach gives O(N!) time but with
DP, you can reduce it to O(2^N * n^2). The solution is described very
well in this [video](https://www.youtube.com/watch?v=-JjA4BLQyqE).

### Articulation point

It's a vertex that when removed from the graph disconnects the
graph. [Here](https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/)
is an algorithm to find the articulation points in the graph.

### Bridges in a graph

Bridges in a graph are edges that when removed disconnects the
graph. More
[details](https://www.geeksforgeeks.org/bridge-in-a-graph/) are here.

### Strongly Connected Components

A subgraph is a strongly connected component of a graph if all the
vertices in the graph are reachable from each other. It uses a very
clever algorithm. Below algorithm is Kosaraju algorithm which is like this:

1) Do a DFS on each of the vertices and store the vertices by their
"finishing time" into the stack. So, store the vertex in stack after
all its edges have been explored.

2) Then reverse the graph

3) Now do a DFS again but use the order of visiting each of them from
the stack used above.

[This](https://www.youtube.com/watch?v=RpgcYiky7uw) is an excellent
video that shows the concept.

This can also be used to find the cycles in a graph. If there's any
strongly connected component with more than two vertices, we have a
cycle in our directed graph.

Complexity: Complexity of this algorithm is going to be O(V+E). We
take O(V+E) to do the first DFS on the graph. Then again, V+E to
reverse the graph. And then again V+E to do the third DFS.

### Finding cycles

You can either find cycles in an undirected graph or directed
graph.

#### Undirected graph

You can use Disjoint set DS to find the cycles in an undirected graph
as explained [here](https://www.youtube.com/watch?v=n_t0a_8H8VY).

#### Directed graph

You can do a DFS and then check if any node is trying to reach to the
node which is already being explored. In other words, if white is a
set of nodes not yet explored, gray - exploring and black -
explored. Then if you find a gray node reaching out to another gray
node, then it's a cycle. This is going to take O(V + E).

Another way would be to find the SCC. If any component contains more
than 1 element, then you have a cycle in the graph. This is done by
Kosaraju algorithm which takes O(V + E). See "Strongly connected
component" section on this page for more details.

You cannot make use of Disjoint set DS to find the cycles
here. Disjoint set is only for undirected graph.

### Topological sort

What's a topological sort. It's a sorting of vertices in a graph such
that if (u, v) is an edge in the graph, then u always preceedes v in
the topological sorting. Other vertices which are not constrained by
this can be any order. Hence, there are multiple topological sorting
available. You can only have topological sorting a DAG. It's not
possible to find a topological sorting if you have a cycle in your
graph (it doesn't make sense if you think about it).

There are two ways to find the topological sorting:

#### DFS + Stack

It's possible to find a topological sorting using DFS and a stack. You
iterate through all the unvisited vertices and then call DFS on each
of them (and you pass a stack to the DFS function). When all the
edges of some vertex has been explored completely, you add that to the
stack. The ordering of vertices in the stack gives you the topological
sorting.

#### Use indegree theorem (Kahn's algorithm)

There's a theorem out there that says that a DAG has atleast one node
with in-degree zero and one node with out-degree zero. Using this
concept, we can design an algorithm that gives us the topological sort
of any DAG. We first create a hashmap of all the nodes mapping to
their indegress and then we create a container containing nodes which
have indegree of zero. We pick the node with indegree of zero and then
remove that node from the graph which means decreasing the indegree of
other nodes attached to this node. This gives us a set of new nodes
with indegree of zero. We pick again one of them and then keep on
doing this until all the vertices are picked this way. The ordering in
which we picked the vertices is the topological sorting.

This way to find the topological sorting is also useful to find all
the topological sorting of a graph. You can run a loop in a recrusive
function that first chooses vertices of zero indegree, modify the
other vertices and then recursively call itself. See topsort.cpp

### Graph coloring

Lately, I have been reading a lot of compilers and graph algorithms,
especially graph coloring, come up too often in compiler construction.

It's an NP-complete problem where you are supposed to color a graph
with m colors such that no two adjacent vertices have the same
color. There are few concepts here that are important to clear before
we dig deeper.

#### Proper coloring

Coloring a graph such that no two adjacent vertices have the same color.

#### Planar graphs

These are the graphs whose faces can be embedded on a plane paper. Or in
other words, no two edges in the graph should cross each
other.

#### Chromatic number

This tells the minimum number of colors required for proper coloring
of the graph. Different graphs have different chromatic numbers.

#### Dual of a graph

Dual of a plane graph G is a graph G' where each vertex is treated as the
face of the graph G. In Wikipedia words, a dual graph of graph G is a
graph that has a vertex for each face of G. Interesting thing about
them is that if you try to find the dual of this new graph G', you
will get back the original graph. That's why they call it a dual.

#### Four color theorem

This theorem states that given a planar graph, no more than 4 colors
are required for its proper coloring.

### Complete graph

A graph in which every vertex is connected to every other vertex.

### Clique of a graph

Clique in English means group of people who are connected among
themseleves and do not allow other people to join their group easily.

Clique in a graph means a subgraph which is complete.

### Complement of a graph

Complement of a graph G is the graph H in which each vertex is
adjacent iff each vertex is not adjacent in graph G. So, just fill
those edges required to form a complete graph. Of course, complement
of a complete graph will be a null graph or an edgeless graph.

### Perfect graphs

Graphs where the chromatic number of every induced subgraph equals the
size of the clique.

These are very important in the sense that for many of the graph
related problems like graph coloring, etc., which are NP-Complete in
general can be solved in polynomial time.

#### Chordal graphs

Graphs where each cycle of length >=4 has a chord. See this image on
[wikipedia](https://en.wikipedia.org/wiki/Chordal_graph). It's a
perfect graph, so it has a polynomial time complexity for graph
coloring problem.

##### Use of chordal graphs in compilers

SSA form has two properties - minimality and dominance property. Due
to the dominance property, each live range intersection actually
results in a chordal graph which means that for register allocation,
we can actually use the polynomial time graph coloring algorithm.

## Convex hull

It's also called a gift wrapping algorithm as you are supposed to wrap
a random distribution of points in a convex
polygon. [This](https://www.youtube.com/watch?v=ZnTiWcIznEQ) video
explains it very nicely.

There are basically three ways.

First is Jarvis March algorithm. Other is Graham Scan and then Chan's algorithm.

## Disjoint sets

[This](https://www.youtube.com/watch?v=ID00PMy0-vE).

There are two techniques that one can use to make the algorithm more
efficient. First is the path compression and second is union by rank
or size.

Complexity: This makes use of my favorite function, Ackermann
function. Without path compression and union by rank/size, the
worst case complexity can be O(n) where with both path compression and
union by size/rank, the complexity reduces to O(a(n)), where a(n) is
the inverse ackermann function which grows very very slowly. [Here](https://twitter.com/pranvk/status/1051280575862988800) is
my tweet regarding it. So, yeah, for all practical purposes, the union
and find operations are actually O(1).

## Number Algorithms

### GCD of two numbers

GCD is greatest common divisor. Given two numbers, we can find the GCD
of these numbers such that gcd divides both the given numbers.

There's a std::gcd in c++17 now.

There are various ways to find the GCD of a numbers.

#### Basic method (Factorization)

To find the GCD(a, b), we can do prime factorization of a and b and
then take the common prime factors out. Multiplying those common
factors will give us the greatest common divisor such that it divides
both the numbers. The complexity of such an algorithm would be O(n),
where n is the numbers. So it's a pseudo-polynomial time algorithm.

#### Euclid algorithm

Euclid devised a very intelligent algorithm that can find the GCD of
two numbers efficiently. The original algorithm that Euclid gave was
based on substraction as explained
[here](https://codility.com/media/train/10-Gcd.pdf) but the improved
version uses division to find the gcd. The code can be found in
numbersalgos.cpp in my test directory. The above document from
codility explains it in very much detail.

Complexity of euclid's algorithm is bit tricky to understand. For the
purpose of this article, you can assume that `O(log min(a, b))` is a
good upper-bound.

#### Extended Euclid algorithm

Extended euclid algorithm, besides calculating the GCD, is also able
to calculate the integers x, and y, such that ax + by = gcd. This is
used to find the multipicative inverse as explained later.

Simple demonstration of how to find such numbers x and y is shown
[here](http://www-math.ucdenver.edu/~wcherowi/courses/m5410/exeucalg.html). We
are using back-substitution here to find the integrs x and y.

Instead of back-substitution, it's possible to find the intermediate x
and y and then use those intermediate values to find the final x and y
integers as you can see
[here](https://www.geeksforgeeks.org/euclidean-algorithms-basic-and-extended/)
at the end of the page. Simple derivation can tell you how to relate
the final x and y values with intermediate ones.

#### Multipicative inverse modulo

Simply explained
[here](https://www.geeksforgeeks.org/multiplicative-inverse-under-modulo-m/).

#### LCM

To find the LCM(a, b), there's a simple formula like this:

LCM(a, b) = (a.b)/gcd(a, b)

Another relation that can come in handy is chain LCM formula like
this:

LCM(a, b, c, ...) = LCM(a, LCM(b, LCM(c, ...)))

There's a std::lcm in c++17 now.

## Popular problems

### Subset sum problem

Given an array, and value `sum`, you have to find the subset of the
array which sums to `sum`. There are two solutions here - first is a
simple backtracking solution that will have O(2^n) complexity, where n
is the size of the array. The other solution is the dynamic
programming solution which is well described [here](https://www.youtube.com/watch?v=s6FhG--P7z0).

Check the subsetdp.cpp and subset.cpp files for code.

## P vs NP

This is also a very important concepts for someone who's studying
algorithms. I will talk only about the most
important classes here. Before I talk about these, let's visit another
important concept about Turing Machine.

Turing Machines are theoretical, abstract machine that is used as a
mathematical model of computation. There are two types.

1) Deterministic: These are the machines which only have to make a
single decision at any point of time. They won't be able to "guess"
among different choices unlike Non-deterministic TM.

2) Non-deterministic: As said above, these machines are able to
"guess" which choice to make to be able to reach an accepting state or
to be able to find the solution. These are not real machines because
of obvious reasons - a real machine cannot make such "guesses". That's
why when we say "solvable in polynomial time", we mean solvable in
polynomial time on DTM not NTM. DTM are something which is more close
to real machines we have. [This](https://stackoverflow.com/questions/13524011/i-do-not-understand-the-concept-of-non-deterministic-turing-machine) explanation is helpful too.

Note that it's completely possible to do what you can do in NTM in a
DTM as well but in a DTM it will take exponential or who knows even
more time than in NTM. Eg: The subset sum problem can be solved in
polynomial time in NTM but it can also be solved in DTM using
recursion and backtracking in exponential time.

Now lets talk about the class of problems.

1) P: These are the problems which can be solved in polynomial
time. Or these are the problems which can be solved on a deterministic
turing machine in polynomial time.

2) NP: These are the problems that can be verified in polynomial time
on a deterministic turing machine. But they cannot be "solved" in
polynomial time on a DTM; however, they can be solved in polynomial
time on a NTM.

Now, the important thing to note here is that P is a subset of
NP. That is, all problems that can be solved in polynomial time can
also be verified in polynomial time. When I say verified, I mean the
solution to these problems can be verified in polynomial time.

A common question arises now, what are the problems in set NP - P,
that is problems that can be verified in polynomial time but not
solved in polynomial time. Subset sum problem is one - given a subset
and a sum, you can find if the subset is a solution to subset sum
problem or not. However, as we know, it's not possible to find
solution to this problem in polynomial time.

3) NP-hard: A problem H is called to be in NP-hard if any problem, L,
in NP can be reduced to H. Eg: Travelling Salesman Problem (TSP) is
NP-hard. You can neither solve the problem in polynomial time nor
verify the solution in polynomial time to this problem but you can
reduce any problem in NP to TSP in <b>polynomial time.</b>

Let's recall what TSP is. TSP is when given a list of cities, you have
to find the shortest path covering all the cities and then coming back
to the origin. Let's see if we can verify the solution in polynomial
time (yeah, we are trying to prove that it's a NP problem). If we are
given a path, how do we know that it's the shortest one. To know that
it's the shortest one, we have to solve the problem first which is
known to be non-polynomial already. Hence, this problem is not in
NP. Therefore, it's
NP-hard. [Here](https://eklitzke.org/the-traveling-salesman-problem-is-not-np-complete)
is very good description of the thing I just said.

4) NP-Complete:
   Talking in general, any C-Complete problem, A, means that any problem
   in class C can be reduced to A via <b>polynomial time</b>
   reduction. Therefore, a NP-Complete problem means that any problem
   in NP can be reduced to it in polynomial time. [Here](https://en.wikipedia.org/wiki/Polynomial-time_reduction#Completeness) is wikipedia page talking about
   Completeness in general.

   Boolean satisfiability problem is the first proven NP Complete problem.

   Note that the definition of NP-Complete is exactly same as
   NP-hard. That is, any problem in any of these means that any
   problem in NP can be reduced to them in polynomial time. Then
   what's the difference? The difference is that NP-Complete problems
   need to be in NP while NP-hard need not to be. NP-hard need to be
   even decidable.

   One another important thing to note is that all problems in NP need
   to be decidable. There are problems out there like
   [this](https://cs.stackexchange.com/questions/1887/why-isnt-this-undecidable-problem-in-np)
   that are undecidable but whose solution can be verified in
   polynomial time. They are in NP-hard just because they are
   undecidable. We will learn more about what's decidable and not in
   next section.

   Other problems that are NP-hard but not complete. Eg: Halting
   problem. In fact, this is an undecidable problem. That is, you
   cannot come up with an algorithm (and tell how much time it's gonna
   take) to solve this halting problem.

   Whatever I wrote above can be summed up using a simple Venn diagram
   as shown [here](https://en.wikipedia.org/wiki/NP-hardness).

   Those problems which are in NP but neither NPC or P are called
   NP-Intermediate. All these problems, as per the definition of NPC,
   can be reduced to any problem in NPC. [See] this for an example of
   converting a Integer Factorization problem (which is NP
   Intermediate) into SAT (which is NPC).


## Decidablity vs Undecidablity

   No one can explain this thing better than
   [this](https://www.youtube.com/watch?v=RiDzt22KUd8) guy. So just
   click here.
