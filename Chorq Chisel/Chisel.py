from bs4 import BeautifulSoup
import urllib2
from HTMLParser import HTMLParser
import re
import sys
import json


def putNotes(line, notes):
	i = 0
	shift = 0
	while i < len(notes):
		if notes[i] is not' ':
			note = notes.lstrip(' ').split(' ')[0]
			line = line[:shift] + "[[" + note + "]]" + line[shift:]
			notes = notes.lstrip(' ')[len(note):]
			shift += len(note) + 4
			i=-1
		shift += 1
		i += 1
	return line

firstSoup = BeautifulSoup(urllib2.urlopen('http://www.ultimate-guitar.com/top/top100.htm'))
linksAndNames = firstSoup.select('a[href^=http://tabs]')
artists = firstSoup.select('a[href^=/tabs/]')
with open("tabs.json", "w") as textFile:
	textFile.write("{\"tabs\":[\n")
	for w in range (0, len(linksAndNames)):
		textFile.write("{")
		html = urllib2.urlopen(linksAndNames[w].get('href')).read()
		html = html[html.rfind("<pre>") + 5:html.rfind("</pre>")]
		html = re.sub('<[^<]+?>', '', html)
		#html = re.sub('\[[^)]*\]', '', html)
		html = re.sub('[^A-Za-z0-9 \n]+', '', html)
		lines = html.split("\n")

		textFile.write("\"sheetTitle\":\"" + artists[w].string + "\",")
		textFile.write("\n")
		textFile.write("\"sheetArtist\":\"" + linksAndNames[w].string + "\",")
		textFile.write("\n")
		textFile.write("\"sheetContent\":\"")
		notes = None
		blankCount = 0
		for line in lines:
			if (len(line.strip()) != 0 or (len(line.strip()) == 0 and blankCount < 1)):
				if len(line.strip()) == 0:
					blankCount += 1
				else:
					blankCount = 0
				if(line.count(' ')*2 > len(line) or (len(line) < 3 and len(line) > 1)):
					if notes is not None:
						textFile.write(notes.rstrip() + "\\n")
					notes = line
				else:
					if notes is None:
						textFile.write(line.rstrip() + "\\n")
					else:
						textFile.write(putNotes(line.rstrip(), notes.rstrip()) + "\\n")
						notes = None
		if w == len(linksAndNames) - 1:
			textFile.write("\"\n}")
		else:
			textFile.write("\"\n},")
	textFile.write("]}")
