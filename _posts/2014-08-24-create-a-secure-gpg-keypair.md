---
layout: post
title: "Create a secure GPG keypair with subkeys"
description: "This post talks about creating a secure GPG pair immuned to theft
of your keys."
category: crypto
tags: [crypto]
---
{% include JB/setup %}

Public key cryptography has always fascinated me. I created my keypairs long
ago. They are not used much because there are not much people around me who use
public key cryptography. Very few of them have generated their keypair. Some of
them who have generated do not know about whether they have a keypair. But
still, this week I managed my keypair immuned to any theft of keys. If your
private key is stolen, everything is over, so better not store the main private
key on your laptop or phone but rather in a private safe or in your pendrive
which is then kept in a private safe.

If you have your GPG key already or not, using separate subkeys to sign and
encrypt messages is always a good choice. There are few steps I will talk about
below that will help you detach your private key from your secret keyring in
your laptop and allow you to store it in a safe place. You can buy a separate
pendrive which you don't use for daily purposes to store your private key.

I am assuming you already have your GPG keypair, if you don't have it already,
you can use 

`gpg --gen-key`

to generate your keypair. I am also assuming that you have created two subkeys
here, one for encryption and one for signing. I won't go into techincal details here since this post
is not about creating GPG keypair from scratch. You can easily google about how
to create your GPG keypair and how to add subkeys to it. Most of this part is
interactive, so some of you don't even need to google but can simply understand
what's written on the console.

So, you have two subkeys now linked to your main keypair, one for encryption and
one for signing. You can verify this by first :

`gpg --edit-key <your_key>`

and then with this :

`list`

You can see the usage tag in front of each subkey. 'E' stands for encryption and
'S' stands for signing. Note that signing here means signing documents, not
keys. Signing keys, revoking keys, adding new subkeys are some of the operations
that require the presence of your main private key. Since these are some of the
operation that are not done on a daily basis, we can remove our private key from
our laptop. But first you should backup all of the private and public keys.

To backup your public key :

`gpg --export --armor <your_id> > key.pub`

To backup your private key :

`gpg --export-secret-keys --armor <your_id> > key.priv`

To backup your secret subkeys :

`gpg --export-secret-subkeys <your_id> > subkeys`

Now you need to delete all the secret subkeys from your keyring like this :

`gpg --delete-secret-keys <your_id>`

But note that, this will also delete the subkeys from your keyring but your can
import them again as :

`gpg --import subkeys`

This would import the subkeys part but the main private key is still not
imported. So it means you can encrypt and sign documents without any problem but
you need to import your private key whenever you need to do some bigger tasks
like signing other people keys, adding UIDs etc.

Keep your private key i.e `key.priv` created in above steps safe and use it only
when required.

At this point, you can run 

`gpg -K` 

and you will see a `#` sign in front of your main key. This means that the
secret key is not present in your keyring.

When you need your private key, you need to first delete your key as :

`gpg --delete-secret-keys <your_id>`

and then import your main private key as :

`gpg --import <your_public_key> <your_private_key>`

Now after running :

`gpg -K`

you can see that there is no `#` sign, which means private key is available in
your secret keyring. You can follow the above mentioned steps again to delete
the main secret key from your keyring after you have finished performing tasks
that require the use of main private key.


You can either use these subkeys in other devices such as your smartphone to
encrypt and sign documents. You can also create another subkey for your android
phone to perform such tasks (Note that creating a new subkey requires you to
import the main private key first)
