---
title: "💻 | Claude als Hauswart"
date: "2026-10-21T18:10:00+02:00"
summary: "In einer Woche sind über 180 Commits Dokumentation und Automationen für unser Smart Home entstanden. Wie ich Claude Code an Home Assistant angebunden habe, welche Regeln es dabei gibt und was beim gemeinsamen Durchsehen des Hauses alles aufgefallen ist."
# Entwurf: offen sind die markierten Stellen […]. Keine Webhook-URL, IPs, Netzplan
# oder Sicherheitsdetails übernehmen.
draft: true
cover: ./cover.jpg
coverAI: true
coverAlt: "KI-generierte Grafik: Links ein dunkles Terminalfenster mit Zeilen und einem rostroten Prompt, rechts der Umriss eines Hauses mit kleinen Geräten, dazwischen eine gepunktete Verbindung"
series: "Unser KNX-Haus"
seriesLabel: "Teil V: Eine Woche mit Claude"
tags: ["Smarthome", "Softwareentwicklung"]
---

Vor ein paar Wochen habe ich beschrieben, [wie Claude die Wartung meines Blogs vereinfacht](/blog/wie-claude-die-wartung-meines-blogs-vereinfacht/). Mitte Oktober habe ich dasselbe mit unserem Smart Home ausprobiert. Eine Woche und gut 180 Commits später ist das Haus besser dokumentiert als je zuvor, und einiges läuft anders als vorher.

## Die Ausgangslage

Unser Haus läuft mit KNX, Home Assistant auf einem Raspberry Pi und Apple Home als Oberfläche für die Familie. Dokumentiert war das an vielen Stellen: Planungsunterlagen aus der Bauzeit, ETS-Projekte, eine Numbers-Tabelle für den Netzwerkschrank und ein paar Notizen. Ein Überblick fehlte.

## Die Anbindung

Für Home Assistant gibt es einen MCP-Server, der als Integration in Home Assistant läuft. Darüber kann Claude Code Zustände und Verläufe abfragen, Automationen und Helfer lesen und schreiben und Statistiken korrigieren. Die Adresse des Servers wirkt wie ein Passwort und liegt deshalb nur in meiner lokalen Konfiguration.

Dazu kam ein privates Git-Repo. Darin liegen die Dokumentation und ein Abzug der YAML-Konfiguration. Die Quelle der Wahrheit bleibt aber immer das laufende Home Assistant.

## Die Regeln

In einer `CLAUDE.md` im Repo stehen die festen Regeln für jede Session. Die wichtigsten:

- **Keine Geheimnisse:** Passwörter, Tokens und Zugangsdaten kommen weder ins Repo noch in den Chat. Die gebe ich selbst ein.
- **Erst messen, dann behaupten:** Zustände und Verläufe abfragen statt raten, Schwellen von Automationen an echten Verläufen prüfen.
- **HomeKit-Wirkung vorher ankündigen:** Manche Änderungen erzeugen in Apple Home neue Zubehöre oder lassen alte verschwinden. Das muss ich vorher wissen.
- **Alltagsbetrieb hat Vorrang:** Was die Familie täglich benutzt, muss jederzeit funktionieren. Umbauten brauchen einen Rückweg, und Bestehendes wird erst abgeschaltet, wenn der Ersatz läuft.
- **Nach jeder Änderung:** Konfiguration ins Repo ziehen, Dokumentation und Changelog nachführen, das zugehörige Issue aktualisieren, committen.

Offene Punkte landen als GitHub-Issues im Repo. Ein Hook zeigt sie zu Beginn jeder Session an, damit nichts verloren geht.

## Eine Woche in Zahlen

Das Repo ist am 14. Oktober entstanden. Die ersten vier Tage waren die intensivsten, mit 33, 49, 46 und 37 Commits. Danach wurde es ruhiger. […aktuelle Zahl der Commits und Issues]

## Was dabei herauskam

Spannender als die Zahlen ist, was beim systematischen Durchsehen aufgefallen ist. Die größeren Funde bekommen in dieser Serie jeweils einen eigenen Teil:

- **Die Logik des Gira X1:** Neun Logikblätter, ausgelesen, nachgezeichnet und nach Home Assistant umgezogen. Dabei kamen ein endlos zählender Regensensor und eine Abfrage an eine längst ausgebaute Fritz!Box ans Licht.
- **Der Netzwerkschrank:** Mit einem Messstecker davor ließ sich zeigen, was jedes Gerät kostet. Pi-hole und HKKNX sind seitdem abgeschaltet.
- **Der Wasserzähler:** Seine Fehllesungen korrigiert jetzt eine Automation selbst.
- **Die Rollläden:** Beim Nachtmodus sprang der Hauszähler kurz auf über 4.000 W. Der Grund waren 20 Rollladenmotoren, die gleichzeitig fahren. Der Lesekopf hatte das vorher kaum erfasst, weil er nur alle 90 Sekunden sendete und eine Fahrt nur etwa 25 Sekunden dauert. Jetzt sendet er alle zehn Sekunden. […Ergebnis der Messung je Motor]
- **Eine Ausfall-Liste:** Was ohne Home Assistant weiterläuft und was nicht.
- **Statistik-Korrekturen:** Falsche Sprünge im Energie-Dashboard, etwa durch einen Einheitenwechsel, sind korrigiert und protokolliert.

## Wie die Zusammenarbeit aussieht

[…eigene Sicht: Wie fühlt sich das an? Wo musstest du bremsen oder korrigieren? Was würdest du anderen raten?]

## Fazit

[…eigenes Fazit]

## Fortsetzung folgt…
