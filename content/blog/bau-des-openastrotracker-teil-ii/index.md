---
title: "🔭 | Bau des OpenAstroTracker - Teil II"
date: "2026-01-26T18:53:08+01:00"
summary: "Aus den gedruckten Teilen wird ein Tracker: Gewindeeinsätze, Steuerplatine, Verkabelung, Raspberry Pi und die erste Kamera auf der Montierung. Was beim Zusammenbau zwischen den Jahren und im Januar passiert ist."
# Vorschau in der Blog-Liste ("In Arbeit"), noch keine eigene Seite: nicht
# rendern, in keiner Liste führen. Zum Veröffentlichen diesen Block und den
# Namen unter "soon" in content/blog/_index.md entfernen, "soon" hier auch.
# Optional: soon: Oktober  ->  "demnächst · Oktober"
build:
  render: never
  list: never
soon: Januar 2027
cover: ./cover.jpg
coverAlt: "Der fertig aufgebaute OpenAstroTracker auf einem Teppichboden: schwarzes Gehäuse mit Handbox und Display, weiße gedruckte Räder und Arme, darauf ein schwarzes Objektiv"
series: "Bau des OpenAstroTracker"
seriesLabel: "Teil II: Aufbau und Elektronik"
tags: ["Fotografie"]
---

Seit [Teil I](/blog/bau-des-openastrotracker-teil-i/) ist einiges passiert: Der Drucker hat die letzten Teile ausgespuckt, und zwischen den Jahren ging es an den Zusammenbau. Aus einem Haufen weißer und schwarzer Kunststoffteile wurde in vier Wochen ein Tracker, der inzwischen fertig auf dem Teppich steht und auf einen klaren Himmel wartet.

## Gewindeeinsätze setzen

Bevor sich die gedruckten Teile verschrauben lassen, brauchen sie Gewinde. Dafür kommen Messing-Einsätze in den Kunststoff, die ich mit einem Lötkolben einschmelze. Damit das gerade und senkrecht klappt, steckt der Kolben bei mir in einem gedruckten Bohrständer, und die Bauanleitung läuft parallel auf dem Laptop.

![Ein Lötkolben im orangen Ständer setzt Messing-Gewindeeinsätze in das weiße Speichenrad, daneben der Laptop mit der Bauanleitung](./einsaetze-setzen.jpg)

Die Einsätze sitzen nach ein paar Sekunden fest. Wichtig ist, nicht zu viel Druck auszuüben und den Kolben gerade zu halten, sonst schmilzt das Material schief.

{{< images >}}
![Der Lötkolben setzt die Einsätze in die Unterseite des schwarzen Gehäuses](./gehaeuse-einsaetze.jpg)
![Die fertige Gehäuseplatte mit allen Messing-Einsätzen und einer Aussparung](./gehaeuse-platte.jpg)
{{< /images >}}

## Die Steuerplatine

Kurz nach Weihnachten kam die Steuerplatine an. Sie bekommt die Treiber für die Schrittmotoren und wird per USB mit dem Rechner verbunden, um die Firmware aufzuspielen. Während auf einem Laptop die Anleitung lief, habe ich auf dem anderen die Platine eingerichtet.

![Die Steuerplatine mit zwei blauen Treibermodulen liegt auf Luftpolsterfolie, dahinter zwei Laptops mit Anleitung und Software](./steuerplatine.jpg)

## Zwischendurch gedruckt

Auch während des Zusammenbaus lief der Drucker weiter. Ein Halter wanderte zuerst in ein CAD-Programm, damit ich ihn mir von allen Seiten ansehen konnte, und von dort in den Slicer für den P1S.

{{< images >}}
![Ein Halter mit vier Bohrungen und einem runden Zapfen in der CAD-Ansicht](./cad-halter.jpg)
![Derselbe Halter im Slicer auf der Druckplatte](./slicer-halter.jpg)
{{< /images >}}

Die hellen Teile, die in Teil I noch auf dem Drucktisch lagen, sind inzwischen ein Ensemble aus Bögen, Armen und kleinen Verbindern. So langsam erkennt man, wie daraus später die Montierung wird.

