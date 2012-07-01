---
layout: post
title: "NoSQL databases"
description: "Introduction to NoSQL databases."
category: database
tags: [database,nosql, key-value store]
---
{% include JB/setup %}

Many of you might have worked with SQL databases, that basically just stores your entries in form of a table. You can then manipulate those entries or records the way you like. There are several commands that help you manipulate and analyze the data in a SQL database in a wonderful way. You can even join the tables/relations and do operation on them. MySQL, Postgresql are some of the SQL database servers that you can use for doing making up your database in a SQL format. Well all these are Relational Database Management System (RDBMS)

## NoSQL - Yes, please no more SQL.

But what is this NoSQL ? As the name suggests its a database with no more SQL. Yes it does not use SQL as its query language. Basically a NoSQL database uses a key value store to store its entries. So you can imagine a container having keys in it which are unique from each other. And each key have values associated with them. Remember that no two keys can be same. If you try to insert any key later that matches the key already in the databse earlier you are going to overwrite that. 

**NOTE** : You can search your NoSQL database for keys. Remember that you can never ever search your NoSQL database with values. NoSQL database just cares about what the values are, they don't care what the mess you have created inside the values. So you should structure your program keeping in mind this always.

There are several NoSQL databases available today in the market. MongoDB, redis etc. Redis is one of them and I love [redis](http://www.redis.io) because of its diverse data structures that it provides. Usually in most of the NoSQL databases, the keys are just simple strings and the value can be any datastructure. For eg: In redis the value can be advanced data structures like hashtables, sets, sorted sets ( that keep the things sorted always using a unique id associated with each value). So you can have one key and a set associated with that key or a hashtable associated with that key. Or if you want to go more complex, you can have a nested hast tables or nested sets or sorted tests. Redis is basically used to cache the things in a nosql fashion but don't assume that it just cache the things and forgets everything after restarting a server. Its persistent. It keeps on making copy of data to the harddisk also. MongoDB is also a NoSQL database but it cannot act as cache as it stores everything in the hard disk itself. 


## Why do I need a NoSQl ?

Well there are situations when you have data of variable complexity. Like you can have data of cities but its not gurranted that all the cities have same amount of information associated with them. Then if you go with a RDBMS you will have to create columns and many of the columns for many records will be left empty because the city associated with that record simply doesn't have that information associated with it. 

But if you are using a NoSQL database you can have a key with city name and a hashtable associated with the key which provides you this feature of storing different sized data in it. Your hashtables for each city can be of different size. If your NoSQL database doesn't provide such good datastructure support unlike redis then you may have keys for each of the feature like in this format : 

`Bangkok:Population` 

which will again give you the flexibility of varying features associated with each city. Just don't worry about the mess that will be created by doing this. You don't need to worry about it unless you are sure that it will be retrieved successfully. In this case you just have to search for the keys starting with a city name and then search for the feature after the column. So search is easy as you see. NoSQL cares for all of the mess that you create inside it. Just don't worry about it.

So every key value will be stored in this format :

`"key": "value"`

This can be as simple as this :

`"Madrid": "Spain"`

or can be as complex as the value being a hashtable.

## NoSQL support in RDBMS

If you feel that you don't want to compromise the power to SQL in RDBMS but at the same time you want to use the feature that SQL provides you have the support of NoSQL in your RDBMS also. I used postgresql(a RDBMS like MySQL, if you haven't used it) and it has this wonderful extension thing. You can create extensions for it. The extension that provides this support is called **hstore**. You can then simply create your tables with columns and make one of the column's datatype as hstore. The column will then accept the key:value pairs which you can then manipulate afterwards by searching that column with their keys. Each record in your relation/table will be having its own key:value pairs. 

So all you have to do is open the psql by logging in as a postgres user and then open up the psql by typing `psql` in the terminal.

Then create the extension as :

`create extension hstore`

Remember that you have to install the postgresql's contrib package from your repository or from their site before creating this extension.

Then you can create the table as :

`create table foo(id integer primary key, name varchar(50),population integer, data hstore);`

and you are done now you can enter the key:value pairs in the data column for each record you enter in the database. For eg: For the above table structure you can add records like this :

You can denote the key value pairs like this :

`"population"=>"555232"'`

`insert into foo values(1,"delhi",124333,'"country"=>"india","language"=>"hindi"');`

This will populate your postgresql table with data field variable for each of your record. You can then search for the keys in this column.
