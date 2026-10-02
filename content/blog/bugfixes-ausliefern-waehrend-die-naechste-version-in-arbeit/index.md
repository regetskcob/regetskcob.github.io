---
title: "💻 | Bugfixes ausliefern, während die nächste Version in Arbeit ist"
date: 2016-10-21T09:18:46+0000
lastmod: 2026-10-02T06:41:45+0000
summary: "Wie sich Bugfixes ausliefern lassen, wenn die nächste Version noch in der Entwicklung ist: Lösungsvorschläge mit Branches in Git."
cover: ./cover.jpg
coverAI: true
coverAlt: "KI-generierte Grafik: Ein Versionsverlauf mit einer Hauptlinie und Release-Fahne, darüber ein langer Feature-Zweig, darunter ein kurzer roter Hotfix-Zweig, der wieder einmündet"
tags: ["Softwareentwicklung"]
draft: true
---

Wer kenn das nicht, ihr habt einen Bug in eurer aktuellen Release-Version gemeldet bekommen und fixt diesen zeitnah. Dieser Bugfix kann aber nicht ausgeliefert werden, da andere Aufgaben und Anforderungen für die nächste Version noch mitten in der Entwicklung sind, also kein stabiler Stand existiert.

Eure Kunden müssen nun also warten, bis eben diese offenen Punkte erledigt sind und erhält dann mit Glück sein Update, wenn nicht während dessen bereits wieder neue Punkte angefangen worden sind. Tritt letzteres ein, dauert es entsprechend wieder länger, bis der kleine Bugfix veröffentlich wird.

### Lösungsvorschläge

*Versions-Controll-System (SVN, Git etc.) vorausgesetzt*

Ihr könntet jetzt entweder bei jedem Bug, der euch gemeldet wird, hingehen und die Revision zum Zeitpunkt der letzten Veröffentlichung auschecken, darin den Bug fixen und dann entsprechend einen HotFix ausliefern, oder aber ihr arbeitet mit einem separaten Branch.

#### Ein Branch für alle Fälle

Deutlich komfortabler finde ich da die Lösung, einen separaten HotFix- oder AppStore-Branch anzulegen, welcher immer auf dem Stand des letzten Release ist.

Wir eine neue Version veröffentlich, wird dieser Stand also in den HotFix Branch überführt.

Anschließend habt ihr dort die Möglichkeit, gemeldete Bugs zu beheben, diese Lösung im Branch einzuchecken und eine neue Version eurer Software auszuliefern. Zusätzlich wird eure kleine Änderung dann in den sog. *Trunk* gemerged, welcher bei uns den Entwicklungsstand der laufenden Arbeiten darstellt. So ist sichergestellt, dass der Bug in der nächsten Veröffentlichung auch immer noch behoben ist.

#### Feature Branches

Teilweise gehen Firmen und Entwickler auch hin und legen für größere Änderungen oder Erweiterungen sogenannte Feature-Branches an, in denen dann an einem großen Feature gearbeitet werden kann, ohne den Entwicklungsstand zu beeinflussen. Dies ist besonders praktisch, wenn man in einem größeren Team an einem Projekt arbeitet, da man so nicht dafür sorgen kann, dass andere nicht mehr arbeiten/kompilieren können, weil der Stand des Features aktuell nicht stabil ist.

Dies hat Vincent Driessen [hier](http://nvie.com/posts/a-successful-git-branching-model/)  super erklärt.
