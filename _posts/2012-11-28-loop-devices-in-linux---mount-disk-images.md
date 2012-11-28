---
layout: post
title: "Loop Devices in linux - Mount disk images"
description: "Mount images in linux using loop devices."
category: linux
tags: [linux mount image loopdevices]
---
{% include JB/setup %}

Well one have programs out there for windows to mount ISO images
etc. to the virtual drive. You can then use those to perform task that
might not be possible without mounting the image. Softwares like
Daemon tools and PowerISO are very good examples of such softwares. 

## Loop Devices
Loop devices are pseudo devices available under linux commonly found
under /dev/ with the name of loopN where N is a number like 0,1,2,3,4
etc.

## Mounting a disk image

You can make use of some commands to attach an ISO image first with
the loop device and then mount the loop device like you do mount any
other device in your computer. 

To revert to the previous state you do the reverse i.e you first
unmount the device and then you detach the image from your loop
device. 

There is this utility `losetup` available in linux systems which is
used to attach the disk image with the loop device. You require sudo
priviliges to do so. Lets assume you have an ISO image in your home
folder with the name `Ubuntu.iso` and you want to mount it like you
have made a DVD or CD out of this image first and reading it then. Do
following :

`sudo losetup /dev/loop0 ~/Ubuntu.iso`

This will attach the ISO image with the loop device. If you are using
a GUI and a file manager like nautilus, you can see that this Ubuntu
is added under devices in nautilus, this is because the nautilus has
subscribed to udev(which is responsible to tell various information
about the attached devices) which keep telling it about the devices
that gets registered with it. 

Finally to mount the device, you can simply click on the device shown
in nautilus to mount it and see its contents, or you can mount it the
traditional way in CLI as :

`sudo mount /dev/loop0 /mnt/`

This will mount your image under `/mnt` and you should be able to read
it.

To revert the whole procedure, first unmount the image as :

`sudo umount /dev/loop0`

and then detach the ISO image from the loop device 0 as :

`sudo losetup -d /dev/loop0`

and you are done. Everything back to normal !! Enjoy mounting images
without any need of external software.