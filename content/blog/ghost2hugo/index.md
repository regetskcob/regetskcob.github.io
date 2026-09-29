---
title: "👨🏻‍💻 | Den Umzug von Ghost zu Hugo vereinfachen"
title_plain: "Den Umzug von Ghost zu Hugo vereinfachen"
date: "2025-11-02T00:40:04-07:00"
lastmod: 2026-09-29T14:00:00+0000
summary: "Ein kleines Python-Skript, das Ghost-Backups in Markdown-Dateien für Hugo umwandelt. Mit englischer Übersetzung am Ende."
description: "Ein kleines Python-Skript, das ein Ghost-Backup in Markdown-Beiträge für Hugo umwandelt, für alle, die ihren Blog von Ghost auf eine statische Seite umziehen. Mit englischer Übersetzung."
cover: ./cover.jpg
coverAlt: "Abstrakte Grafik: Eine diffuse Wolke aus Punkten zieht sich durch einen schmalen Spalt und ordnet sich rechts zu einem Raster aus zwölf Dokumentkarten"
draft: false
readTime: true
autonumber: false
math: false
aliases: ["/posts/ghost2hugo/"]
tags: ["Softwareentwicklung"]
---

Als ich mit diesem Blog von Ghost zu GitHub Pages mit Hugo umgezogen bin, stand ich vor der Aufgabe, alle bisherigen Beiträge noch einmal als Markdown-Dateien für Hugo anzulegen. Nach den ersten paar Beiträgen von Hand habe ich die Aufgabe an ChatGPT abgegeben. Der eigentliche Autor des Codes ist also eher ChatGPT, bis das Ergebnis gepasst hat, hat es aber einige Prompts und Iterationen gebraucht.

Herausgekommen ist ein kleines Python-Skript, das ein Ghost-Backup einliest und daraus Markdown-Dateien für Hugo erzeugt. Wer ebenfalls von Ghost zu einem Static Site Generator wie Hugo wechseln möchte, kann [mein Skript][1] gerne ausprobieren.

## English version

This is usually a German blog. Since this topic is relevant to the whole Ghost community, here is the post in English as well.

When I moved this blog from Ghost to GitHub Pages with Hugo, I was facing the task of recreating every post as a Hugo markdown file. After the first few by hand, I handed the job over to ChatGPT. So the real author of the code might be ChatGPT, but it took quite a few prompts and iterations to get a satisfying result.

The outcome is a small Python script that reads a Ghost backup file and turns it into Hugo markdown posts. If you want to migrate from Ghost to a static site generator such as Hugo, give [my script][1] a try.

[1]:	https://github.com/regetskcob/Ghost2Hugo "my Script"