![Weiße gedruckte Teile auf grauem Grund: ein langer Arm mit gebogenen Enden, ein Würfel, ein Verbinder und kleine Scheiben](./weisse-teile.jpg)

## Verkabelung

Das Herz des Trackers sitzt im schwarzen Gehäuse. Dort liegt die Platine, von der Kabel zu den Motoren, zum Display und zu den Sensoren laufen. Die Reihenfolge, in der die Stecker auf die Platine gehören, steht in der Anleitung. Ich habe sie mir ausgedruckt und beim Stecken abgehakt, denn bei dieser Menge an Kabeln geht schnell etwas durcheinander.

{{< images >}}
![Die Steuerplatine liegt im geöffneten Gehäuse, davor ein buntes Flachbandkabel und lose Steckerleisten](./platine-im-gehaeuse.jpg)
![Nahaufnahme der Platine mit Flachbandkabel, farbigen Steckern für die Motoren und bunten Kabeln](./verkabelung-detail.jpg)
{{< /images >}}

## Raspberry Pi und Gehäuse

Anfang Januar zog der Raspberry Pi ins Gehäuse ein, daneben ein GPS-Modul. Der Pi steuert später die Aufnahmen, das GPS liefert dem Tracker Uhrzeit und Standort. Vorne sitzt die Handbox, über die sich der Tracker auch ohne Rechner bedienen lässt.

{{< images >}}
![Das schwarze, spitz zulaufende Gehäuse von oben: Raspberry Pi, Platine, Flachbandkabel und GPS-Modul sind verbaut, vorne die Handbox](./raspberry-gehaeuse.jpg)
![Das Gehäuse von der Seite, im Inneren Raspberry Pi und Platine mit bunten Kabeln](./raspberry-seitenansicht.jpg)
{{< /images >}}

Am nächsten Tag wurde es ordentlicher. Die Kabel liegen jetzt sauber an den Wänden, und der erste Strom floss: An der Platine leuchten rote LEDs, ein gutes Zeichen.

![Seitenansicht des Gehäuses, im Inneren geordnete Kabel und rot leuchtende LEDs an der Platine](./verdrahtung-seite.jpg)

Einen Tag später hing die Handbox mit ihrem Display am Gerät. Mit Zwingen fixiert und dem ausgedruckten Schaltplan daneben ging es an die letzten Verbindungen, zum Beispiel für den Hall-Sensor, mit dem sich der Tracker selbständig in die Ausgangsposition fährt.

![Das Gehäuse mit angeschlossener Handbox, mit Zwingen gehalten, davor ein ausgedruckter Schaltplan der Platine](./handbox-schaltplan.jpg)

## Kamera und Software

Am 8. Januar saß die Mechanik: Das große weiße Rad sitzt in der Achse, der Riemen läuft, und am Alu-Profil hängt das erste Objektiv samt Leitrohr. Die Optik, die ich später für Aufnahmen nutzen möchte, trägt eine Bahtinov-Maske, mit der sich der Fokus auf Sterne sauber einstellen lässt.

{{< images >}}
![Die Mechanik des Trackers: weißes Speichenrad, schwarzer Bogen mit der Aufschrift OpenAstroTracker und ein Objektiv auf dem Alu-Profil](./kamera-montiert.jpg)
![Blick von vorn auf die Kamera mit Bahtinov-Maske und das schwarze Leitrohr auf dem Alu-Profil](./bahtinov-leitrohr.jpg)
{{< /images >}}

Die Software läuft auf dem Raspberry Pi. Ich habe mich für StellarMate OS entschieden. Vom Schreibtisch aus kann ich per Display, Tastatur und Maus alles einrichten, ohne dass der Tracker draußen im Dunkeln stehen muss.

![Der Tracker mit offenem Gehäuse auf dem Schreibtisch, rechts ein Display mit StellarMate OS auf einem flexiblen Stativ, davor Tastatur und Maus](./stellarmate.jpg)

## Stand heute

Ende Januar steht der Tracker komplett aufgebaut da. Es fehlt nur noch, was man nicht planen kann: ein klarer Himmel. Sobald das Wetter mitspielt, geht es hinaus, und dann wird sich zeigen, wie gut er nachführt.
