---
title: "⚡️ | KNX-Messwerte mit NodeRED in InfluxDB schreiben und in Grafana zeigen"
date: 2022-10-31T19:32:44+0000
lastmod: 2026-09-29T15:00:00+0000
summary: "Im zweiten Teil verbinden wir die Systeme: ein Bucket in InfluxDB, ein Flow in NodeRED, der KNX-Telegramme mitschreibt, und die Datenquelle in Grafana."
cover: ./bildschirmfoto-2022-10-31-um-20.16.15.png
coverAlt: "Grafana-Dashboard „Außenbereich“ mit Kurven zu Helligkeit, Temperatur, Regen und Windgeschwindigkeit über mehrere Tage"
series: "Messwert-Visualisierung mit NodeRED, InfluxDB und Grafana"
seriesLabel: "Teil II: Die Systeme verbinden"
aliases: ["/posts/ii-messwert-visualisierung-mit-nodered-influxdb-und-grafana/"]
tags: ["Smarthome"]
---

Im [ersten Teil dieser Anleitung](/blog/i-messwert-visualisierung-mit-nodered-influxdb-und-grafana/) haben wir NodeRED, InfluxDB und Grafana installiert. Als Erstes ruft ihr Grafana und InfluxDB einmal auf (die Adressen stehen im ersten Teil) und legt dort jeweils einen Account an.

## InfluxDB vorbereiten

Zuerst bereiten wir die Datenablage in InfluxDB vor. Dazu erstellen wir ein sogenanntes Bucket, im Datenbank-Sprech so etwas wie eine Tabelle.

Ich nenne mein Bucket im weiteren Verlauf "KNX".

![InfluxDB-Oberfläche unter Load Data, Reiter Buckets mit dem Bucket KNX, ein Pfeil zeigt auf Create Bucket](./bildschirmfoto-2022-10-27-um-20.56.10-1.png)![InfluxDB-Dialog Create Bucket mit Namensfeld, Löschen der Daten auf Never gestellt](./bildschirmfoto-2022-10-27-um-20.56.13-1.png)

## NodeRED einrichten

Der nötige Flow (so nennt man in NodeRED einen Prozess) sieht relativ simpel aus.

![Node-RED-Flow: der Node KNX Device führt über Prepare und Filter in den Node InfluxDB, dazu zwei Debug-Nodes vor und nach der Aufbereitung](./bildschirmfoto-2022-10-27-um-21.24.23.png)

Im Grunde ist er das auch. Ein KNX-Knoten liest die Telegramme auf dem Bus mit. Diese werden von den Knoten „Prepare“ und „Filter“ aufbereitet und anschließend über den InfluxDB-Knoten in die Datenbank geschrieben.

Als Erstes installieren wir die zusätzlichen Pakete für die Anbindung an KNX und InfluxDB.

![Node-RED-Editor mit dem KNX-Flow, im geöffneten Hauptmenü ist Palette verwalten markiert](./bildschirmfoto-2022-10-27-um-21.32.39.png)![Palette verwalten in Node-RED, Suche nach knx, das installierte KNX-Paket ist markiert](./bildschirmfoto-2022-10-27-um-21.41.39.png)![Palette verwalten in Node-RED, Suche nach influx, das installierte Paket node-red-contrib-influxdb ist markiert](./bildschirmfoto-2022-10-27-um-21.32.19.png)

### Verbindung zum KNX-Bus

Da wir die Werte vom KNX-Bus in InfluxDB schreiben wollen, um sie zu visualisieren, brauchen wir einen Knoten, der die Schnittstelle zum Bus bereitstellt. Das ist der Knoten „KNX Device“. Dort konfiguriert ihr die Schnittstelle mit der IP-Adresse eures KNX-IP-Gateways und dessen Port und importiert eine CSV-Datei mit den Gruppenadressen aus eurem ETS-Projekt.

![Eigenschaften des KNX-Device-Nodes in Node-RED, das Stift-Symbol zum Bearbeiten des Gateways ist markiert](./bildschirmfoto-2022-10-27-um-21.30.58.png)![Konfiguration des KNX/IP-Gateways in Node-RED mit Port 3671 und Tunnel UDP, der Abschnitt Import der ETS-Gruppenadressliste ist markiert](./bildschirmfoto-2022-10-27-um-21.25.35.png)

### Verbindung zur InfluxDB

Um NodeRED mit InfluxDB zu koppeln, brauchen wir einen sogenannten API-Token. Diesen erstellen wir mit Lese- und Schreibberechtigung und weisen ihm das Bucket KNX zu.

![InfluxDB-Oberfläche unter API Tokens, ein Pfeil zeigt auf Generate API Token und Read/Write API Token](./bildschirmfoto-2022-10-27-um-20.56.40.png)![InfluxDB-Dialog Generate Read/Write API Token, Lese- und Schreibrecht sind jeweils auf den Bucket KNX beschränkt](./bildschirmfoto-2022-10-27-um-20.56.53.png)

Den Token kopiert ihr in die Einstellungen des InfluxDB-Knotens. Außerdem gebt ihr Hostname und Port an, unter denen die Installation erreichbar ist. Bei mir sind das localhost, da alles auf demselben Pi läuft, und der Standardport von InfluxDB.

![Konfiguration des InfluxDB-Nodes in Node-RED: Version 2.0, URL http://localhost:8086, das Feld für den Token ist markiert](./bildschirmfoto-2022-10-27-um-21.31.41.png)

### Aufbereitung der Daten für die InfluxDB

Jetzt, wo ein- und ausgehende Schnittstelle konfiguriert sind, können wir die eingehenden Daten für die Speicherung aufbereiten.

![Prepare-Funktion auf die Struktur der KNX Telegramme.](./bildschirmfoto-2022-10-27-um-21.30.45.png)Prepare - Vorbereitung der Struktur![Entfernen nicht benötigter Informationen zur Speicherung, Verschieben der nötigen Informationen in die richtigen Bereiche.](./bildschirmfoto-2022-10-27-um-21.31.13.png)Filter - Auf nötige Informationen beschränken

### Alles verknüpfen

Im letzten Schritt werden die Knoten miteinander verknüpft. Zusätzlich habe ich zwei Debug-Knoten eingefügt, die zur Fehlersuche den Zustand, also das Format der Nachricht, ausgeben.

## Daten mit Grafana auslesen

![Grafana-Menü Configuration, der Eintrag Data sources ist ausgewählt](./bildschirmfoto-2022-10-31-um-20.21.18.png)

Zuerst müssen wir in Grafana eine sogenannte Datenquelle anlegen, um das System mit InfluxDB „vertraut“ zu machen.

In meinem Fall liegen alle Systeme, wie bereits erwähnt, auf demselben Raspberry Pi, daher ist auch InfluxDB über localhost erreichbar.

![Grafana-Datenquelle InfluxDB mit der Abfragesprache Flux und der URL http://localhost:8086](./bildschirmfoto-2022-10-31-um-20.19.29.png)![Weitere Einstellungen der Grafana-Datenquelle: Basic Auth mit Benutzer grafana, InfluxDB-Organisation KNX, Token und Default Bucket KNX](./bildschirmfoto-2022-10-31-um-20.19.44.png)

Danach könnt ihr die Datenquelle nutzen, um eure Dashboards zu füttern. Konkret filtere ich die vorhandenen Datenpunkte nach den Bezeichnungen der Gruppenadressen.

![Grafana-Panel Außenbereich mit den Kurven von drei Helligkeitssensoren und der Außentemperatur über den Nachmittag, darunter die Flux-Abfrage](./bildschirmfoto-2022-10-31-um-20.18.16.png)
