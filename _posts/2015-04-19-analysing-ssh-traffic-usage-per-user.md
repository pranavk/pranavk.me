---
layout: post
title: "Analysing ssh traffic usage per user"
description: ""
category: linux
tags: [ssh, iptables, highcharts, gnome-soc]
---
{% include JB/setup %}

I often use my computer as a router. My friends would login to my system via
ssh, and use the internet. Sometimes, its the opposite, that is, I login to
their system to access the internet. But most of the time, its me who act as a
router for others, as a internet gateway.

## The problem
I only give ssh account to few of my close friends. I expect them to use
internet only for browsing and not for downloading heavy stuff. But sometimes
they would download heavy stuff and that would drastically affect my internet
experience. I don't want to cut everyone's ssh access. It would have been great
if I could somehow know which user is eating up my bandwidth, and then warn or
deny his ssh access.

## Solution
I googled about if there is any existing tool that would suffice my
requirements. I found few interesting tools like
[iftop](http://www.ex-parrot.com/pdw/iftop/) but the problem with most of them
was that they don't map users with the session. They could only tell me the traffic
mapping to any particular ip addresses. Then, I came across this [blog
post](https://newspaint.wordpress.com/2011/08/02/ssh-traffic-accounting-on-linux/)
by someone which made use of iptables to log the traffic. Again, without
tweaking or writing scripts, it is not possible with iptables to map users
against their respective traffic. The script in above mentioned blog post would
do the necessary tweaking and map the users with their corresponding ip
addresses. Thats really a great way to identify who is eating up your
bandwidth. But at the same time, it is also very time consuming, as too much
manual introspection is involved in this. One has to login to the server
everytime and run `iptables` to see the total traffic usage by any
user. Also, I wanted this information to be available to all my ssh users, so
that they know how much bandwidth they unknowingly might be consuming.

To solve this, the guy in above mentioned post has also provided with another
script that would take the data from iptables per minute, per hour and then feed
this data into a database.

For better analyzing the data, I googled and ended up using
[HighCharts](http://highcharts.com/). It helped me convert that data into
graphs which I could now also show to my ssh
users. HighCharts is a wonderful javascript library for creating charts and
maps.
[Here](https://gist.github.com/pranavk/de5013d779431dbc0058)
is the little hack that I ended up writing to suffice my requirement. This queries the database, and uses
the information to draw nice charts for ssh users according to their usage of
internet. I can now also make these charts public to my users.

To automatically deny their ssh access, I also wrote few bunch of scripts which
checks the last hour traffic usage from the database, and adds an entry into
`/etc/ssh/sshd_config` under `DenyUsers` to deny the ssh access to the user and
then enable the access after few specified hours.

Overall, interesting last few hours spent researching and hacking with last few minutes writing up this
blog post.

