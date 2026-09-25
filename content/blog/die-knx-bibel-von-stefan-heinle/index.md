---
title: 📚 + ⚡️ | Die "KNX Bibel" von Stefan Heinle
title_plain: + ️ | Die "KNX Bibel" von Stefan Heinle
date: 2017-05-02T19:04:00+0000
lastmod: 2024-12-29T18:57:03+0000
slug: die-knx-bibel-von-stefan-heinle
draft: false
type: post
author: Daniel Bocksteger
reading_time: 5
summary: Original-Rezension von 2017, ergänzt und aktualisiert im Dezember 2024.
author_bio: Mein Name ist Daniel Bocksteger, geboren wurde ich 1995 in Goch am Niederrhein.
  Seit Sommer 2022 wohne ich mit meiner Partnerin in Kalkar in unserem Eigenheim.
author_image: https://regetskcob.mymagic.page/content/images/2024/11/IMG_9656-1.jpeg
featured_image: ./IMG_4274.jpeg
cover: ./IMG_4274.jpeg
seo:
  image: ./IMG_4274.jpeg
aliases: ["/posts/die-knx-bibel-von-stefan-heinle/"]
tags: ["Bücher", "Smarthome"]
---

> Wer heute ein Haus ohne intelligente Gebäudetechnik baut, errichtet einen Altbau.  
>   
> Stefan Heinle im Buch

Unter diesem Gesichtspunkt habe ich mir vorgenommen das Buch zu lesen und so viel Wissen wie möglich aufzusaugen. Zwar ist ein Hausbau aktuell noch nicht in Sicht (mit knapp 22 Jahren vielleicht ein wenig früh..) und dennoch. Wieso nicht schon jetzt das Wissen erlangen, das man später gebrauchen kann?

💡

****Nachtrag von 2024****  
Es hat sich definitiv wortwörtlich bezahlt gemacht, dass ich mich bereits so früh mit der Elektroinstallation und KNX beschäftigt habe. Als unser Hausbau im Jahr 2021 begann, war die Installation bereits durchgeplant, die KNX Aktoren und andere Endgeräte parametriert und Leitungspläne sowie die Reihenklemmen dokumentiert.

Der Umfang des Buches ist der Wahnsinn. Ganz egal ob ihr Grundlagen der Elektrotechnik nachholen wollt, Schaltzeichen zu verstehen versucht oder ob ihr die Verkabelung eures KNX BUS planen mögt. Euch wird unter die Arme gegriffen. Auch Themen wie die Lichtsteuerung oder die Einrichtung eines Linux Heimservers sind Teil des Buches.

## Aber von vorne.

Wer träumt nicht davon, dass der Briefkasten einem sagt „Hey, du hast Post!“ oder die Rollläden selber dafür sorgen, das Sonnenenergie das Haus erwärmt, aber dennoch keinen blendet? Auch eine „Notbeleuchtung“ für den nächtlichen Weg zum Bad ist ein denkbar sinnvolles Szenario.

Viele weitere Szenarios warten in einem Kapitel weit am Anfang des Buches, welches euch hoffentlich ebenfalls dazu verleitet, Blut zu lecken. Stefan Heinle beschreibt Szenarien, die sinnvoll erscheinen statt völlig abgehoben. Hier sollte jeder aufpassen beim Planen des Smarten Hauses. Übertreiben sollte man es nicht mit den Funktionen denn um so mehr automatisiert wird, desto mehr kann auch mal gegen einen arbeiten.

Danach geht es ziemlich direkt los. Ihr lernt recht früh den 1Wire BUS, unzählige verschiedene Kabelarten und die typische „Einrichtung“ eines Schaltschrankes kennen. Während ihr den 1Wire BUS kennenlernt werdet ihr einen Temperatursensor mit einer beliebigen Linux Umgebung auslesen. Dazu werde ich in einem getrennten Artikel näher eingehen.

💡

****Nachtrag von 2024****  
Ich fand es damals sehr fehlleitend, dass der 1-Wire-Bus so früh thematisiert wurde. Inzwischen liegt das Kapitel weit später im Buch, es wird Fokus auf elektrotechnische Grundlagen und dann Basiswissen zu KNX gelegt, bevor 1-Wire als Exot thematisiert wird.  
  
