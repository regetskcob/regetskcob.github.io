---
title: '⚡️| II: Messwert-Visualisierung mit NodeRED, InfluxDB und Grafana'
title_plain: '️| II: Messwert-Visualisierung mit NodeRED, InfluxDB und Grafana'
date: 2022-10-31T19:32:44+0000
lastmod: 2024-12-28T11:04:33+0000
slug: ii-messwert-visualisierung-mit-nodered-influxdb-und-grafana
draft: false
type: post
author: Daniel Bocksteger
reading_time: 5
summary: "Im zweiten Teil verbinden wir die Systeme: ein Bucket in InfluxDB, ein Flow in NodeRED, der KNX-Telegramme mitschreibt, und die Datenquelle in Grafana."
author_bio: Mein Name ist Daniel Bocksteger, geboren wurde ich 1995 in Goch am Niederrhein.
  Seit Sommer 2022 wohne ich mit meiner Partnerin in Kalkar in unserem Eigenheim.
author_image: https://regetskcob.mymagic.page/content/images/2024/11/IMG_9656-1.jpeg
featured_image: ./bildschirmfoto-2022-10-31-um-20.16.15.png
cover: ./bildschirmfoto-2022-10-31-um-20.16.15.png
seo:
  image: ./bildschirmfoto-2022-10-31-um-20.16.15.png
aliases: ["/posts/ii-messwert-visualisierung-mit-nodered-influxdb-und-grafana/"]
tags: ["Smarthome"]
---

Im [ersten Teil dieser Anleitung](/blog/i-messwert-visualisierung-mit-nodered-influxdb-und-grafana/) haben wir NodeRED, InfluxDB und Grafana installiert. Als erstes könnt ihr Grafana und InfluxDB einmal aufrufen (URLs im ersten Teil) und dort jeweils einen Account anlegen.

## InfluxDB vorbereiten

Als erstes bereiten wir nun unsere Datenablage mit der InfluxDB vor. Dazu erstellen wir ein sog. Bucket, im Datenbank-Sprech wie eine Tabelle.

Ich nenne mein Bucket im weiteren Verlauf "KNX".

![InfluxDB-Oberfläche unter Load Data, Reiter Buckets mit dem Bucket KNX, ein Pfeil zeigt auf Create Bucket](./bildschirmfoto-2022-10-27-um-20.56.10-1.png)![InfluxDB-Dialog Create Bucket mit Namensfeld, Löschen der Daten auf Never gestellt](./bildschirmfoto-2022-10-27-um-20.56.13-1.png)

## NodeRED einrichten

Der nötige Flow (so nennt man in NodeRED einen Prozess) sieht relativ simpel aus.

![Node-RED-Flow: der Node KNX Device führt über Prepare und Filter in den Node InfluxDB, dazu zwei Debug-Nodes vor und nach der Aufbereitung](./bildschirmfoto-2022-10-27-um-21.24.23.png)

Im Grunde ist er es auch. Es wird ein KNX Knoten eingesetzt um Telegramme auf dem Bus mitzulesen. Diese wird mit den Knoten "Prepare" und "Filter" aufbereitet und anschließend über den InfluxDB Knoten in die Datenbank geschrieben.

Als erstes installieren wir die zusätzlichen Pakete für die KNX und InfluxDB Anbindung.

![Node-RED-Editor mit dem KNX-Flow, im geöffneten Hauptmenü ist Palette verwalten markiert](./bildschirmfoto-2022-10-27-um-21.32.39.png)![Palette verwalten in Node-RED, Suche nach knx, das installierte KNX-Paket ist markiert](./bildschirmfoto-2022-10-27-um-21.41.39.png)![Palette verwalten in Node-RED, Suche nach influx, das installierte Paket node-red-contrib-influxdb ist markiert](./bildschirmfoto-2022-10-27-um-21.32.19.png)

### Verbindung zum KNX Bus

Da wir die Werte vom KNX Bus in unsere InfluxDB schreiben wollen um diese zu visualisieren benötigen wir einen Knoten, der die Schnittstelle zum Bus bereitstellt. Dieser ist der 'KNX Device'-Knoten. Dort konfiguriert ihr die Schnittstelle mit IP-Adresse eures KNX-IP-Gateways, dessen Port und importiert eine CVS der Gruppenadressen aus eurem ETS-Projekt.

