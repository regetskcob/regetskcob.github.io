---
title: "⚡️ | Ein analoger Wasserzähler lernt lesen"
date: "2026-10-21T18:40:00+02:00"
summary: "Unser Wasserzähler ist analog, ein smarter Zähler war nicht zu bekommen. Seit Januar liest ihn eine kleine Kamera mit AI on the Edge ab und schickt den Stand an Home Assistant. Ein Erfahrungsbericht mit Aufbau, Pannen und einer Automation, die Fehllesungen selbst korrigiert."
# Entwurf: offen sind die markierten Stellen […]. Fotos vom Aufbau am Zähler fehlen noch
# (vor dem Import Seriennummer des Zählers abdecken oder wegschneiden).
draft: true
cover: ./cover.jpg
coverAI: true
coverAlt: "KI-generierte Grafik: Ein runder analoger Wasserzähler mit Ziffernrollen und kleinen Zeigern, darüber eine Kamera, von der eine gepunktete Linie zu einer Zahlenanzeige mit Verlaufskurve führt"
series: "Unser KNX-Haus"
seriesLabel: "Teil VIII: Der Wasserzähler"
tags: ["Smarthome", "DIY"]
---

Strom messen wir im Haus schon länger: Zwei Leseköpfe hängen an den Zählern, und KNX misst einzelne Verbraucher. Beim Wasser blieb es beim Blick in den Keller. Unser Versorger baut keinen digital auslesbaren Zähler ein, also habe ich unserem analogen Zähler das Lesen beigebracht.

## Die Idee

[AI on the Edge](https://jomjol.github.io/AI-on-the-edge-device-docs/) ist ein Open-Source-Projekt für einen ESP32 mit Kameramodul. Die Kamera hängt über dem Zähler und fotografiert ihn in festen Abständen. Auf dem ESP32 selbst erkennen kleine neuronale Netze die Ziffernrollen und die Stellung der Zeiger. Heraus kommt ein Zählerstand in Kubikmetern, ganz ohne Cloud.

Auf das Projekt gestoßen bin ich über ein Video und den Artikel bei [haus-automatisierung.com](https://haus-automatisierung.com/hardware/2021/12/19/wasserzaehler-esp-cam.html).

## Der Aufbau

[…Hardware: welches ESP32-CAM-Board, Halterung aus dem 3D-Drucker?, Stromversorgung, Montage am Zähler]

[…Foto vom Aufbau]

Eingerichtet wird das Gerät im Browser. Ihr legt fest, wo die Ziffern und Zeiger im Bild liegen, und wählt die passenden Erkennungsmodelle. Eine kleine LED beleuchtet den Zähler, damit die Bilder bei jeder Tageszeit gleich aussehen.

## Der Weg zu Home Assistant

Im Januar war das noch meine offene Frage. Die Antwort ist MQTT: Das Gerät schickt den Zählerstand, den Durchfluss und ein paar Diagnosewerte an den Broker, Home Assistant liest sie von dort.

Im Energie-Dashboard ist der Zähler als Wasserquelle eingetragen, mit dem Preis je Kubikmeter. So sehe ich den Verbrauch je Tag und Monat und was er kostet.

## Was schiefging

Seit Mitte Januar liefert der Zähler Daten, und nicht alles lief glatt.

- **Der Startwert:** Am Anfang hat das Gerät einen Unsinnswert gemeldet. Als der echte Stand kam, hat Home Assistant den Sprung als Verbrauch gezählt, und der Januar stand mit 125 m³ in der Statistik. Korrigiert habe ich das erst im Oktober.
- **Die Lücke:** Von Ende März bis Ende Juli kamen keine Daten. […Ursache, falls bekannt] Der Verbrauch dieser vier Monate steht jetzt auf einem einzigen Tag, umgerechnet etwa 150 Liter am Tag.
- **Die Fehllesung:** Steht ein Zeiger knapp an einer Ziffergrenze, kippt die Erkennung zwischen zwei Werten. Übernimmt das Gerät dabei einmal einen zu hohen Wert, verwirft es danach jede echte Lesung als „negative Rate“, bis der Verbrauch den falschen Wert eingeholt hat. So sind auch die früheren langen Lücken entstanden.

## Die Fehllesung korrigiert sich selbst

Von Hand lässt sich der Fehler beheben, indem man dem Gerät den aktuellen Rohwert als neuen Vorwert gibt. Das geht über die Weboberfläche oder per MQTT. Ein Detail hat mich dabei Zeit gekostet: Der Wert muss als Zahl in der Nachricht stehen. Als Text wird er stillschweigend ignoriert.

Inzwischen übernimmt das eine Automation in Home Assistant:

- Steht die Meldung „negative Rate“ mindestens 15 Minuten an,
- ist der Rohwert seit mindestens sechs Minuten stabil
- und liegt er höchstens 30 Liter unter dem Vorwert,

dann setzt sie den Vorwert auf den Rohwert und schickt mir eine stille Mitteilung. Größere Abweichungen fasst sie nicht an, die schaue ich mir selbst an.

Dazu kommt ein Wächter, der meldet, wenn längere Zeit ununterbrochen Wasser fließt.

## Was noch kommt

- Die LED etwas dunkler stellen, damit der Reflex in der Bildmitte kleiner wird.
- Die maximale Rate auf einen realistischen Wert senken, damit grobe Fehllesungen gar nicht erst durchkommen.
- […eigene Pläne]

## Fazit

[…eigenes Fazit: Lohnt sich der Aufwand?]

## Fortsetzung folgt…
