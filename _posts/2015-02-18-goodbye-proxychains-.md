---
layout: post
title: "Goodbye proxychains !"
description: "Alternatives to using proxychains or tsocks"
category: linux
tags: [network, tsocks, proxychains, tunneling]
---
{% include JB/setup %}

I have this weird, not so straight mechanism to use Internet. I have a server in
the Internet/Cloud that I am almost always logged in. I use this server to
create a SOCKS proxy on my local and then use Internet via this SOCKS proxy.

And then I would use proxychains or proxychains-ng or tsocks with each of the program I
want to use Internet for. This is a bit messy setup but somehow I make
everything work by using these combination of tools. These tools help resolve
the DNS requests made by the program on the remote because my local DNS server
doesn't resolve DNS requests pertaining to Internet.

Recently I found a wonderful tool i.e [sshuttle](http://github.com/apenwarr/sshuttle), this tool would dynamically
change your iptables and would make your computer access Internet if you have a
setup like me, i.e you have a server in the Internet and you want to use
Internet via this server on your local computer. You would then set your
computer to use `no proxy` and it works because it has changed your iptables,
all your packets, DNS requests are being routed through the server and your
application doesn't even know about what's going on in the background. They just
think you are in a `no proxy` environment. This has really made my life very
simple and removed my hard dependency on proxychains/tsocks.

## Installing and Usage

I found sshuttle in my distribution repositories (Fedora), so just an yum
install sshuttle finished the install for me. If you use any other distribution,
it should most probably be in your repositories but even if it is not present you
can go to [sshuttle](http://github.com/apenwarr/sshuttle) website and download
it from the github website.

Then a simple command like following should do the trick for you :

`sshuttle --dns -vvr username@host 0/0`

If you are curious about these flags, you can read a much more detailed
information about using these flags and many others on sshuttle website.


