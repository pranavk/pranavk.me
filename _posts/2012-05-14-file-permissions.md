---
layout: post
title: File permissions in Linux
category : linux
tagline: Linux heart-beat
tags:
- file permissions
- linux
- rwx
status: publish
type: post
published: true
meta:
  jabber_published: '1337021788'
  _edit_last: '35791753'
---
## Introduction 
Permissions in Linux has a very deep influence on the security and people who know linux deeply. It may seem simple to the ordinary people who work under windows but for those who know little about it and have some experience playing out there with the files in Linux, they know the real meaning of what permissions in Linux means.
 

First of all permissions are also broken into two parts :
- One at a basic level. 
- Second at a higher level. 
 
## Basic Level
On a basic level we have three permissions - read, write, execute permissions for three types of users on the computer.
First type of user on the computer is the owner of the file or directory. Second type of users are those in that group which owns that file. And the third type of users are other users.
  
Since read(r), write(w) and execute(x) are defined for each of them, so basically there are nine total permissions on any file or a directory. Each of them can be represented by a bit. 
If for any file/directory, a type of user has all the three bits on, means he has permissions of 111 on that file which when converted from binary to decimal means permission of 7. Similarly when only rw bits are on, it would mean 110 permissions which means permission of 6. Again when only r bit is on, it means permission of 4 only. So in a way to remember these easily we can remember 4 for r, 2 for w, 1 for x. And when all of them are 'on', just add them and this final result will be permission for the user under consideration. 
So we can have different permissions for a particular file for three different types of users. E.g. : We can have 744 permission for a file which would mean that owner of the file/directory can read, write and execute (4+2+1) on that file. The users in the group which owns the file can only read the file since second value is 4 and all other users can also just read the file.
  
Now we will focus on how to implement this and I will be telling some commands for you so that you can have look at them and try on your localhost.
I am specifically focussing on filenames here just for the clarity. You can replace the filenames with the directory names also. Also I am assuming that the user to whom ownership will be set is mathews and the group to whom the group ownership will be set is admins.

### Changing the ownership  
To change the ownership (user and group ownership both) for a file, we do as :
  
`chown mathews:admins filename;`
 
After this command, the owner of the file will be set to 'mathews' and the group owner will be set to the 'admins' for 'filename'.
  
### Changing file permission via chmod
The second command frequently used is changing the permissions for the file. You can do so as :
  
`chmod 755 filename;`
 
Here 755 is the permission set for the filename. Consider that the 'filename' we are using here is the same as we used in above chown command. So now after the execution of this chmod command, the mathews will be able to have all the read, write and execute permission on 'filename' while the users in the group admins will be able to have only read and execute permissions on the directory. Similarly all others users also can only read and execute the filename.
  
### SOME IMPORTANT POINTS 
Execute permission on a directory means that you can enter a directory. Write permission means you can create files in the directory. And read on a directory means you can ask for a listing of the files in the directory.
If write and execute permissions are set for a directory then that would automatically means that the specified user can delete files/sub-directories in the directory irrespective of all other things.
 
That was all about the basic level of permissions.
  
## Advance Level Permissions
Advancing to the permissions of a slightly higher level, there are three more permissions as :  
- **SETUID**
- **SETGID**
- **Sticky Bit**
 
The SetUid and SetGid is denoted by 's' as compared to 'r','w','x' for files above. The sticky bit is denoted by 't'.
The SetUid bit 's' replaces 'x' permission in the owner group of permissions i.e. if the owner is having rwx permissions and after that 's' is applied to it, it would convert to rws. If owner is having rw- permissions and 's' is applied to it, then it gets converted to 'S'.
Similar is the case with SetGid except it all happens by replacing 'x' of the group permissions. So if both SetUid and SetGid are set for a file, then it would look like.
  
`-rwsrwsr-x.` 
 or  
`-rwSrwSr-x.`
  
**'S'** or **'s'** depends on the above mentioned rule.
  
After it sticky bit is defined for a file as a whole and it replaces 'x' of the other users permission. So if we apply 't' to a file as mentioned above, it would look like.
  
`-rwsrwsr-t.`
  
If execute permission on others is set, it would be 't' otherwise it would be 'T'.
  
Now let us focus on how we can do this using commands.

To set the SetUid bit you have to append 's' to the user(owner) of the file as :
 
`chmod u+s filename`
   
Similarly to set the SetGid bit, you use :
   
`chmod g+s filename`
 
The same can be accomplished using decimal notation also as :
   
`chmod 4711 filename`
 
where the first decimal digit now would mean the SetUid Bit and after it i.e 711 will mean the same stuff as we did in above basic file permissions.
  
Similarly SetGid would mean value of 2 and sticky bit means value of 1. So if you want all of them to be set for a file, you can do :
   
`chmod 7711 filename`
   
Now lets see what all of this means : 
SetUid, SetGid and the sticky bit are defined differently for files and directories. Infact these are introduced to add flexibility to the file permissions thing. There are some drawbacks of basic file permissions that are overcome due to these three new bits.
 
### SET UID, SET GID , Sticky Bit FOR FILES :
  
**SetUid :** When this bit is on, the file when executed will be executed as if the user(owner) of the file is executing that file and it appears to the process that is triggered by the file that owner of the file is executing the file.

**SetGid :** When this bit is on, the file when executed by any other user executes as if the member of the group that owns that file is executing that file. 

**Sticky Bit :** When this bit is on, it means that the the executable file will 'stick' to the memory even after its execution. Infact the executable is stored in the swap space so that when next time it will be launched, instead of loading it from the secondary storage to the primary storage, it gets directly loaded on to the primary storage from the swap space. This increases the performance and all those programs that are frequently used should have a 't' bit on. 
 
### SET UID, SET GID , Sticky Bit FOR DIRECTORIES : 
  
**SetUid :** When this bit is on, the sub-directories and the files inside that directory have the same owner as that of directory, but sometimes this bit is ignored on some systems. E.g: On Fedora, it is ignored by default.

**SetGid :** When this bit is on, the sub-directories and the files inside that directory have the same owner as that of directory.

**Sticky Bit :** When this bit is on, it do not let other users to delete files/sub-directories in the directory to which we have write access to. Earlier in the text we saw in the note, that if we have write and execute permission on a directory we can delete files/sub-directories in the directory irrespective of other conditions imposed on them. So this bit is helpful if we do not want that thing to happen. Usually on Linux system, this bit is on for /tmp directory so that other users cannot delete temporary files of any other users and only the user that created that file can delete or rename that file.
  
## More Permission control 
After all of this there are more advanced things also that applies for permissions on files/directories. This next big thing is ACL. acl is a package that you can install through your linux distro's package manager. This lets you to grant additional user access to some files.
After installing acl, you can set permissions for files/directories as :
  
`setfacl -m u:mathews:r filename`
 
This would give user 'mathews' additional read access on the file if 'mathews' is neither the owner of the file nor the memeber of the group that owns that file and comes under 'others' category and the permissions of others are set to '---'. So in that case we give user 'mathews' additional read access on that file.
  
Similarly to see what additional rights are imposed on that file we can see that as :
   
`getfacl filename`
 
So far, if you observed carefully, I used a '.' after permissions as :
 
`rwx-wx--x.`
  
After you set acl permissions on a file you see a '+' sign after the permissions as :
  
`rwx-wx--x+`

and you can see those using getfacl as mentioned above.
  
You can see the man-pages for getting help on getfacl and setfacl.
 
