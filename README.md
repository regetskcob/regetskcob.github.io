# regetskcob.github.io

Quellcode meiner persönlichen Website — Blog rund um Natur, Fotografie und Technik,
der schrittweise zu einer Landing-/Portfolio-Seite ausgebaut wird.

Live: <https://www.regetskcob.de>

## Tech-Stack

| Baustein | Wahl | Warum |
| --- | --- | --- |
| Static Site Generator | [Hugo](https://gohugo.io) (extended), v0.154.5 | Schnelle Builds, Bildverarbeitung out of the box |
| Theme | [typo](https://github.com/tomfran/typo) v3.0.2 von Francesco Tomaselli (MIT) | Minimalistisch, typografie-orientiert; eingebunden als Git-Submodule unter `themes/typo` |
| Hosting | [GitHub Pages](https://pages.github.com) | Statisches Hosting direkt am Repo |
| CI/CD | GitHub Actions (`.github/workflows/hugo.yaml`) | Build und Deploy bei jedem Push auf `main` |

### Eingebundene Dritt-Dienste

| Dienst | Zweck | Konfiguriert in |
| --- | --- | --- |
| [Umami](https://umami.is) via [hugomods/umami-analytics](https://github.com/hugomods/umami-analytics) v0.3.1 | Datenschutzfreundliche, cookielose Reichweitenmessung | `[params.umami]` in `hugo.toml` |

Umami ist in der [Datenschutzerklärung](content/legal.md) benannt.

## Projektstruktur

```
content/          Inhalte (Markdown, Beiträge als Page Bundles mit ihren Bildern)
  blog/           Blogbeiträge, erreichbar unter /blog/
  about.md        Über mich
  library.md      Bibliothek / Buchempfehlungen, vorerst als Entwurf ausgeblendet
  legal.md        Impressum & Datenschutz
  niederrhein.md  Foto-Langzeitserie (Text und Bildfolge im Front Matter)
  ausruestung.md  Fotoausrüstung (Text hier, Liste in data/gear.yaml)
  rezepte.md      JPEG-Rezepte (Text hier, Werte in data/recipes.yaml)
data/
  gallery.yaml    Kuratierte Bildauswahl für die Galerien auf der Startseite
  gear.yaml       Ausrüstungsliste für die Ausrüstungsseite
  recipes.yaml    JPEG-Rezepte der C-Slots für die Rezepte-Seite
  cameras.yaml    Anzeigenamen für Kameras, die in der Datei nur ein Code sind (Drohne)
  exif.yaml       Aufnahmedaten für Fotos ohne EXIF, optional (scripts/extract-exif.sh)
scripts/          Hilfsskripte für Fotos (import-photo.sh, extract-exif.sh)
layouts/          Eigene Overrides, die das Theme ergänzen oder ersetzen
assets/css/       Eigenes CSS (custom.css überschreibt die leere Datei im Theme)
assets/gallery/   Optionale Galerie-Bilder ohne zugehörigen Beitrag
assets/gear/      Kopfbild der Ausrüstungsseite
themes/typo/      Theme als Git-Submodule (nicht direkt bearbeiten)
static/           Unverarbeitete Dateien (Favicons)
hugo.toml         Zentrale Konfiguration
```

## Eigene Anpassungen am Theme

Das Theme bleibt unangetastet; Anpassungen liegen als Overrides in `layouts/` und
gewinnen gegenüber der gleichnamigen Datei im Theme.

- **`layouts/_default/_markup/render-image.html`** — ersetzt den Bild-Render-Hook des
  Themes, der Originale unverändert ausliefert. Stattdessen entstehen WebP-Varianten
  in 480/800/1200/1600 px inklusive `srcset`/`sizes`. Das DOM und die Klassen des
  Themes (`img-small`, `img-full`, `img-light`, `img-dark`) bleiben erhalten.

  In `hugo.toml` sorgt dazu eine `cascade`-Regel mit `build.publishResources = false`
  dafür, dass die Original-Dateien nicht zusätzlich ins Deploy-Artefakt wandern.
  Wirkung: die ausgelieferten Bilder schrumpfen von rund 71 MB auf 15 MB.

- **`layouts/partials/head/og-image.html`** — liefert das Vorschaubild fürs Teilen
  als absolute URL, zugeschnitten auf 1200×630. Reihenfolge: das in `cover`
  benannte Bild, sonst das erste Bild des Beitrags, sonst
  das unter `ogImage` in `hugo.toml` eingetragene Foto als seitenweiter Rückfall.

- **`layouts/partials/seo/`** — Titel, Description und JSON-LD für Suchmaschinen
  und Link-Vorschauen. Im `<title>` und in `og:title` fällt das Emoji-Präfix der
  Beiträge weg („📚 | Facilitation“ → „Facilitation – Buchrezension“), auf der
  Seite selbst bleibt es stehen. `seoTitle` im Front Matter überschreibt den
  Titel. Die Description kommt aus `description`, sonst aus `summary`.
  Schlagwort-Seiten sind `noindex` und stehen nicht in der Sitemap.

- **`layouts/index.html`** — Landing-Page statt der vollständigen Beitragsliste
  des Themes, ganz auf die Fotografie ausgerichtet: Intro, Serien-Teaser und
  Galerien. Die Beiträge stehen unter `/blog/`, erreichbar über das Menü.

- **`layouts/partials/responsive-img.html`** — gemeinsames `<img>` für Galerien,
  Serie, Serien-Teaser und Ausrüstungsseite: WebP-Varianten in festen Breiten, nie
  hochskaliert, die größte ausgelieferte Variante steht immer mit im `srcset`.
  `sizes` muss zur Breite passen, die das CSS tatsächlich anzeigt.

- **`layouts/partials/disclosure.html`** — der Transparenz-Hinweis unter einer
  Rezension (hellgrüne Box, immer gleicher Wortlaut). Gesteuert über `disclosure` im
  Front Matter: `type: provided` (gestellt, dazu `by: "vom Rheinwerk Verlag"` im
  Dativ), `type: purchased` (selbst gekauft) oder `type: gift` (Geschenk, `by: "von
  Freunden"`); optional `item: "Dieses Objektiv"` und `note`. Ohne `disclosure` erscheint nichts.
- **`layouts/partials/gallery.html`** — Galerien, gespeist aus `data/gallery.yaml`,
  im selben Raster wie die Serie (`layouts/partials/photo-grid.html`).

- **`layouts/_default/gear.html`** — Layout der Ausrüstungsseite. Oben der Text aus
  `content/ausruestung.md`, darunter die Blöcke aus `data/gear.yaml` in deren Reihenfolge.
  Einträge ohne `note` rendern nur ihren Namen. Das Kopfbild kommt aus dem Front
  Matter (`photo` als Dateiname unter `assets/gear/`, `photo_alt` als
  Beschreibung) und wird wie bei der Serie in WebP-Varianten ausgeliefert. Ohne
  `photo` rendert die Seite ohne Bild.

- **`layouts/_default/recipes.html`** — Layout der Rezepte-Seite: Text aus
  `content/rezepte.md`, darunter die Basis-Blöcke und je Rezept eine Karte aus
  `data/recipes.yaml`. Ein Rezept ohne `settings` wird übersprungen.
  `layouts/partials/recipe-notes.html` rendert die Hinweise unter einer Tabelle
  und wird von beiden Ebenen genutzt.

- **`layouts/_default/series.html`**, **`layouts/partials/photo-grid.html`** und
  **`assets/js/series.js`** — Layout für eine Foto-Serie und das Raster, das
  auch die Galerien und der Serien-Teaser auf der Startseite nutzen: ein
  gemischtes Raster, das aus der Textspalte ausbricht und bis zu
  80 % der Seitenbreite nutzt, mit zwei, drei oder vier Spalten je nach Breite.
  Hochformate belegen zwei Zeilen, Panoramen zwei Spalten, mit `size: large`
  markierte Bilder zwei mal zwei. Die Bildliste steht im Front Matter unter
  `photos` (nicht `images`, das ist bei Hugo für OpenGraph reserviert).

  Der Serien-Teaser bleibt mit `narrow` in der Textspalte. Das Skript
  (`layouts/partials/photo-grid-script.html` bindet es einmal pro Seite ein)
  bedient alle Raster einer Seite. Es mischt die Reihenfolge bei jedem Besuch, rechnet die Anordnung vorab
  durch und mischt neu, falls mitten im Raster eine Lücke entstünde. Ein Klick
  öffnet das Bild groß. Ohne JavaScript gilt die Reihenfolge aus dem Front Matter
  und der Klick öffnet die große Bilddatei direkt.

- **`layouts/partials/hooks/body_end.html`** und **`assets/js/to-top.js`** — der
  runde „nach oben"-Button unten rechts, über den `body_end`-Hook des Themes auf
  jeder Seite. Er erscheint, sobald der Seitenkopf aus dem Bild gescrollt ist,
  und ersetzt den englischen Textlink des Themes (`hideBackToTop` in `hugo.toml`).

- **Deutsche Oberflächentexte.** Das Theme hat keine Übersetzungsdateien, einige
  Texte stehen fest in den Vorlagen. Übersetzt sind sie in Kopien, die bei einem
  Theme-Update mit dem Original verglichen werden sollten:
  - `layouts/_default/single.html` — Lesezeit („2 Min. Lesezeit") und Inhaltsverzeichnis
  - `layouts/partials/head.html` — Seitentitel der 404-Seite
  - `layouts/404.html` — die 404-Seite selbst

- **`layouts/partials/header.html`** — Kopie des Theme-Headers mit funktionierender
  Markierung der aktuellen Seite im Menü. Das Theme verglich den Menünamen mit dem
  kleingeschriebenen Seitennamen und markierte deshalb nie etwas. Jetzt zählt die
  Adresse: Beiträge unter `/blog/` markieren „Blog", der aktive Eintrag trägt
  `aria-current`. Das Menü ist in Gruppen geteilt (`group` an den Einträgen in
  `hugo.toml`: Fotografie, dann Blog und Über), die auf dem Handy jeweils als
  eigene Zeile umbrechen. Einen Eintrag „Start“ gibt es nicht, der Seitenname
  führt zur Startseite.

  Fußzeile (`footerContent`), Brotkrumen (`[params.breadcrumbs]`) und der Titel
  der Schlagwort-Übersicht (`content/tags/_index.md`) sind ohne Kopie einstellbar.

## Lokale Entwicklung

Voraussetzung ist Hugo **extended** sowie Go (für das Umami-Hugo-Modul).

```bash
brew install hugo go
```

Repository inklusive Theme-Submodule klonen:

```bash
git clone --recurse-submodules https://github.com/regetskcob/regetskcob.github.io.git
```

Entwicklungsserver starten — die Seite liegt dann auf <http://localhost:1313>:

```bash
hugo server --disableFastRender
```

Produktions-Build wie in der CI erzeugen:

```bash
hugo --gc --minify
```

Theme auf eine neue Version heben:

```bash
git -C themes/typo fetch --tags && git -C themes/typo checkout v3.0.2
```

## Inhalte pflegen

Beiträge sind [Page Bundles](https://gohugo.io/content-management/page-bundles/):
ein Ordner unter `content/posts/` mit einer `index.md` und den zugehörigen Bildern
daneben. Im Markdown werden sie relativ referenziert, die Größenanpassung übernimmt
der Render-Hook:

```markdown
![Alt-Text](./bild.jpg "Optionale Bildunterschrift")
```

Neuen Beitrag anlegen:

```bash
hugo new content blog/mein-beitrag/index.md
```

### Serie vs. Galerie

`content/niederrhein.md` ist eine laufende Serie mit eigenem Text und eigener
Seite, die Bilder erscheinen dort in zufälliger Reihenfolge. Die Blöcke in
`data/gallery.yaml` sind lose Sammlungen nach Motiv.
Auf der Startseite steht die Serie oben und wird angeteasert, die Galerien folgen
darunter. Der Teaser trägt alle Bilder der Serie, gemischt bei jedem Besuch
und einheitlich im Querformat beschnitten, und zeigt davon so viele, wie volle
Reihen ergeben: vier bei zwei Spalten, sechs bei drei, vier bei vier. Die Galerien mischen ihre Reihenfolge bei jedem Besuch.

```yaml
shuffle: true            # Reihenfolge bei jedem Besuch mischen
photos:
  - image: "niederrhein/dscf0435.jpg"
    size: large          # optional: zwei Spalten, zwei Zeilen
    alt: "…"
```

### Vorschau auf Beiträge in Arbeit

Ein Beitrag, der noch nicht fertig ist, kann als Vorschau im Blog stehen: gestrichelter
Kasten „In Arbeit“ über der Beitragsliste (Titel, Cover, Zusammenfassung, nicht
verlinkt), eine Zeile „Demnächst im Blog: …“ im Intro der Startseite, und bei Beiträgen
einer Serie ein Kasten unter den Teilen auf der Serienseite. Die Vorschau hat keine
eigene Seite und taucht in RSS, Sitemap, Suche, Tags und Serienzählung nicht auf.

Im Front Matter des Beitrags (Vorlage in den Entwürfen):

```yaml
build:
  render: never   # keine Seite bauen
  list: never     # in keiner Liste führen
soon: true        # oder soon: Oktober  ->  "demnächst · Oktober"
```

Und der Ordnername unter `soon` in `content/blog/_index.md`:

```yaml
soon:
  - die-vermessung-der-berge
```

Zum Veröffentlichen den `build`-Block, `soon` und den Namen in `_index.md` entfernen.
Zusammenfassung (`summary`) und Cover (`cover`) werden angezeigt; bei Serienteilen
`series` und `seriesLabel` setzen. Wer einen Beitrag lieber ganz verstecken will,
lässt `draft: true`, dann erscheint er nirgends.

### Fotos aufnehmen und EXIF

**Das Repository ist öffentlich, jede Datei steht samt Metadaten im Git-Verlauf.**
Originale tragen GPS-Koordinaten, Seriennummern und Besitzernamen. Fotos deshalb nie
direkt hineinkopieren, sondern mit dem Skript, es kopiert die Datei und schreibt nur
die Aufnahmedaten zurück, die die Lightbox zeigt (Kamera, Objektiv, Blende,
Brennweite, Zeit, ISO, Belichtungskorrektur), dazu Orientierung und Farbprofil:

```bash
scripts/import-photo.sh ~/Pictures/blog/Allgäu/DSCF0473.jpeg assets/gallery/allgaeu/dscf0473.jpg
```

Dateinamen klein geschrieben, `_` als `-`, ohne Leerzeichen (`dscf0473.jpg`), lange
Kameranamen der DJI-App auf `dji-JJJJMMTT-HHMMSS` gekürzt. Länge der langen Kante: 2000 px.

Die Lightbox liest die Aufnahmedaten beim Build aus der Datei (`partials/exif.html`).
In `hugo.toml` legt `[imaging.exif]` eine Whitelist fest und schaltet GPS und Datum ab,
es kann also nichts Weiteres auf die Seite gelangen. Fotos ohne Daten zeigen keinen
EXIF-Knopf. Für Fotos, die ohne Metadaten exportiert wurden, kann `data/exif.yaml`
die Werte liefern, `scripts/extract-exif.sh <Ordner mit Originalen>` schreibt sie.

### Ausrüstungsseite pflegen

Das Kopfbild liegt unter `assets/gear/` und wird im Front Matter von
`content/ausruestung.md` über `photo` und `photo_alt` gesetzt. Wie bei den Galerien
gilt: vorher auf 2000 px lange Kante bringen und die Metadaten entfernen, das
Repository ist öffentlich.

Die Ausrüstung steht in `data/gear.yaml`, aufgeteilt in benannte Blöcke, die in
der Reihenfolge der Datei untereinander gerendert werden. Ein neues Thema kommt
dazu, indem unten ein weiterer Block angehängt wird. `description` am Block und
`note` am Eintrag sind optional, bewusst ohne Links. Ein Block kann zusätzlich
ein eigenes Foto tragen (`image` als Dateiname unter `assets/gear/`, `alt` als
Beschreibung), das unter der Liste steht.

```yaml
groups:
  - title: Kameras
    description: Zwei Bodys, beide mit L-Griff.
    items:
      - name: Fujifilm X-T5
        note: Seit September 2026 die Hauptkamera.
      - name: Fujifilm X-T30   # ohne "note": nur der Name

  - title: Tasche und Kleinkram
    image: rucksack.jpg      # optionales Foto unter der Liste
    alt: Der gepackte Rucksack auf einem Feldweg
    items:
      - name: Lowepro Whistler BP 450 AW II
```

### Rezepte pflegen

`data/recipes.yaml` hat zwei Ebenen. `basics` steht als Basis über allen
Rezepten, darunter folgt je C-Slot nur noch das Bildrezept. Was für alle drei
Rezepte gilt, gehört nach oben und nicht in jede einzelne Tabelle.

Ein Basis-Block wird über sein `kind` gerendert:

| `kind` | Rendert | Erwartet |
| --- | --- | --- |
| `table` | Einstellung und Wert | `rows` mit `label`/`value` |
| `banks` | Auto-ISO-Bänke, sechsspaltig | `banks` mit `bank`, `purpose`, `xt30`, `xt5`, `time`, `recipes` |
| `list` | Aufzählung | `items` |

Jeder Block und jedes Rezept kann `notes` tragen (`tone: warn` hebt einen
Hinweis hervor). `closing` am Dateiende steht unter allen Rezepten.

In den Rezepten trägt eine Zeile entweder `value` (gilt für beide Bodys) oder
`xt30` und `xt5`. Sobald eine einzige Zeile aufgeteilt ist, rendert die ganze
Tabelle dreispaltig mit den Spaltenüberschriften aus `bodies`.
`settings_title` benennt die erste Spalte um, etwa für eine Abweichungstabelle.

```yaml
bodies:
  xt30: X-T30 (X-Trans IV)
  xt5: X-T5 (X-Trans V)
  shared: Beide Bodys

basics:
  - kind: table
    title: Autofokus
    rows:
      - label: AF-Modus
        value: Weit / Verfolgung

recipes:
  - slot: C1
    name: Niederrhein.
    settings:
      - label: Dynamikbereich
        value: DR400          # gleich auf beiden Bodys
      - label: Schärfe
        xt30: "0"             # eigene Werte je Body
        xt5: "−1"
    notes:
      - title: Warum die X-T5 anders steht
        text: 40 MP zeichnen von Haus aus härter.
```

Quelle der Werte sind die Rezept- und die Settingkarte. Ändert sich etwas an
der Kamera, wird hier gepflegt und nicht in den Rezepttabellen doppelt.

### Galerie pflegen

Die Startseiten-Galerie steht in `data/gallery.yaml` und besteht aus benannten
Blöcken, die in der Reihenfolge der Datei untereinander gerendert werden. Ein
neues Thema kommt dazu, indem unten ein weiterer Block angehängt wird — das
Template muss dafür nicht angefasst werden. `description` ist optional.

Ein Eintrag mit `post` und `image` holt das Foto direkt aus dem Page Bundle des
Beitrags und verlinkt die Kachel dorthin — so liegt kein Bild doppelt im
Repository. Ein Eintrag mit nur `image` liest stattdessen aus `assets/gallery/`.
Fehlende Dateien werden übersprungen und lassen den Build nicht scheitern.
Hoch- und Panoramaformate erkennt das Raster selbst. Bei jedem Besuch werden
außerdem einige zufällige Querformate groß gezeigt, etwa eins von sechs, jeweils
über zwei mal zwei Felder. Wer das für einen Block lieber selbst festlegt,
setzt an den gewünschten Bildern `size: large`; dann wählt das Skript dort nichts
mehr aus. Bildunterschriften gibt es im Raster nicht, die
Beschreibung gehört in `alt`.

```yaml
galleries:
  - title: Niederrhein
    description: Felder, Weite und Abendlicht vor der Haustür.
    items:
      - post: uedemer-feld-hohe-muehle
        image: dscf3638.jpg
        alt: Weites Feld am Uedemer Feld im Gegenlicht
        size: large

  - title: Wald                 # weiterer Block, einfach anhängen
    items:
      - image: winterwald.jpg   # ohne "post": aus assets/gallery/
        alt: Verschneiter Waldweg zwischen Fichten
```

## Front Matter

Übersicht der Felder, die dieser Blog im Front Matter kennt und auswertet. „Gelesen von“
nennt die Stelle im Code, damit sich nachprüfen lässt, was ein Feld bewirkt. Felder,
die nirgends stehen, tun nichts. Hugos eigene Felder (`title`, `date`, `slug`, `aliases`,
`draft`, `tags`, `lastmod`, `build`) sind mit ihrer Bedeutung für diese Seite aufgeführt.
Was Hugo oder die Vorlagen ohnehin als Standard annehmen, steht nicht im Front Matter:
kein `draft: false`, kein `slug` (der Ordnername ist die URL), kein `readTime: true`,
kein `autonumber: false`, kein `lastmod` gleich dem `date`.

### Beiträge (`content/blog/<ordner>/index.md`)

Jeder Beitrag ist ein Ordner mit `index.md` und seinen Bildern. Neue Beiträge tragen
so viel wie das Beispiel; alles andere ist optional.

```yaml
---
title: "📚 | Die Vermessung der Berge"   # Emoji-Kategorie | Titel
date: "2026-09-30T20:00:00+02:00"
summary: "Ein bis zwei Sätze, die in Liste, Suche und Link-Vorschau stehen."
cover: ./cover.jpg
coverAlt: "Beschreibung des Covers für Screenreader"
disclosure:                               # nur bei Rezensionen, siehe unten
  type: purchased
tags: ["Bücher", "Natur"]
---
```

**Grunddaten**

| Feld | Wirkung | Gelesen von |
| --- | --- | --- |
| `title` | Titel der Seite, mit Emoji-Kategorie vorn: `📚 \| …` Buch, `📸 \| …` Foto, … In `<title>` und Link-Vorschau fällt `Emoji \|` weg, bei 📚 kommt „– Buchrezension“ dazu. | `partials/seo/title.html` |
| `seoTitle` | Überschreibt den Titel für `<title>` und Link-Vorschau. | `partials/seo/title.html` |
| `date` | Veröffentlichungsdatum, wird angezeigt und sortiert. **Liegt es in der Zukunft, baut Hugo den Beitrag nicht.** | Hugo, `single.html` |
| `lastmod` | Datum der letzten inhaltlichen Überarbeitung, von Hand zu setzen. Wirkt auf RSS, Strukturdaten und Link-Vorschau und löst das Label „kürzlich aktualisiert“ aus (siehe unten). Ohne Angabe gilt das `date`. | `rss.xml`, `seo/jsonld.html`, `opengraph.html`, `partials/updated-label.html` |
| `slug` | Nur nötig, wenn die URL vom Ordnernamen abweichen soll. Sonst ist der Ordnername der letzte Teil der URL: `/blog/<ordner>/`. | Hugo |
| `aliases` | Alte URLs, die auf den Beitrag weiterleiten (`["/posts/…/"]`). | Hugo |
| `summary` | Kurztext unter dem Titel, in der Blog-Liste, in den Suchergebnissen und als Meta-Description. | `single.html`, `seo/description.html` |
| `tags` | Themen, z. B. `["Bücher", "Smarthome"]`. Bestimmen die Themen-Zeile im Blog und die Tag-Seiten. | Hugo, `section.html` |
| `draft` | `true`: Der Beitrag wird nirgends gebaut oder angezeigt. Ohne Angabe gilt `false`. | Hugo |

**Titelbild**

| Feld | Wirkung |
| --- | --- |
| `cover` | Bild im Beitragsordner (`./cover.jpg`). Steht oben im Beitrag, außer der Text enthält es selbst, ist Vorschaubild in den Listen und Link-Vorschau. Ohne `cover` gibt es kein Titelbild. |
| `coverAlt` | Alt-Text des Covers, steht in den Suchergebnissen und im Beitrag. Pflicht, wenn es ein Cover gibt. |
| `coverCredit` | Quelle bei einem fremden Cover, klein auf dem Bild, z. B. `"Cover: dpunkt.verlag"`. |
| `coverAI` | `true` markiert ein KI-generiertes Cover mit „KI-generiert“ auf dem Bild. |

**Anzeige im Beitrag**

| Feld | Wirkung |
| --- | --- |
| `readTime` | Lesezeit unter dem Titel. Im Blog standardmäßig an (`cascade` in `content/blog/_index.md`). |
| `showTags` | Tags in der Kopf-Karte. Im Blog standardmäßig an. |
| `toc` | `true` oder `false` erzwingt das Inhaltsverzeichnis oder blendet es aus. Ohne Angabe erscheint es bei mindestens vier Überschriften der Ebenen 2 und 3, darunter eine der Ebene 3. |
| `autonumber` | `true` nummeriert die Überschriften (Theme). |
| `math` | `true` lädt KaTeX für Formeln (Theme). |
| `inLanguage` | Sprache des Beitrags (`"en"`), wenn sie von der Seite abweicht. Setzt `lang` am Artikel. |
| `hidePagination` | `true` blendet „Vorheriger/Nächster Beitrag“ aus. Beiträge einer Serie zeigen sie ohnehin nicht. |

**Rezensionen: Transparenz-Hinweis (`disclosure`)**

Die grüne Box „Transparenz“ unter dem Text, immer im gleichen Wortlaut (`partials/disclosure.html`).
Ohne `disclosure` erscheint keine Box.

```yaml
disclosure:
  type: provided        # provided = gestellt, purchased = gekauft, gift = Geschenk
  by: "vom Verlag"      # wer es gestellt oder geschenkt hat, im Dativ; bei provided: "vom Verlag"
  item: "Dieses Objektiv"  # optional, Standard "Dieses Buch"
  note: "Es war ein gebrauchtes Exemplar von medimops."   # optional, ein Zusatzsatz
```

| `type` | Text |
| --- | --- |
| `provided` | „Dieses Buch wurde mir vom Verlag kostenlos zur Verfügung gestellt.“ |
| `purchased` | „Dieses Buch habe ich selbst gekauft.“ |
| `gift` | „Dieses Buch habe ich von Freunden geschenkt bekommen.“ (mit `by: "von Freunden"`) |

**Label „kürzlich aktualisiert“**

In der Blog-Liste, in den Tag-Listen, auf der Serienübersicht und im Beitragskopf (zwischen
Datum und Lesezeit) trägt ein Beitrag das Label
„kürzlich aktualisiert“ (dezent grün wie die Transparenz-Box), wenn er **älter als vier Wochen** ist, aber sein `lastmod`
**in den letzten vier Wochen** liegt (jeweils vom Tag des Builds gerechnet). Ein neuer
Beitrag braucht es nicht, einer mit altem `lastmod` auch nicht. Beim Überarbeiten also
`lastmod` auf das heutige Datum setzen:

```yaml
date: 2023-06-09T14:00:00+0000
lastmod: 2026-10-01T09:30:00+0200
```

Bewusst zählt nur das `lastmod` im Front Matter, nicht der Git-Verlauf: Ein Commit, der nur
den Kopf aufräumt, soll keinen Beitrag als aktualisiert markieren. Das Label ist so aktuell
wie der letzte Build, die Seite baut nur bei einem Push neu.

**Serie**

| Feld | Wirkung |
| --- | --- |
| `series` | Name der Serie, genau wie der Titel in `content/series/<name>/_index.md`. Setzt Label „Serie · Teil 2/5“, Navigation zwischen den Teilen und die Serienseite. |
| `seriesLabel` | Titel des Teils auf der Serienseite („Teil II: Voraussetzungen“). |

**Vorschau „In Arbeit“**

Der Beitrag steht als Kasten im Blog, ohne eigene Seite (Details unter „Vorschau auf Beiträge in Arbeit“).

```yaml
build:
  render: never
  list: never
soon: Oktober        # oder true, dann nur "demnächst"
```

Dazu der Ordnername in `content/blog/_index.md` unter `soon`. Zum Veröffentlichen alles drei entfernen.

**Nur für die Link-Vorschau**

| Feld | Wirkung |
| --- | --- |
| `ogImage` | Pfad unter `assets/` für Seiten ohne Bildordner (die Über-mich-Seite nimmt das Porträt). Ohne Angabe: `cover`, erstes Bild des Ordners, sonst das Bild aus `hugo.toml`. |
| `ogImageAnchor` | Zuschnitt des Bildes (`Top`, `Center`, …), Standard `Top`. |

### Seiten (`content/*.md`)

Seiten wie Über mich, Impressum, Ausrüstung, Rezepte und die Niederrhein-Serie haben kein
Datum in der Anzeige, kein Titelbild oben und kein Vorher/Nachher.

| Feld | Wirkung |
| --- | --- |
| `title` | Seitentitel und `<title>`. |
| `description` | Meta-Description. Seiten haben kein `summary`. |
| `layout` | Vorlage: `series` (Fotoserie, `niederrhein.md`), `gear` (Ausrüstung), `recipes` (Rezepte). Ohne Angabe die normale Seite. |
| `hideTitle` | `true` hält die Überschrift für Screenreader und Suche, blendet sie aber aus (Über mich). |
| `aliases` | Alte URLs, die weiterleiten. |
| `ogImage`, `ogImageAnchor` | Bild für die Link-Vorschau, siehe oben. |

Zusätzlich je nach Layout:

| Layout | Felder |
| --- | --- |
| `series` | `teaser` (Text auf der Startseite), `shuffle: true` (zufällige Reihenfolge), `photos:` (Liste mit `image`, `alt`, optional `size: large`) |
| `gear` | Daten in `data/gear.yaml`; Titelbild optional (siehe unten) |
| `recipes` | Daten in `data/recipes.yaml`; Titelbild optional (siehe unten) |

**Titelbild einer Seite (`gear`, `recipes`)**

Beide Seiten können ein Titelbild bekommen, mit dem Seitentitel auf einem leicht
durchscheinenden Balken am unteren Bildrand (derselbe Balken wie in der Lightbox, mit
weichem Verlauf). Ein Klick öffnet das Bild in der Lightbox. Ohne `photo` steht die
Seite wie bisher mit der normalen Überschrift da (`partials/page-cover.html`).

```yaml
photo: "gear/setup.jpg"   # Pfad unter assets/
photo_alt: "Die Fotoausrüstung auf einer Eichenplatte: …"   # auch die Bildunterschrift in der Lightbox
```

Unter dem Titel steht bei Bedarf eine Zeile (auf dem Cover im Balken, ohne Cover unter der
Überschrift), `partials/page-meta.html`:

| Feld | Wirkung |
| --- | --- |
| `lastmod` | Von Hand gesetztes Datum der letzten Überarbeitung. Es darf auch in der Zukunft liegen: das `date` einer Seite kommt in `hugo.toml` nur aus `date` und `publishDate`, nicht mehr ersatzweise aus dem `lastmod`. Liegt es in den letzten vier Wochen, steht dort „kürzlich aktualisiert“. Seiten außerhalb des Blogs haben kein Alter, hier zählt nur das `lastmod`. |
| `readTime` | `true` zeigt die Lesezeit. Standardmäßig aus: Hugo zählt nur den Markdown-Text der Seite, nicht, was die Vorlage aus den Datendateien ergänzt. Die Ausrüstungsseite zählt deshalb die Wörter aus `data/gear.yaml` mit (`words` an `partials/page-cover.html`), eine Seite aus ihrem Markdown allein bekommt Hugos Wert. Gerechnet wird mit 212 Wörtern pro Minute, aufgerundet. |

### Serienseiten (`content/series/<name>/_index.md`)

`title` (Name der Serie, wie in `series` der Beiträge) und `description`. Der Text darunter
steht auf der Serienseite über der Teileliste.

### Blog-Index (`content/blog/_index.md`)

| Feld | Wirkung |
| --- | --- |
| `soon` | Ordnernamen der Beiträge, die als Vorschau „In Arbeit“ gezeigt werden. |
| `cascade` | Standardwerte für alle Beiträge: `showTags` und `readTime` stehen auf `true`. Ein Beitrag überschreibt sie mit seinem eigenen Wert. |
| `aliases` | `["/posts/"]` leitet die alte Blog-Adresse weiter. |
