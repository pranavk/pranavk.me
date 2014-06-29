---
layout: post
title: "Disable your NVIDIA card in Linux"
description: ""
category: linux
tags: [linux]
---
{% include JB/setup %}

My NVIDIA graphic card on my linux box had already given me alot of pain. I
couldn't resist seeing my laptop fan going wild and my laptop going excessively
hot even during normal operation. I knew that all this is due to the NVIDIA
graphic card I have. Since, I do not use my graphic card much, I decided to turn
my graphic card off permanently on my fedora 20 box.

[bbswitch](https://github.com/Bumblebee-Project/bbswitch) module helped me alot
in accomplishing this. But before using this module I had to disable the inbuilt
nouveau driver for NVIDIA card that is already shipped with the linux kernel for
NVIDIA card. nouveau is an open source graphic card driver for NVIDIA
cards. Disabling it means I need to blacklist it. On my Fedora 20 box, I added
following file in

`/etc/modprobe.d/blacklist-nouveau.conf`

Just add following line in the above mentioned file.

`blacklist nouveau`

Remember to generate initramfs image after doing this, so that your kernel knows
about the change the next time you reboot. You can generate the new initramfs
image as :

`dracut -f`

Reboot your box and your nouveau driver is not loaded this time. You can double
check that using the following command :

`lsmod | grep nouveau`

If you still see nouveau in the output, there is some problem and the driver is
not unloaded successfully. Re-check the instructions above. There shouldn't be
any problem if you followed them accurately.

The next step is to download the kernel-devel package for your current
kernel. You can do that as :

`sudo yum install kernel-devel-$(uname -r)`

This downloads the necessary kernel files to build modules for this kernel. You
can now download the [bbswitch
module](https://github.com/Bumblebee-Project/bbswitch) from github. Download the
zip file. Extract it. cd to the its extracted directory. Hit

`make`

It will successfully make the bbswitch kernel module if kernel-devel packages
are installed for your kernel version.

After this point, you can load the kernel module explicitly using

`sudo make load`

It will load the bbswitch module if nouveau is disabled. You can see the results
using :

`dmesg`

Loading the module doesn't mean your NVIDIA card is off now. To do that you have
to enter the following :

`sudo tee /proc/acpi/bbswitch <<< OFF`

It will turn off your card. Again to see the resulsts you can run `dmesg` and
see the latest output of the command. If there is some problem in disabling the
driver, the output of `dmesg` will tell you that.

## Disabling card on boot
If you don't want your NVIDIA card at all, you can turn off your card at every
boot. bbswitch module should be loaded at every reboot for this to happen. To
load the bbswitch module at every reboot, create a file as :

`/etc/modules-load.d/bbswitch.conf`

with the following content

`bbswitch`

Also create another file as :

`/etc/modprobe.d/bbswitch.conf`

with content as :

`options bbswitch load_state=0`

This makes sure that whenever the bbswitch module is loaded, the card is turned
off automatically so you won't have to edit `/proc/acpi/bbswitch` manually.

For above things to work, there is another thing you need to do. modprobe should
be able to find the bbswitch module you just built. By default modprobe looks
for the modules in :

`/lib/modules/<kernel version>/kernel/`

So copy your `bbswitch.ko` file to the above mentioned directory. Now to refresh
the database, you need following command :

`sudo depmod -ae`

Now to check if `modprobe` finds the bbswitch, you can check this via :

`modprobe bbswitch`

If it finds the bbswitch module, it will output nothing else it will show you
the error saying that it couldn't find the module bbswitch.

After following all the above instructions, your NVIDIA card will automatically
be disabled on every reboot. There is one thing you need to keep in mind here
that you have to follow all the above instructions in case you upgrade your
kernel version. If you want this to remain persistent across kernel upgrades
you can use the DKMS. To know more about it you can refer to the 
[bbswitch](https://github.com/Bumblebee-Project/bbswitch/) README.

Happy hacking !
