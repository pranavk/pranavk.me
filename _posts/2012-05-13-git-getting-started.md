---
layout: post
title: ! 'Git : Getting started '
tags: [git, CVS]
category : general
status: publish
type: post
published: true
meta:
  _edit_last: '35791753'
  jabber_published: '1336945112'
---

# Introduction
---
Many of you might have wondered in the past what Git actually is and today you are here browsing the internet in search to learn what it is all about. Git is a revision control and source code management software and it is one of the popular Version Control system. Now you might ask what is this Version control system ? Well, if you are a novice then let me tell you that when programmers work on a big project, they often save the project many times a day, removing each and every bug as they find out. Now there are some situations when instead of removing a bug, a new bug is introduced and now you want to go back to previous versions and start working on from there. If you are not working under CVS this will be impossible for you, since you don't have so much of backup directories and files out there to revert to. But CVS takes care of this thing so intelligently by taking the minimum amount of space to store your project and at the same time have the ability for your project to get reverted to any of the initial state. Each save in programmer's language is called commit, so programmers made commits whenever they feel that they have resolved a new bug and that gets stored in Git's history so that if anytime the author or anyone wants to access the previous version he can revert back all the states of his directories to a previous state. Each commit is accompanied by date, time and most important - a commit message which let people know what changes are included in this version.

In linux many situations occur when the user have to copy the source code for a software from the internet or to be more specific from the git repository. Infact most of the open source projects resides under git repositories so that it  can qualify to be a open source project and everybody can access the code, everybody can make commits to it.
   
<br />

## Getting started with git
---
Now I will be telling you setting up git on your computer. I will be assuming that you are linux user. But if you are a Windows user then you might consider downloading Git for windows, just google it.

Install git using your package manager, use yum for rpm based linux or use apt-get for debian linux. 

`sudo yum install git` in rpm based linux.

`sudo apt-get install git` in debian based linux.

Once it is installed you need to do some initial registration with git such as adding your username and email. This information is important and is used when you make commit to some software or submit patches. Add your name and email as follows :

`git config --global user.name "yourusernamehere"`

`git config --global user.email "youremailid@yourmail.com"`

This was the initial setup of git on your computer. Rest of the article now is a small demonstration of cloning the source code of a program into your computer and later on you will be told how you can initiate a git system on your localhost and work on it. I am telling this just to give you a basic feel of what git is.

To clone the source code from the internet you have to find git repository and then you will access that source code using git protocol. I assume in this tutorial that you are using a linux box and we are cloning a calculator application source code from github using git protocol. So first see if git is installed on your system, if not install it via yum or apt-get ( whatever you use to install softwares ). After installing git, you can type in the following command to clone the source code of this application.

`git clone git://github.com/mgomes/GCalc`

Above command will clone the source code of the application into your computer so that you can make your commits on it, submit patches and do whole of the related stuff.

Now there may be another situation when you have your existing project on your computer that you made from scratch and you want to have CVS system applied to it so that you can easily manage different version of the project you will be releasing in future. In both the cases, to do this you change you current directory to the project directory (gcalctool in case you don't have any existing project) and then do this :

`git init`

In case you cloned the source code, it is already intialized, so you don't need to do git init, you can again reintialize it though.

Above command will add a .git hidden directory in your current directory and store whole of the git data into that directory. It records all of the information that is required for your project to be CVS based.

Now let us assume that you change some file in your project directory and now you want to commit changes. If you are practically performing while reading this you can make some changes. To do so, you first add those changes using :

`git add .`

where '.' represents the current directory.

Now that you have staged the content you want to snapshot with the git add command, you run git commit to actually record the snapshot. Git records your name and email address with every commit you make, so the first step is to tell Git what these are. 

Now you will commit changes with a commit message which comes in handy later to tell you why you committed this change. You can commit changes to the added content as :

`git commit -m 'type your message here'`

The `-m` flag is for message flag, it links the message with your commit and stores it.

**NOTE :** If you skip the -m flag, the git will automatically open a vim editor for you to enter the message, so its better to add a -m flag with your command.

To do both of the tasks simultaneosly i.e git add and to commit the changes, you can do so just by one simple command also by :

`git commit -a -m 'Enter your message here'`

Till now everything is fine, but now I will suggest you to create an account on github so that you can manage your projects globally on the internet. After that we can learn about remote commands of git also.

So create an account on github and then create repository out there with the same name as of your project. Now intialize the git in your current directory of the project, do some changes, add to the staging area using git add command and then commit the changes, all of which I told you how to do in above lines.

Now I will be telling some thing about remote commands of git. You will add an alias for the url you want to push your changes to. Eg: My username on github is pranavk, so I will add a remote alias corresponding to any of the repository in my account. Currently 'pranavk.github.com' is a repository on my github account. And I have project contained in a directory related to pranavk.github.com in my local computer, I will make  the changes to that and push the changes to the github account which are then reflected on the github/pranavk.github.com. The whole procedure goes as :

`git remote add origin git@github.com/pranav913/pingmygeek`

this adds an alias 'origin' for the url 'git@github.com/pranav913/pingmygeek' mentioned above. Now I don't need to mention that big url, I will just mention the alias from now. 
	
	NOTE 

	You can see the currently assigned alias by :
	`git remote -v`

	You can also remove an alias as :
	`git remote rm [aliasname]`

Now I will push the changes I made to the remote server by pushing the origin to the master branch(i.e the remote server branch)

`git push origin master`

After this all the changes I made locally on my computer will now be reflected on github account globally to all the users with history of commits and commit message I passed on while commiting the changes.

There might be a situation in which you get a error while pushing the changes to master branch, the error about non-fast-forwards. To avoid this error there are two methods, first one is by adding a --force flag to the push command. But it is not recommended, so we will use the second one. In second method, you will just pull the master branch before pushing to the master branch as :

`git pull origin master`

git pull command is same as git fetch except it do an additional task of merging the remote branch with local branch. So means you can divide the above git pull command into two commands of git fetch and git merge. 

After this git pull command, now again try to push the origin to master branch, it will be successfully pushed to master without giving any non-fast-forward errors.

##References

[GitReference](http://www.gitref.org) is a good place to start with if you want to get deep inside git. 




