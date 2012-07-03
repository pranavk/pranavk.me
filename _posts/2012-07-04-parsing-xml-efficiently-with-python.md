---
layout: post
title: "Parsing large XML files efficiently with Python"
description: "Article describes how to parse large XML files with python using lxml library"
category: python
tags: [python, xml, lxml, efficiency, parsing osm data, parsing large xml]
---
{% include JB/setup %}

Parsing XML with python is not a difficult task if you have some familiarity with python and any of the library that deals with providing you methods to parse XML. But what if you want to parse very very large XML files. Probably you are here searching for this only because you were trying to parse a very large XML files and your CPU was not able to handle it or you have memory issues. 

I was also searching for this thing when I was trying to parse a very large XML file. I was trying to parse a file whose size was in GB. And whenever I start my python script, it just gets killed everytime. Then I came across some scholarly article written on efficiently parsing XML files. 

## Concept

Basically when parsing very large XML files, problem is that the traditional parser will hold the information about the parent and its child and everything. So as you start reaching the end of the while it is keep storing everything inside the memory and which means that you might get out of the memory.

## Approach

What you basically got to do is to delete the references of parents and children as you parse the file from top to bottom. We will be accomplishing this with the help of `lxml` module in python. If you don't have it just search for a package named `python-lxml` if you are in Ubuntu or search for the similar package if you are on any other distribution. You can also download this package from `pip` or `easy_install` whatever you like.

So, unlike the traditional parsers, what lxml will be doing is to record the events as it parses the file and probably I think it don't capture the whole file in the memory, it just reads the file in chunks. These events that I just wrote above are events like 'start', 'end'. If you define that all the events 'start' should be captured, it would give you an element at that point corresponding to that event. Similarly if you say it to capture all the 'end' events, it will give you element corresponding to that. You can define both the events also in which case it will give you corresponding element everytime it hits that event. You can also define the element itself to be captured, so that you ignore all the shit and take out only the useful ones. 

One thing you have to keep in mind is that a 'start' event won't be having any information about its child. It will be having information only about its parent and the attributes of the element. 
And the 'end' event will be having all the information about its parent, childs and the content. 

Following code demonstrates the whole process :

	from lxml import etree
	
	context = etree.iterparse(filename, events=('end',), tag='nodes')

	for event, element in context:
		<Do the stuff here you want to do with the element. This element has all the information about the content of 'node' tag and its child elements because in the context above I have ordered it to capture only 'end' events for me. So it captures the event when the parser hits the end of the node tag i.e </node> tag or <node/> if it has no content inside it.
		
		element.clear()
		#This line tells that you won't be accessing any child elements of the element now. So the parser can just throw them off.
	

		#Now clearing the parent elements of the 'element'
		while elem.getprevious() is not None:
        		del elem.getparent()[0]
		# 'not None' is used here because if the element you are parsing is root itself, then it will raise an exception because there is no parent for it, so you might have to handle that exception too in that case.


## Parsing OSM data

I used this script to parse the [OSM](http://www.openstreetmap.org) data to capture all the nodes that the XML file has. You can add the stuff inside this script to capture whatever you want to take out of the OSM data. For eg: If you want all the 'atm' in your town, you can run this script and capture all the 'atm' in your area alongwith their latitute and longitude values provided that your city is not too remote and OSM has enough data about your city and people from that contribute the data just as they do in google maps to OSM also. 

Frankly speaking everyone should contribute dta to OSM rather than google maps. Its free and open source. You can download their huge data in compressed form ( about 21 GB or so ) from their website but can you do such thing with google ? Let me know if you do.

You can download the OSM data [here](http://planet.openstreetmap.org/) and see what they provides.

Code :

	from lxml import etree
	
	context = etree.iterparse(filename, events=('end',), tag='node')
	
	for event, elem in context:
		Id=elem.attrib['id']	
		lat=str(elem.attrib['lat'])
		lng=str(elem.attrib['lon'])

		for c in elem:
			if c.attrib['k']=='created_by' or c.attrib['k']=='source': # We don't want such tags to keep in our DB.
				continue
			
			key=c.attrib['k']	#These are basically the tags inside the nodes having key and values
			val=c.attrib['v']
			# You can do more filtering here if you want specific keys or values. Like if you want only 'atms' then filter the val with 'atm' using conditions.
			
			# Store the information in file or db or wherever you wanna use it.
			


    	elem.clear()

   	while elem.getprevious() is not None:
        	del elem.getparent()[0]



And then you are done. You have all the important information you need out of the OSM data and that too in a fast way. If you wanna get more and more faster you can make the program multithreaded.
	