![Eigenschaften des KNX-Device-Nodes in Node-RED, das Stift-Symbol zum Bearbeiten des Gateways ist markiert](./bildschirmfoto-2022-10-27-um-21.30.58.png)![Konfiguration des KNX/IP-Gateways in Node-RED mit Port 3671 und Tunnel UDP, der Abschnitt Import der ETS-Gruppenadressliste ist markiert](./bildschirmfoto-2022-10-27-um-21.25.35.png)

### Verbindung zur InfluxDB

Um NodeRED nun mit der InfluxDB zu koppeln benötigen wir einen sog. API Token. Diesen erstellen wir mit Lese & Schreib-Berechtigung und weisen ihm den KNX Bucket zu.

![InfluxDB-Oberfläche unter API Tokens, ein Pfeil zeigt auf Generate API Token und Read/Write API Token](./bildschirmfoto-2022-10-27-um-20.56.40.png)![InfluxDB-Dialog Generate Read/Write API Token, Lese- und Schreibrecht sind jeweils auf den Bucket KNX beschränkt](./bildschirmfoto-2022-10-27-um-20.56.53.png)

Diesen Token könnt ihr nun kopieren und in den Einstellungen des InfluxDB Knoten einsetzen. Außerdem geben wir den Hostname und Port an, unter dem die Installation erreichbar ist. Bei mir ist es localhost, da alles auf dem gleichen Pi läuft und der Standardport der InfluxDB.

![Konfiguration des InfluxDB-Nodes in Node-RED: Version 2.0, URL http://localhost:8086, das Feld für den Token ist markiert](./bildschirmfoto-2022-10-27-um-21.31.41.png)

### Aufbereitung der Daten für die InfluxDB

Nun, wo ein- und ausgehende Schnittstelle konfiguriert sind können wir die eingehenden Daten für die Speicherung aufbereiten.

![Prepare-Funktion auf die Struktur der KNX Telegramme.](./bildschirmfoto-2022-10-27-um-21.30.45.png)Prepare - Vorbereitung der Struktur![Entfernen nicht benötigter Informationen zur Speicherung, Verschieben der nötigen Informationen in die richtigen Bereiche.](./bildschirmfoto-2022-10-27-um-21.31.13.png)Filter - Auf nötige Informationen beschränken

### Alles verknüpfen

Im letzten Schritt können die eingesetzten Knoten miteinander verknüpft werden. Zusätzlich habe ich bei mir zwei Debug-Knoten für die Telegramm-Pakete eingefügt, die den Zustand (das Format) der Nachricht zur Fehlersuche ausgeben.

## Daten mit Grafana auslesen

![Grafana-Menü Configuration, der Eintrag Data sources ist ausgewählt](./bildschirmfoto-2022-10-31-um-20.21.18.png)

Zuerst müssen wir in Grafana eine sog. Datenquelle konfigurieren, um das System mit der InfluxDB 'vertraut' zu machen.

Ist das erledigt können wir die Datenquelle erstellen und konfigurieren. In meinem Fall liegen alle System wie bereits erwähnt auf dem gleichen RaspberryPi, daher ist auch InfluxDB per localhost zu erreichen.

![Grafana-Datenquelle InfluxDB mit der Abfragesprache Flux und der URL http://localhost:8086](./bildschirmfoto-2022-10-31-um-20.19.29.png)![Weitere Einstellungen der Grafana-Datenquelle: Basic Auth mit Benutzer grafana, InfluxDB-Organisation KNX, Token und Default Bucket KNX](./bildschirmfoto-2022-10-31-um-20.19.44.png)

Danach könnt ihr die Datenquelle nutzen um eure Dashboard-Views zu füttern. Konkret filtere ich die vorhandenen Datenpunkte nach den GA*-Bezeichnungen.

![Grafana-Panel Außenbereich mit den Kurven von drei Helligkeitssensoren und der Außentemperatur über den Nachmittag, darunter die Flux-Abfrage](./bildschirmfoto-2022-10-31-um-20.18.16.png)

* * *

*GA: Gruppenadresse
