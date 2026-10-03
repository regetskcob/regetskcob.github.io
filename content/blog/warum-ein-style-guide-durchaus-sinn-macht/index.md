---
title: "💻 | Warum ein Style Guide durchaus Sinn macht"
date: 2016-11-22T14:10:15+0000
summary: "Warum ein Style Guide in Entwicklerteams Sinn macht: einheitlicher Code ist leichter zu lesen, zu übernehmen und neuen Kollegen zu erklären."
cover: ./cover.jpg
coverAI: true
coverAlt: "KI-generierte Grafik: Zwei Codefenster, links mit unregelmäßig eingerückten Zeilen, rechts mit einheitlicher Einrückung, dazwischen ein roter Pfeil, darunter ein roter Haken"
tags: ["Softwareentwicklung"]
---

Als iOS Entwickler in einem Team aus mehreren Entwicklern stelle ich immer wieder fest, dass jeder seinen eigenen Stil in seinen Code mit einbringt. Das geht so lange gut, wie jeder Entwickler an seinen Quellen arbeitet. Wenn aber nun Entwickler A die Quelle von Entwickler B ändern muss, weil dieser Urlaub hat, gibt es zwei Probleme.

1. Entwickler A muss sich mit dem Stil von B vertraut machen und sich einlesen. Je nach Stil erschwert dieser die Einarbeitung ungemein.
2. Dadurch, dass Entwickler A ebenfalls seinen Code nach seinem persönlichen Gusto verfasst, vermischen sich nun zwei Stile.

Je mehr Entwickler also an derselben Quelle arbeiten, desto unübersichtlicher wird diese. Kommt dann ein neuer Entwickler ins Team, wird dieser mit einem Cocktail aus etlichen persönlichen Vorlieben und Stilen konfrontiert, ohne sich ordentlich auf den Inhalt konzentrieren zu können.

### Was also tun?

Mit wachsendem Umfang der Projekte unseres Teams habe ich für mich damit angefangen, einen Style Guide auszuformulieren. Basierend auf Code-Konventionen, welche unser Abteilungsleiter mal verfasst hatte, aber auch auf Basis eigener Erfahrungen habe ich also damit begonnen eine Art „Manifest“ für den Quellcode unserer iOS-Projekte zu formulieren, an dem sich alle beteiligten Entwickler orientieren sollen.

Diese Vorgaben sollten nicht nur für neu entwickelten Quellcode gelten, sondern für die gesamte Codebasis. Zeilen oder Methoden, die einen Entwickler bei der täglichen Arbeit als nicht-konform zum Manifest auffallen, sollen also umgehend angepasst werden.

Unser gemeinsames Ziel sollte es also sein, sauberen Quellcode zu entwickeln und auch immer wieder einen Frühjahrsputz in der bestehenden Codebasis abzuhalten.

### Fazit

Ein einheitlicher Stil spart Einarbeitungszeit, hält die Codebasis lesbar und macht es leicht, die Arbeit von Kollegen zu übernehmen. Damit ein Style Guide auch gelebt wird, muss er gemeinsam entstehen: Unser Guide ist deshalb mit Projekt- und Abteilungsleitung abgestimmt worden. Nur so lässt sich ein Regelwerk schaffen, das tatsächlich guten Code-Stil fördert.
