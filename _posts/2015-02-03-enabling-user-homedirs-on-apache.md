---
layout: post
title: "Enabling user homedirs on Apache"
description: ""
category: 
tags: [apache, centos]
---
{% include JB/setup %}

In this I will be talking about enabling user home directories for user accounts
on the server. I will talking specifically about CentOS since it is this OS that
I am using on one of the server I am handling.

As usual, we have to tweak little bit with selinux variables here as if your
selinux is on, it will prevent apache from accessing user home directories, but
first of all you need to enable the homedirs in apache configuration
itself. Depending on your OS, apache configuration file name maybe different. In
CentOS, following is the apache configuration file :

`/etc/httpd/conf/httpd.conf`

You need to look for `mod_userdir.c` ifmodule block and then comment the line
that says `UserDir disabled` and make sure that line `UserDir public_html` is
uncommented. You can rename this from public_html to any directory name you like
but then make sure that your users have that same directory name in their home
directory.

You also need to restart the httpd server after this. Here it goes :

`sudo service httpd restart`

After this you need a selinux rule here, you need to allow userdir from
selinux.

`sudo setsebool -P httpd_enable_homedirs true`

And there you go, usernames on the server should be able to access their
public_html directory via their username suffixed to a tilde character.

## Enabling directory listing

To enable directory listing, you need to again open your
`/etc/httpd/conf/httpd.conf` file and uncomment the Directory tag block for
`/home/*/public_html`. You can find this block right below the changes you made
above when you enabled user homedirs (read above).

Restart the server and you should now be able to have directory listing enabled.

If you are not able to access something, it is probably because of the
permissions, so double check the permissions before looking for help again.

Oh my ! This sysadmin stuff is addicted. ;)
