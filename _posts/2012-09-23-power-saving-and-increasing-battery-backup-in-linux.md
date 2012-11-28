---
layout: post
title: "Power saving and increasing battery backup in linux with
nvidia GPU"
description: "The post tells you the ways to increase your battery backup in linux as battery backup in linux is horrible as compared to other OS like windows and MacOS."
category: linux
tags: [ubuntu, fedora, linux, power-saving, battery-backup, heat-problems, increasing-battery-in-linux, linux-battery, nvidia]
---
{% include JB/setup %}

If you are new to linux (any distro like ubuntu and fedora), you might have noticed that battery backup in linux is just beyond horrible. If you used other OS, the same machine that used to give you 4-5 hours of battery backup now suddenly starts giving you battery backup less than 1 hour. Moreover you notice that your laptop starts heating too much beyond the limit to the extend that you never experienced when using other OS. 

I use Dell XPS L502x. My system is a dual boot with windows and other linux flavours. I love to play with my linux but the only thing that used to keep me away from my linux system is the horrible battery backup and horrible heating issues I had with my laptop when using linux. 

## Problem
The most usual problem people have in their laptops due to which their laptop starts heating and consuming more power is their high performance graphic card (nvidia in my case). Nvidia has this wonderful technology called Optimus that turns the card off when the card is not in use in windows, hence consuming less power and emitting less heat. Unfortunately Nvidia has this driver with this technology for only windows and they do not want to write another driver for linux users as they think market here is gonna help them anyway economically since the number of linux users are small. Nvidia has also officially refused to have any such Optimus support for linux platform. 

## Solution
What you can do is to switch off your graphic card manually so that it stops working for the current session in your linux. The battery backup will suddenly increase by more than 150% and you will be having no heating issues at all with your laptop.

## Concept
What we will do here in this tutorial is to insert a custom made module into the linux kernel and then run a script that disables the nvidia chip for the current session. 

## Tutorial
First of all you will need to download this :

`https://github.com/mkottman/acpi_call`

You can download it using git as :

`git clone https://github.com/mkottman/acpi_call.git`

If you do not have git installed in your systems, you can download it as :

`sudo apt-get install git`

or

`sudo yum install git`

Before starting up all of this, I would like to show you the rate at which your battery is getting discharge so that you can see the difference beforeand after running the script.
Run the following command in your terminal to know the rate of discharging. Please make sure that the laptop is not being charged at the time of running this command below otherwise it will show you the wrong information.

`grep rate /proc/acpi/battery/BAT0/state`

Note this value.
The package downloaded already have the file README, so you can also follow the instructions from there but to make it more easy I am showing it off below :
Go to the acpi_call folder just downloaded. Make it and then insert the generated module `acpi_call.ko` into the kernel and then run the script `test_off.sh`. The script generated `test_off.sh` in my case was not executable so I had to make is executable first. All Commands are given below as :
	
	cd acpi_call
	make
	chmod +x test_off.sh
	sudo insmod acpi_call.ko
	sudo ./test_off.sh
	
Second command compile the program for your platform and generates two files `acpi_call.ko` and `test_off.sh`. 
Third command make the test_off.sh file executable if it is not (if it is, then still no problem in running this command).
Next command `insmod` inserts the module acpi_call.ko into the linux kernel.
Lastly, test_off.sh runs the script and does the main thing for you.

	Note: Please note that you need root access here, so using sudo is necessary here in this case.

You will see some sort of stuff which will print in your screen and then one of it will say 'works' and you are done. Now see the rate at which battery is discharging now.
	
`grep rate /proc/acpi/battery/BAT0/state`

If everything worked fine the discharge rate should decrease rapidly after some time of running the script. This all worked on my Dell XPS L502x with dual graphic card (Nvidia and builtin Intel HD graphics) and also on some model of ASUS as author of the script has mentioned in his README. I hope this would also work on your model having dual graphic card. 

Currently, you have to run following two commands everytime by going to the same acpi_call folder to make this trick work.

	sudo insmod acpi_call.ko
	sudo ./test_off.sh

Or if you do not want to do this, you can edit your .bashrc and put the things in it to make it work everytime you startup your system.
Or you can insert the module acpi_call.ko in your linux kernel modules in /boot/grub/ and load it by playing with /etc/grub.d/.

## More help regarding battery
If you want to know more about battery conservation in linux and want to save more battery, its highly recommended for you to have a look over this website :

[Lesswatts.org](http://www.lesswatts.org/)

