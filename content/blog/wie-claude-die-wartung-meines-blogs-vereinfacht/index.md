---
title: "👨🏻‍💻 | Wie Claude die Wartung und Entwicklung meines Blogs vereinfacht hat"
# Platzhalter: Ein Datum in der Zukunft baut Hugo nicht, dann fehlte auch die
# Vorschau. Beim Veröffentlichen auf den Tag im November setzen.
date: "2026-09-30T20:00:00+02:00"
summary: "Ein Monat, rund 150 Commits: Wie ich mit Claude Code den Umzug von Ghost aufgeräumt, Suche, Lightbox und Serien gebaut und dabei gelernt habe, was ich besser selbst gegenlese."
description: "Erfahrungsbericht: Wie Claude Code beim Warten und Weiterentwickeln eines Hugo-Blogs auf GitHub Pages geholfen hat, von kaputten Alt-Texten über Bildoptimierung bis zu Suche und Lightbox, und wo ich nachkorrigieren musste."
# Vorschau in der Blog-Liste ("In Arbeit"), noch keine eigene Seite. Zum
# Veröffentlichen diesen Block und den Namen unter "soon" in
# content/blog/_index.md entfernen, "soon" hier auch.
build:
  render: never
  list: never
soon: November
# Cover wird generiert. Wenn es da ist: Datei als cover.jpg in diesen Ordner
# legen und die drei Zeilen einkommentieren.
# cover: ./cover.jpg
# coverAI: true
# coverAlt: "…"
tags: ["Softwareentwicklung"]
---

Dieser Blog läuft seit gut einem Jahr als statische Seite auf GitHub Pages. Der Umzug von Ghost war schnell erledigt, die Arbeit danach nicht. Im September habe ich begonnen, die Seite zusammen mit Claude Code aufzuräumen und weiterzubauen, und aus dem Aufräumen ist ein Monat geworden, in dem ich mehr an der Seite verändert habe als in den elf Monaten davor. Wie das ablief, was es gebracht hat und wo ich eingreifen musste, steht hier.

## Die Ausgangslage

Die alten Beiträge hatte ich mit einem [Skript][1] aus dem Ghost-Backup nach Markdown geholt, das ChatGPT in einigen Iterationen für mich geschrieben hat. Es hat funktioniert, aber nicht sauber. Auf den Seiten stand vieles, was ich nie so gewollt hatte:

- In einem Node-RED-Beitrag fehlte mitten im Satz eine Adresse, weil `<ipaddresse>` als HTML-Tag verschluckt wurde
- In den Alt-Texten steckten gut 1000 überflüssige Escape-Zeichen, die als sichtbare Backslashes erschienen
- Ein Tag stand doppelt da, Links aus der Ghost-Zeit liefen ins Leere
- Die Alt-Texte wiederholten innerhalb eines Beitrags nur den Titel

Dazu kam, dass ich das Theme nicht anfassen wollte. Mein Ziel war eine ruhige, typografische Seite, die ich auch in zwei Jahren noch verstehe.

## Wie die Zusammenarbeit aussieht

Claude Code arbeitet direkt in meinem Repository. Ich beschreibe, was ich will, Claude liest den Code, ändert die Dateien, baut die Seite und schaut sich das Ergebnis im Browser an. Jede Änderung landet als eigener, kleiner Commit mit einer Zeile, die sagt, was passiert ist. Das hat sich als der wichtigste Punkt herausgestellt: Ich muss nie ein großes Paket auf einmal beurteilen, sondern kann Schritt für Schritt zustimmen oder zurückgehen.

Ein paar Regeln haben sich dabei eingespielt:

- Veröffentlicht wird nur, wenn ich es ausdrücklich sage. Ein Push auf `main` deployt sofort live, also lege ich ihn bewusst getrennt von der Arbeit
- Das Theme bleibt unangetastet. Alle Anpassungen liegen als Overrides in `layouts/`, sodass ein Theme-Update möglich bleibt
- Die README ist das Gedächtnis des Projekts. Jede Entscheidung, die man in einem halben Jahr nicht mehr aus dem Code liest, steht dort, etwa welche Front-Matter-Felder was bewirken und warum

Gerade der letzte Punkt macht die Wartung leichter, auch für mich selbst. Wenn ich eine Woche nicht an der Seite war, lese ich die README und weiß wieder, wie ich einen Beitrag als Vorschau anlege oder ein Foto importiere.

## Aufräumen im Bestand

Das Reparieren des Migrationsschadens war die klassische Fleißarbeit, bei der ein Werkzeug glänzt, das nie müde wird. Claude hat die kaputten Stellen gesucht, behoben und in einem Commit erklärt. Danach ging es an alles, was ich selbst jahrelang vor mir hergeschoben hatte:

- Alt-Texte für alle Beitragsbilder und die 31 Cover
- Eigene Zusammenfassungen für 23 Beiträge, statt dass der erste Absatz als Vorschau herhalten muss
- Acht klare Tags für alle Beiträge und Überschriften ohne übersprungene Ebenen
- Titel, Beschreibungen und strukturierte Daten für Suchmaschinen, kanonische URLs auf die richtige Domain
- Tote Links ersetzt und einen Tippfehler in einer URL gefunden

