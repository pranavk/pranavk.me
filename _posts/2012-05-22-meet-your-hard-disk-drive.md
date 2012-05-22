---
layout: post
title: "Meet your Hard Disk Drive"
description: "Structure of your Hard Disk"
category: general
tags: [HDD, structure of hard disk, inside hard disk]
---
{% include JB/setup %}

First of all a hard disk consists of many platters stacked together, a platter is a disk shape object. Now comes the head, the head reads the data written on the platters and in between each platter there are two heads reading the data on one of the faces of two different platters.
The head moves from outer to the inner edge when reading data. Each platter consists of tracks which are further divided into sectors. The tracks are number from 0 to usually 1023 in a standard Hard Disk and each track can have many sectors. One thing to note here is : when the platter will be rotating, in inner edges the head will be covering one rotation over the platter in lesser time as compared to outer edges (if the data is uniformly distributed over the entire disk). As you might know from the high school physics that velocity equals product of radius and angular velocity (v=wr), so in one rotation the head will read more data in those tracks which are away from center of the disk. To compensate for this difference, the density of data that is stored in the outer edges is less so as to make the number of sectors in each of the track constant because no no physical difference is desired when designing the hard disk. So result of making this modification is that same amount of data can be read from any head position over the same period of time.

As said above hard disk consists of platters which further consists of tracks and so on. If we consider the same track number of each platter in the hard disk then that forms a cylinder.

Each sector of the disk contains a maximum 512 bytes of data which has been standardized. **E.g :** to store 1000 kb of data, we need two sectors allocated for this purpose which amounts to 1024 bytes of allocation in the hard disk.
Now there is one more thing, one more standard plan : As said above that there are many platters out there in a hard disk, so one side of the top platter (opposite to the side facing the other platter) is used to write the hardware track positioning information. This is written during the assembly of Hard Disk in the factory. The system disk controller, reads this data to place the drive heads in the correct sector position.
So if there is a stack of 1000 platters then 1999 faces will be used to write the data and will be available to the Operating system and one remaining face of one of the platter is used by the system disk controller to access the data on other platters.

## Data fragmentation

Many of you might have heard of data fragmentation, when defragementing your hard disk. Well what does that mean ? Lets have a look.

What if the file size to be stored is 900 bytes, in that case obviously two sectors will be used by the file system to store this file. The contigous sector allocated for storing this file is called a cluster.
Now let us assume if later on more data is appended and file size grows to 1500 bytes then though it should take 3 sectors (because the 1600 &lt; 512 x 3 =1536 ), but it will take 4 sectors since the number of sectors allocated because size of a cluster is always a power to 2, so in above case another two sectors will be allocated so that cluster now consists of 4 sectors.

Now, the most **important concept of fragmentation.**
What if the two sectors that need to be allocated are not available adjacent to it, in that case the two sectors can be allocated anywhere in the disk, just anywhere, doesn't matter which cylinder, which track, which sector. In that case the file stored under this non contigous manner is called fragmented. This can delay the time used to open the file as heads needs extra time to travel to different head positions.

Bigger cluster size can be allocated by the file system to reduce fragmentation but this may lead to a situation where much of the space becomes unused and you may run out of storage. 