Ich will auch ehrlich sein, ich habe 1-Wire beim Hausbau nie eingeplant und vermisse es bis heute nicht. Zigbee, Matter und andere Dienste (bspw. auch Sensor-Zentralen wie der ioBroker) sind da deutlich moderner und nachhaltiger, als ein weiterer Kabel-Bus.

Im Anschluss daran erfahrt ihr Grundlagen der Elektrotechnik in Form von den entsprechenden Installationsebenen, den unterschiedlichen Schaltungen (OR, XOR, NOR, AND, Flip-Flop uvm.). Zusätzlich gibt es Einführungen ist Regelkreise mit stetigen oder schaltenden Regeln, oder auch Hysteresen. Details dazu könnt ihr euch ja selber im Buch anlesen. 🙂

Danach geht es an weitere Vergleiche zwischen der konventionellen Elektroinstallation und der smarten Variante. Der Autor zeigt euch auf, wie wartungsunfreundlich und redundant eine konventionelle Installation mit der Zeit werden kann. Jedes Gewerk arbeitet für sich auf einer Insel und kein anderer kann an diese Inselparameter dran. In der smarten Welt hat jeder, der auf den BUS aufspringt den Zugriff auf alle im BUS verfügbaren Daten und Informationen. Ganz egal aus welchem Gewerk der Wert kommt. Besonders nach einigen Jahren würden sich in der konventionellen Version unzählige Sensoren für den selben Zweck sammeln.   
Das wäre, als würden wir drei mal die selbe Quellcode-Zeile für den selben Wert, aber an anderer Stelle schreiben. Das macht man in der Softwareentwicklung nicht, also mache ich das als Bauherr erst recht nicht.

Außerdem lernt ihr die grundlegende KNX Installation kennen, wie man Sie sich auf einem Testbrett erstellen kann/sollte. Auch das Zusammenspiel der unzähligen möglichen Gewerke wird euch näher beschrieben. In dem Zusammenhang wird euch auch direkt das Arbeiten mit der KNX Leitung und den entsprechenden Klemmen (im Buch Wago 243) näher gebracht.

Danach geht es wie bereits geschrieben unter vielem anderem noch an diese Themen:

  * Kennenlernen der unzähligen Sensoren, Autoren, Antriebe, Schnittstellen oder Gateways und deren Zusammenspiel im BUS
  * Entdecken der nötigen Software und deren Möglichkeiten
  * Realisierung von einem Multiroom Audio System, einem Heimkino und einem Netzwerk im Haus
  * Anbindung von Touch-Panels zur Steuerung und Visualisierung
  * Alarmanlage und Zugriffskontrollen einrichten
  * Intelligente Haushaltsgeräte
  * Energiesparen mit Smart Metering und dem Smart Home
  * Geldwerte Tipps zum Einkauf, der Arbeit mit den Gewerken u.v.m.

## Webseite

[Hier](https://www.heimautomation-buch.de) findet ihr außerdem die Webseite zum Buch. In der ersten Auflage warb Autor Stefan Heinle damit, regelmäßige Ergänzungen oder weitergehende Inhalte bereitstellen zu wollen, schnell entwickelte sich die Seite leider eher zu einer „Einladung“ für die Beratungsanfrage. Inzwischen vergrößern sich auch die Update-Zyklen für das Buch, Neues wird erst nach einer halben Ewigkeit (in der Technikwelt leider fatal!) ergänzt.

## Fazit

Auch wenn ich sicher noch lange Zeit in diesem Buch verbringen werde, um das ganze Wissen aufzunehmen, kann ich es bereits jetzt nur empfehlen. Natürlich nur, wenn ihr technisch interessiert, nicht völlig auf den Kopf gefallen seid und vor allem, wenn ihr irgendwann plant euer Haus ’smart zu machen‘ oder direkt zu bauen.

Für 49,90 € bietet Stefan Heinle euch [hier](https://www.rheinwerk-verlag.de/heimautomation-mit-knx-das-umfassende-handbuch/) beim Rheinwerk Verlag ein Buch, das es im wahrsten Sinne des Wortes in sich hat. Ich wünsche bereits jetzt schon viel Spaß mit dem Buch und hoffe, dass ihr ähnlich begeistert sein werdet. 

Das Buch wurde mir in einer vorherigen Auflage kostenlos vom Rheinwerk Verlag zur Verfügung gestellt, um es zu bewerten. Derzeit besitze ich die aktuellste Auflage, diese habe ich selbst erworben.
