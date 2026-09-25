---
title: ⚡️ | Zentraler Wohnhaus-Alarm mit KNX
title_plain: ️ | Zentraler Wohnhaus-Alarm mit KNX
date: 2022-12-14T17:30:00+0000
lastmod: 2024-11-17T15:04:08+0000
slug: zentraler-wohnhaus-alarm-mit-knx
draft: false
type: post
author: Daniel Bocksteger
reading_time: 2
summary: "Ein Schalter am Nachttisch weckt das ganze Haus. So haben wir unseren Alarm über eine zentrale KNX-Gruppenadresse gelöst, und so lässt er sich noch erweitern."
author_bio: Mein Name ist Daniel Bocksteger, geboren wurde ich 1995 in Goch am Niederrhein.
  Seit Sommer 2022 wohne ich mit meiner Partnerin in Kalkar in unserem Eigenheim.
author_image: https://regetskcob.mymagic.page/content/images/2024/11/IMG_9656-1.jpeg
aliases: ["/posts/zentraler-wohnhaus-alarm-mit-knx/"]

---

In manch vorigem Artikel war es bereits Thema, wir haben erst kürzlich unser Einfamilienhaus mit KNX bezogen, seit dem ist das Bus-System das "Dauerbrenner-Projekt" bei mir.

Heute möchte ich darauf eingehen, wie wir unseren momentanen Alarm im Haus umgesetzt haben und welche Erweiterungsmöglichkeiten noch offen stehen. Voraussetzung zum Nachvollziehen ist grundlegendes Verständnis darüber, wie KNX funktioniert.

Wichtigster Bestandteil des Alarms ist eine zentrale Gruppenadresse "S.O.S An/Aus", die wir u.A. vom Bett aus schalten können. Jeder hat an seinem Nachttisch einen entsprechenden Schalter. Wird der Schalter aktiviert werden unterschiedlichste Systeme in gang gesetzt.

  * Alle Leuchtmittel im Haus werden angeschaltet
  * Alle Rollladen werden hoch gefahren
  * Alle Rauchmelder geben massiven Krach von sich
    * Umgesetzt mit Hilfe der Gira DualQ und zwei KNX Modulen können alle Rauchwarnmelder über den Nebenstellenalarm aktiviert werden
  * Alle Außenleuchten werden angeschaltet

Mögliche Schritte zur Erweiterung sind die Einbindung von Sonos Boxen zur verstärkten Ausgabe von Warn-/Rufsignalen sowie das Einsetzen eines sog. Telegramm-Generators, um eine Art Strohboskop-Effekt in bestimmten Beleuchtungen zu realisieren (z.B. für mehr äußere Aufmerksamkeit).
