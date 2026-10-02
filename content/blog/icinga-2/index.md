---
title: "📚 | Icinga 2"
# Datum unbekannt (Ulysses-Blatt ohne Datum), beim Sichten setzen
date: 2026-10-02T06:41:45+0000
lastmod: 2026-10-02T06:41:45+0000
summary: "Betz und Widhalm erklären Netzwerk-Monitoring mit Icinga 2. Das Buch deckt viel ab, wirkt bei den Konfigurationen aber stellenweise erschlagend."
tags: ["Bücher", "Softwareentwicklung"]
disclosure:
  type: provided
  by: "vom Verlag"
draft: true
---

Heut zu tage wird alles, was nur irgend wie möglich ist, überwacht. Nicht ohne Grund hört man immer mal wieder vom „Überwachungsstaat“. Ähnlich ist das in Unternehmen, die immer und wenn möglich von über all aus erfahren möchten, ob aktuell alle Netzwerke und Komponenten online und betriebsbereit sind. Im Fehlerfall soll zeitnah reagiert werden, es werden also auch Event benötigt, wenn etwas nicht klappt.

Ein solches sog. Monitoring System stellt Icinga 2 dar, welches aus dem nagios Projekt heraus entstanden ist. Im zugehörigen Buch „Icinga 2“ von Lennart Betz und Thomas Widhalm geht es um jenes System zum Überwachen von Systemen.

Am Anfang des Buches lernt ihr einige Details über das Konzept der Netzwerk-Überwachung, über Icinga und dessen Entstehungsgeschichte, aber auch einige Infos zum Buch werde ihr hier erfahren, beispielsweise wie es am besten zu Lesen ist.

Daran schließt direkt ein praxisorientiertes Kapitel über die Installation einer Icinga Instanz an, welche eine beispielhafte Installation anhand von Konfigurations-Code und Screenshots der grafischen Oberfläche durchspielt. Leider könnten die Code-Schnipsel etwas kleiner, dafür aber besser erläutert ausfallen, aber ich vermute, diese werden verständlicher wenn man sich mehr mit der Materie auseinander setzt.

Im Anschluss daran erhaltet ihr Einblicke in die Oberfläche „Icinga Web 2“ welche euch besonders die Möglichkeit bietet, Messwerte benutzerdefiniert zu visualisieren und deutlich mehr Features bereit hält, als die klassische Icinga Oberfläche. Dafür ist diese aber auch deutlich komplexer und bedarf mehr Einarbeitung.

Ein Kapitel weiter wird schon das zu beginn angesprochene Benachrichtigungs-System auf Basis von events und sog. Eskalationen vorgestellt und konfiguriert. Ihr könnt je nach Art des Problems mehrere oder auch verschiedene Personen benachrichtigen, um so schnellstmöglich auf Fehler oder Probleme reagieren zu können.

Im weiteren Verlauf des Buches werden euch noch zahlreiche nützliche Plugins im Detail vorgestellt und ihr erlernt, wie diese zu integrieren sind. Hier sind die Konfigurationsschnipsel deutlich besser dokumentiert und besser verständlich, sodass diese direkt in ‚echt‘ angewandt werden können. Aber auch das visualisieren von Daten/Messwerten mit dem sog. Graphing lernt ihr näher kennen. Danach folgen noch Kapitel zum Management von Log-Ausgaben und ein Kapitel zum anlegen und Überwachen eines Geschäftsprozesses, bevor mit Einblicken in die API oder erweiterte Konfigurationen deutlich fortgeschrittenere Themen das Buch abschließen.

### Fazit
 Dieses Buch bietet für jeden, der sich bereits mit dem Themenbereich Monitoring auskennt einen guten Einstieg in Icinga, aber auch Einsteiger können mit diesem Buch und einigen Recherchen ein Monitoring System einrichten und konfigurieren. Schade ist hierbei tatsächlich nur, dass die anfänglichen Konfigurationsanweisungen etwas sehr erschlagend wirken, da sie relativ unkommentiert daher kommen. Ansonsten kann man das Buch aufgrund des breiten Themenspektrums aber jedem nur ans herz legen, der sich mit Monitoring-Aufgaben konfrontiert sieht.
