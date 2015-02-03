---
layout: post
title: "Setting up a mail server the easy way"
description: ""
category: linux
tags: [sysadmin]
---
{% include JB/setup %}

For past few years, I have been managing the whole server at
[GLUG-NITH](http://glug.nith.ac.in). I installed various servers on that machine
since it was the first server I got my hands to. I tried whole lot of stuff
until one day the SAN space crashed and we had to start from scratch again. We
also had a mail server and it was very urgent to up this since leaving the mail
server in that inconsistent state would mean a lot bounced mails.

We had full fledged mail server previous time consisting of postfix and
dovecot. I used a roundcubemail as frontend as it had a nice UI. But there was a
major security concern with this, the sysadmin having root access can always see
the emails of the members who are given the email address associated with the
server. This time, I thought of taking care of this major security concern and
scrap the whole idea of storing mails on the server. Instead, we can just use
postfix to receive the mail and forward it to the alias that the user
provides. Eg: if you are sending email to abc@glug.nith.ac.in, and the alias for
abc is set to jkl@gmail.com, then as soon as someone sends an email to abc, it
will be forwarded to jkl@gmail.com whenever it arrives on the server.

This also means that we don't have to install dovecot this time, so one more
less software to configure while still providing email functionality to the
users. Postfix use virtual file in /etc/postfix/ to set aliases for various
users. If you want to create someone's account on the server, you just need to
set the alias in this file and then run :

`sudo postmap /etc/postfix/virtual`

This will create a new binary file virtual.db which will be used as a lookup
table whenever someone sends an email to the server to look if the recipient has
an account on the server or not.

So far, its going good but I think it probably needs more configuration and some
measures to prevent it from detected as spam in major mail service providers.

