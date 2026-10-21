---
title: "⚡️ | Was läuft, wenn Home Assistant ausfällt?"
date: "2026-10-21T19:00:00+02:00"
summary: "Je mehr Home Assistant im Haus übernimmt, desto wichtiger wird die Frage, was ohne es noch geht. Eine Bestandsaufnahme für unser KNX-Haus: was weiterläuft, was ausfällt und wie wir dann zurechtkommen."
# Entwurf: bewusst ohne Details zu Alarm, Kamera und Abwesenheitslogik.
# Offen sind die markierten Stellen […].
draft: true
cover: ./cover.jpg
coverAI: true
coverAlt: "KI-generierte Grafik: Ein Haus im Querschnitt mit zwei Etagen, in denen die Leuchten weiter in warmem Gelb brennen, an den Wänden Taster und Heizungsregler, daneben ein ausgegrauter kleiner Server mit einem rostroten Punkt, nur gestrichelt angebunden"
tags: ["Smarthome"]
---

Home Assistant ist bei uns in den letzten Wochen von der Spielwiese zur Zentrale geworden. Apple Home hängt daran, die Mitteilungen kommen von dort, und die Logik ist vom Gira X1 umgezogen. Das ist bequem, hat aber eine Kehrseite: Ein Raspberry Pi kann ausfallen. Also habe ich aufgeschrieben, was dann noch funktioniert.

## Die Grundregel

KNX macht es einem hier leicht: Taster und Aktoren sprechen direkt miteinander, die Verknüpfungen werden mit der ETS in die Geräte selbst programmiert. Ein Server kommt erst dazu, wenn es um Komfort geht. […stimmt das so für deine Planung?]

## Was weiterläuft

- **Licht und Steckdosen:** Alle Taster schalten und dimmen wie gewohnt.
- **Rollläden:** Einzeln und über die Zentraltaster.
- **Präsenzmelder:** Das Licht in Fluren und im Gäste-WC geht weiter von allein an.
- **Heizung:** Die Raumregler sitzen in den Tastern und steuern die Heizungsaktoren direkt. Die Sollwerte bleiben, wie sie zuletzt waren.
- **Rauchmelder:** Sie sind untereinander vernetzt und brauchen keinen Server.
- **Klingel und Garagentor:** Funktionieren eigenständig.
- **Wärmepumpe:** Regelt sich selbst.
- **Zwei Zeitschaltuhren:** Sie sind bewusst auf dem Gira X1 geblieben.

## Was ausfällt

- **Apple Home:** Alle Zubehöre, Szenen und Siri laufen über die HomeKit-Bridges in Home Assistant. Ohne Home Assistant bleibt das iPhone stumm, und es geht zurück an die Taster.
- **Mitteilungen:** Keine Nachricht, wenn die Waschmaschine fertig ist oder jemand klingelt. Der Gong selbst klingelt trotzdem.
- **Automatische Rollläden und Beschattung:** Abends und morgens fährt nichts von allein.
- **Energie und Wasser:** Keine Daten, keine Wächter.
- **Fenster und Heizung in einigen Räumen:** Dazu gleich mehr.

## Ein Fallstrick: Fenster und Heizung

In einigen Räumen meldet ein Fensterkontakt direkt an den Heizungsaktor, dass gelüftet wird. In anderen Räumen läuft diese Meldung über Home Assistant. Fällt Home Assistant aus, behalten die Regler dort den letzten Zustand. War das Fenster gerade offen, bleibt der Raum auf Frostschutz. War es zu, heizt der Raum weiter, auch wenn jemand das Fenster öffnet.

Dazu kommt ein zweiter Punkt: Home Assistant schickt den Fensterzustand nur bei einer Änderung auf den Bus, nicht beim Neustart. Wird während eines Ausfalls ein Fenster geöffnet oder geschlossen, erfährt der Regler davon erst bei der nächsten Änderung. Im Zweifel hilft es, das Fenster einmal kurz zu öffnen und wieder zu schließen.

[…Plan: Sollen diese Räume ebenfalls direkt in der ETS verknüpft werden?]

## Der unscheinbare Single Point of Failure

Home Assistant spricht über den Gira X1 mit dem Bus. Fällt der X1 aus, ist Home Assistant vom Bus getrennt, auch wenn es selbst einwandfrei läuft. Für die Familie sieht das genauso aus wie ein Ausfall von Home Assistant. Eine Automation prüft deshalb regelmäßig, ob der X1 erreichbar ist.

## Für den Ernstfall

Damit es nicht beim Wissen in meinem Kopf bleibt, gibt es eine Wiederaufbau-Anleitung. Sie beschreibt, wie Home Assistant nach einem Totalausfall wieder so dasteht wie vorher, inklusive Backup und aller Helfer. Die Backups landen zusätzlich außer Haus in der Cloud. […Häufigkeit prüfen]

Wenn ihr selbst ein KNX-Haus mit Home Assistant betreibt, empfehle ich euch, diese Liste einmal für euer eigenes Haus aufzuschreiben. Bei mir ist dabei mehr herausgekommen, als ich erwartet hatte.
