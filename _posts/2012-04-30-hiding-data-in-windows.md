---
layout: post
title: "Hiding data in Windows"
description: "Article describes the art of hiding data in Windows"
category: windows
tags: [hiding files in windows]
---
{% include JB/setup %}


## Hiding Files, Folders and Drives

You would have thought always to hide some file or folder or even a DRIVE ! from your friends, family 
just because you have some personal data in those files/folders/drives. Many of us keep on searching for 
softwares that annoy us when the software trial ends and it starts asking for the money for it to keep 
working in future for their negligible, non satisfying service that the software provides.

There are different methods that can be employed for hiding. Below are some methods that can be very 
useful in case of hiding data.
## Adding system attribute to files

Microsoft Windows has a feature that makes some of the files which are very sensitive(whose 
alteration/deletion can cause harm to the Windows) invisible to us by adding a attribute to those files/folders
called 'system' attribute. There is probably no way you can add a system attribute to the file manually 
using the Graphics Interface of the windows and without using any third party software(Making files hidden is possible but making files system files is not using GUI). But we have always
the great tool in Windows. Yes ! You are right, here comes CMD again. So start over and open a command prompt 
session. 
Now go to the respective directory in Windows and type :

`attrib filename +s +h`
 
(Replace the string 'filename' with your file.)

This will add a system and a hidden attribute to the file and makes files invisible.

**For Example :**
There is a file named `image.jpg` in `D:\test\`
Open CMD and type as shown.

<p>
	<img src="/images/method1.jpg">
</p>

The file is hidden now and if you go now to `D:\test\`, you will see no file with name image.jpg there.
However there is option to view the system files also which is usually off in most Windows but if we want to see the system files we can go to Folder options >> View >> Uncheck 'Hide Protected Operating system files(Recommended)'.

#### Removing system attribute (making file back to normal)

To remove this system attribute from the file we repeat the same process except this time we change 
the command by using a minus in case of plus as :

`attrib filename -s -h`

This will remove the system attribute from the file and file will be visible.

## Hiding a Drive by Tweaking with Registry
Registry Editing is one of the tool that Windows provides which can help users to customize a Windows to some extend. Infact by providing Registry Editing Windows has provided many loopholes for hackers to hack.

Today by using registry Editing we will learn to hide a DRIVE! in the computer.

Go to Run from the Start menu. Type 'regedit' in the text field.
When the registry editor loads, navigate to: 

`HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer`

Right click on Explorer and select New and then DWORD Value. Name the value as NoDrives and select Decimal as the base.
In the value type the number that corresponds with the drive as shown below:


<p>
	<img src="/images/table.jpg">
</p>

(**E.g.** If you would like to hide drive E, type 16. You may also hide multiple drives by adding the two numbers. E.g. If you would like to hide drives E and G, 16+64=80.)

Now, after you restart your computer, you should not be able to see the drive.

## Hiding files in an IMAGE !

Well if your files are hidden in an image I guess only very few people would be able to guess that !

So lets see how to do this !

- Create a folder in D:\, e.g. D:\test\. (Let the name of image be 'image.jpg')</li>
- Put all the files you want to hide in there, as well as a JPEG image that you would like to hide the files in.
- Select all of the files you want to hide, and create a ZIP or RAR file with them using a program like WinRAR, WinZip, 7Zip, etc.
- Now you should have your archive (let the name of archive be archived.rar) next to your files that you want to hide, even though they are in the archived file already, with the JPEG image you would like to hide all of this in.
- Go to Start,Run, and type: cmd.
- Type cd D:, then type: cd test. (Replace test with the name of your folder.)
- Type the following: copy /b image.JPG + archived.rar image.jpg (Replace the name image with the name of your image, and replace archived with the name of your compressed file.)


<p>
	<img src="/images/def.jpg">
</p>

- You should receive a response similar to the following: 1 file(s) copied.
- Now you can delete everything except the image. If you double click the image, image will open but now what to do to see hidden contents ?
- Right click the image and select open With and select WinRAR or your extractor. You will see the hidden files there. 

So above were some of the tips I remember from my experience with windows. I hope you enjoyed the article.
