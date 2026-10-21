---
title: "⚡️ | Abschied von den Logikblättern im Gira X1"
date: "2026-10-21T18:10:00+02:00"
summary: "Neun Logikblätter liefen jahrelang auf unserem Gira X1. Beim Umzug nach Home Assistant habe ich sie Blatt für Blatt ausgelesen und dabei Fehler gefunden, die niemandem aufgefallen waren: ein Regenzähler ohne Ende, ein Schalter ohne Wirkung und eine Abfrage an eine Fritz!Box, die es nicht mehr gibt."
# Entwurf: offen sind die markierten Stellen […]. Bilder: ein nachgezeichnetes
# Logikblatt (SVG aus dem smart-home-Repo, docs/gira-x1/svg/) wäre ideal, vorher
# auf Gruppenadressen prüfen, die nichts verraten sollen.
draft: true
cover: ./cover.jpg
coverAI: true
coverAlt: "KI-generierte Grafik: Links ein Logikblatt mit grauen Bausteinen und Verbindungslinien, einer davon rostrot markiert, rechts eine schlanke Liste von Automationen, dazwischen ein gepunkteter Pfeil"
tags: ["Smarthome"]
---

Der Gira X1 hängt bei uns seit dem Einzug im Verteiler. Er ist Schnittstelle für die ETS, liefert die Oberfläche für die Gira-App und das Türpanel und hat jahrelang die Logik im Haus ausgeführt. Seit dem 16. Oktober ist der letzte Punkt Geschichte: Alle neun Logikblätter sind deaktiviert, die Logik läuft in Home Assistant.

## Warum der Umzug?

Im Januar habe ich mir notiert, welche Logiken der X1 abbildet, und bin nach der ersten nicht weitergekommen. Das ist bezeichnend. Die Blätter liegen in der GPA-Software, die nur unter Windows läuft, und wer nicht regelmäßig hineinsieht, weiß irgendwann nicht mehr genau, was dort passiert.

Home Assistant war bei uns lange nur ein Versuch nebenher. Inzwischen ist es die Zentrale: Apple Home hängt komplett daran, die Energiedaten laufen dort zusammen, und die Automationen liegen als YAML in einem Git-Repo, wo ich jede Änderung nachlesen kann. Zwei Orte für Logik sind einer zu viel.

## Die Blätter auslesen

Eine GPA-Projektdatei ist im Kern ein ZIP-Archiv mit XML. Darin stehen alle Bausteine, Parameter, Verbindungen und Gruppenadressen. Zusammen mit Claude habe ich daraus jedes Blatt automatisch ausgelesen, als Diagramm im Stil der GPA nachgezeichnet und mit dem ETS-Export und der Home-Assistant-Konfiguration abgeglichen.

[…Bild: ein nachgezeichnetes Logikblatt, z. B. Garage]

Die neun Blätter:

- Bewohner-Präsenz
- Tag und Nacht
- Garage
- Heizung (zentraler Sollwert)
- Regen
- Beschattung
- Pushmeldungen
- Velux
- Fenster-Status

## Was dabei auffiel

Beim Lesen im Detail kam einiges zutage, das im Alltag nie aufgefallen ist, weil man sich an das Verhalten des Hauses gewöhnt.

- **Regen ohne Ende:** Das Regen-Blatt zählt die Regendauer. Der Zähler hing aber hinter einem Filter, der nur das Einschalten durchlässt, und lief nach dem ersten Schauer einfach weiter. Das Haus meldete deshalb fast dauerhaft „anhaltender Regen“.
- **Ein Knopf für zwei Dinge:** In der X1-App gibt es Tasten für Sommer-Beschattung und Regen-Beschattung. Beide setzten dieselbe interne Variable. Die Sommer-Beschattung hat also nie etwas getan.
- **Eine Fritz!Box, die es nicht mehr gibt:** Die Anwesenheit hat der X1 über die Fritz!Box ermittelt, anhand der MAC-Adressen unserer iPhones. Die Fritz!Box ist längst durch UniFi ersetzt, und die iPhones nutzen ohnehin private MAC-Adressen. Das Blatt lief ins Leere.
- **Velux im alten Netz:** Auch das Velux-Blatt sprach sein Gateway noch unter einer Adresse aus dem Fritz!Box-Netz an. Der Regen-Schließbefehl für das Dachfenster kam so nie an.
- **Ein Sollwert für alle:** Das Heizungsblatt hat einen Basis-Sollwert auf alle elf Räume verteilt und dabei überschrieben, was in Apple Home eingestellt war.

## Beispiel Garage

Das Garagenblatt war die eine Logik, die ich im Januar notiert hatte: Wird das Tor bei Dunkelheit geöffnet, gehen Garagenlicht und Außenleuchte an der Haustür für zehn Minuten an. Beim Auslesen zeigten sich gleich drei Schwächen:

- Die Vorwarnung vor dem Ausschalten blinkte an der Haustür, wo meist niemand steht. In der Garage ging das Licht ohne Warnung aus.
- Ausgelöst hat der Torimpuls, also jeder Befehl für Auf, Stopp oder Zu. Das Licht ging auch beim Wegfahren an.
- Wer das Tor per Handsender öffnete, bekam gar kein Licht, weil dann kein Impuls über den Bus läuft.

In Home Assistant reagiert die Automation jetzt auf den echten Torzustand. Sie schaltet ab der Dämmerung, das Licht bleibt an, solange die Kamera in der Garage Bewegung sieht, und die Vorwarnung kommt am Garagenlicht.

## Das Vorgehen

Im Haus müssen Taster, Rollläden und Heizung jeden Tag funktionieren, auch während ich umbaue. Deshalb lief der Umzug Blatt für Blatt nach demselben Muster:

1. Automation in Home Assistant bauen.
2. Parallel beobachten, ohne dass beide Seiten dieselben Gruppenadressen schreiben.
3. Das Blatt im X1 deaktivieren.
4. Ein paar Tage beobachten.
5. Erst dann löschen.

Zwei Zeitschaltuhren sind bewusst auf dem X1 geblieben, eine Deko-Leuchte und das nächtliche Ausschalten des Garagenlichts. Sie laufen dort zuverlässig und sollen auch funktionieren, wenn Home Assistant einmal steht.

## Was der X1 jetzt noch macht

Der X1 bleibt im Verteiler. Er ist die KNX-Schnittstelle für die ETS und für Home Assistant und liefert die Oberfläche für das Türpanel. Das hat eine Kehrseite: Fällt der X1 aus, ist Home Assistant vom Bus getrennt, auch wenn es selbst läuft. Eine Automation prüft deshalb, ob der X1 erreichbar ist.

Noch ein Tipp, falls ihr selbst mit GPA-Projekten arbeitet: In der Projektdatei stehen Zugangsdaten für angebundene Geräte im Klartext. Gebt die Datei also nicht leichtfertig weiter.

## Fazit

[…eigenes Fazit: Was hat der Umzug gebracht, fehlt dir etwas am X1?]