Nichts davon ist spektakulär, aber zusammen ist die Seite spürbar ordentlicher. Und es sind genau die Aufgaben, für die ich allein nie den Abend freigeschaufelt hätte.

## Schneller und schlanker

Die Fotos waren das größte Problem. Hugo lieferte die Originale unverändert aus, zusammen rund 71 MB. Claude hat einen eigenen Bild-Render-Hook geschrieben, der WebP-Varianten in vier Breiten erzeugt und per `srcset` das passende ausliefert. Danach waren es etwa 15 MB, ohne dass ich ein Bild von Hand anfassen musste.

Der Preis war ein langer erster Build. Mit kaltem Cache brauchte der GitHub-Runner so lange, dass Hugo eine Seite wegen des Standard-Timeouts von 60 Sekunden abbrach. Die Lösung war ein höheres Timeout und ein Cache zwischen den Läufen. So etwas findet man schneller, wenn jemand die Fehlermeldung liest und gleich die richtige Stelle in der Konfiguration kennt.

## Neues bauen

Der Teil, der mir am meisten Spaß gemacht hat. Aus einer Beitragsliste ist in wenigen Wochen eine Seite geworden, auf der ich die Fotografie in den Mittelpunkt stellen kann:

- **Volltextsuche** mit Pagefind, die im Browser läuft und keinen externen Dienst braucht, inklusive markierter Suchbegriffe in den Treffern
- **Lightbox** mit Blättern, Wischen, Bildunterschrift und einem Panel für die Aufnahmedaten
- **Serien**, bei denen Beiträge zusammengehören, mit Navigation zwischen den Teilen
- **Galerien** und die Serie „Niederrhein.“ als gemischtes Raster
- **Ausrüstung und Rezepte** als eigene Seiten, deren Inhalte in YAML-Dateien stehen und von Vorlagen gerendert werden
- **Vorschau „In Arbeit“**, mit der ich auch diesen Artikel schon ankündigen konnte, ohne dass er halbfertig im Netz steht

Entscheidend war dabei nicht, dass Claude schnell Code schreibt. Entscheidend war, dass ich Iterationen fahren konnte. Ich probiere die Seite lokal aus, sage „die Karte ist zu laut“ oder „auf dem Handy ist das zu lang“, und eine Viertelstunde später sieht es anders aus. Dafür hätte ich allein Wochenenden gebraucht, und vieles wäre geblieben, wie es zuerst war.

## Datenschutz und Rechte im Blick behalten

Das Repository ist öffentlich, jede Datei steht samt Metadaten im Git-Verlauf. Fotos tragen aber GPS-Koordinaten und Seriennummern. Deshalb gibt es ein Skript, das Bilder importiert und nur die Aufnahmedaten zurückschreibt, die die Lightbox zeigt. Zusätzlich lässt eine Whitelist in der Hugo-Konfiguration alles andere gar nicht erst auf die Seite. Als wir zwei ältere Fotos prüften, haben wir tatsächlich GPS- und Seriennummern gefunden und entfernt.

Dazu kamen Entscheidungen, die ich ohne die Hilfe wohl weiter aufgeschoben hätte: Kommentarfunktion und Amazon-Links sind raus, KI-Crawler werden ausgesperrt, die Bildrechte stehen als strukturierte Daten an jedem Foto, und Cover, die generiert wurden, tragen ein Label „Cover KI-generiert“.

## Wo ich nachkorrigieren musste

Ganz ohne Gegenlesen geht es nicht, und das ist keine Floskel. Bei meinem Artikel über die X-T5 hatte Claude aus meinen Karteikarten Aussagen abgeleitet, die so nicht stimmten: Was auf den Karten als Plan stand, las sich im Text, als hätte ich es längst so eingestellt. Auch bei den JPEG-Rezepten steckten ein paar falsche Fakten, etwa dass ein Rezept in einem Slot gespeichert sei, das ich in Wahrheit von Hand wähle. Diese Fehler fielen mir erst beim Lesen auf, und ich habe sie korrigieren lassen.

Das ist der Punkt, an dem ich die Arbeitsteilung sehe: Claude kennt den Code und die Konventionen sehr gut, aber nicht meine Kamera und nicht meinen Alltag. Alles, was als meine Erfahrung im Text steht, lese ich deshalb selbst gegen. Bei Code und Konfiguration reicht mir meist der Blick auf die Vorschau, bei Fakten über mich nicht.

## Fazit

Die Wartung ist für mich von einer Pflicht, die ich scheue, zu etwas geworden, das ich gerne mache. Die Seite ist ordentlicher, schneller und kann mehr, als ich allein in dieser Zeit geschafft hätte, und ich verstehe sie weiterhin, weil jede Änderung klein, begründet und dokumentiert ist. Was bleibt, ist die Verantwortung für die Inhalte, und die gebe ich nicht ab.

Dieser Artikel ist übrigens selbst aus dem Verlauf des Repositorys entstanden: Claude hat einen ersten Entwurf geschrieben, ich habe ihn gegengelesen und überarbeitet.

[1]:	https://github.com/regetskcob/Ghost2Hugo "Ghost2Hugo auf GitHub"
