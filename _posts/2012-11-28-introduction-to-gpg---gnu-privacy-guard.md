---
layout: post
title: "Introduction to GPG - GNU Privacy Guard"
description: "The posts tells you about the GPG and how to setup one."
category: cryptography
tags: [linux gpg digital-signature encryption]
---
{% include JB/setup %}

GPG is GNU privacy Guard and it is a software made over OpenPG standards. The terms GPG and OpenGP are the terms that are used too often interchangably but one must understand that these two terms are different. One is a standard and other is a software made over that standard.

If you are new to public key cryptography, I would like to showcase the concept here. Public Key cryptography is a very secure way to share messages between two parties. The transmitter transmits the message after encrypting it with a special key called 'public key'. This public key as the name tells is public and can be shared with any other. The other key is 'private key'. The private key as the name tells should not be made public to any person. It should be kept private with you only. Now anyone having the copy of your public key can encrypt the messages and send messages to you. Since we are using public key cryptography, that encrypted message can only be decrypted by the private key. And since you are the only person having that private key, you are the only single person in the world who can decrypt those messages sent to you encrypted using the corresponding public key. Hence it is a very secure method of sharing extremely sensitive information.

There is one more concept of symmetric keys. In this system, the same key which is used for encrypting the data is used for decrypting the data, so its less secure than the public key cryptography. 

## Setting up your GPG 
I will demonstrate how to setup the GPG in ubuntu. But the process should be same in any other distro since the software I will be using is gpg and it is same in other distros too.

First install the gpg software using your package manager. For ubuntu users : 

`sudo apt-get install gpg`

After installing this, you need to generate your key. To do so do this : 

`gpg --gen-key`

It will ask you the required information. Since the program is too interactive, you should be able to figure it out what it is asking and provide it the necessary information. It will ask you your basic information like Real name (it is recommended that you keep your name same as it is on your passports etc. ), email-address etc. It will also ask for a passphrase, it is like a password to unlock your private key. Whenever you make use of your private key ( say to decrypt messages which inevitably require private key ), it asks for the passphrase to first unlock that private key and then use that to decrypt messages. It is recommended that you provide a good passphrase depending on how often you give your PC or laptop to other people to use. If you don't allow anybody to even touch your PC, then there is not even a need to provide passphrase in which case you must make it very very sure that the private key inside your PC is not at all accessible to anybody via any means. 

After all the required information, your keys will be generated. Now you can upload your public key to the keyserver for other people to have access to them. Doing so will allow them to send you encrypted messages in case they have to send you sensitive information which can only be decrypted by you having that private key with you. 

There are websites like [BigLumber](http://www.biglumber.com) which allow you to list your public keys and allow signing of your public keys by others. Now lets see what this signing of public key means.


## Increasing web of trust

Signing of public keys by other's private key increases your web of trust. If there are more people who have signed your public key using their private key, it means that they verify that the person who is claiming to be you is only you. Any person doing such verification should verify the details with any governmental identities before signing the public key. On  [BigLumber](http://www.biglumber.com), you can find the nearest listings of individuals who can sign your public key that would ultimately increase your web of trust.

## Signing Documents

You can also sign other documents that require owner authenticity. For eg : You are submitting a journal and people at other's end need to verify that it came from you. Since the journal is digitally signed by you, the people at other end can verify this fact by using your public key.

You can go to [BigLumber](http://www.biglumber.com) to start finding people to sign your keys, upload your public key to public servers etc. and do lot more stuff.