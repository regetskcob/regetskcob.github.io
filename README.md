# regetskcob.github.io

Quellcode meiner persönlichen Website — Blog rund um Natur, Fotografie und Technik,
der schrittweise zu einer Landing-/Portfolio-Seite ausgebaut wird.

Live: <https://regetskcob.github.io>

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
  library.md      Bibliothek / Buchempfehlungen
  legal.md        Impressum & Datenschutz
  niederrhein.md  Foto-Langzeitserie (Text und Bildfolge im Front Matter)
  gear.md         Fotografischer Tech-Stack (Text hier, Ausrüstung in data/gear.yaml)
  rezepte.md      JPEG-Rezepte (Text hier, Werte in data/recipes.yaml)
data/
  gallery.yaml    Kuratierte Bildauswahl für die Galerien auf der Startseite
  gear.yaml       Ausrüstungsliste für die Gear-Seite
  recipes.yaml    JPEG-Rezepte der C-Slots für die Rezepte-Seite
layouts/          Eigene Overrides, die das Theme ergänzen oder ersetzen
assets/css/       Eigenes CSS (custom.css überschreibt die leere Datei im Theme)
assets/gallery/   Optionale Galerie-Bilder ohne zugehörigen Beitrag
assets/gear/      Kopfbild der Gear-Seite
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
  als absolute URL, zugeschnitten auf 1200×630. Reihenfolge: das in `cover` bzw.
  `featured_image` benannte Bild, sonst das erste Bild des Beitrags, sonst
  `assets/images/og-image.*` als seitenweiter Rückfall (noch nicht angelegt).

- **`layouts/index.html`** — Landing-Page statt der vollständigen Beitragsliste
  des Themes: Intro, Galerie und die neuesten Beiträge.

- **`layouts/partials/responsive-img.html`** — gemeinsames `<img>` für Galerien,
  Serie, Serien-Teaser und Gear-Seite: WebP-Varianten in festen Breiten, nie
  hochskaliert, die größte ausgelieferte Variante steht immer mit im `srcset`.
  `sizes` muss zur Breite passen, die das CSS tatsächlich anzeigt.

- **`layouts/partials/gallery.html`** — Galerien, gespeist aus `data/gallery.yaml`.

- **`layouts/_default/gear.html`** — Layout der Gear-Seite. Oben der Text aus
  `content/gear.md`, darunter die Blöcke aus `data/gear.yaml` in deren Reihenfolge.
  Einträge ohne `note` rendern nur ihren Namen. Das Kopfbild kommt aus dem Front
  Matter (`photo` als Dateiname unter `assets/gear/`, `photo_alt` als
  Beschreibung) und wird wie bei der Serie in WebP-Varianten ausgeliefert. Ohne
  `photo` rendert die Seite ohne Bild.

- **`layouts/_default/recipes.html`** — Layout der Rezepte-Seite: Text aus
  `content/rezepte.md`, darunter die Basis-Blöcke und je Rezept eine Karte aus
  `data/recipes.yaml`. Ein Rezept ohne `settings` wird übersprungen.
  `layouts/partials/recipe-notes.html` rendert die Hinweise unter einer Tabelle
  und wird von beiden Ebenen genutzt.

- **`layouts/_default/series.html`** — Layout für eine Foto-Serie. Anders als die
  Galerien ein einspaltiger Ablauf in fester Reihenfolge, weil bei einer Serie die
  Abfolge Teil der Aussage ist. Die Bildliste steht im Front Matter der Seite unter
  `photos` (nicht `images`, das ist bei Hugo für OpenGraph reserviert).

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

`content/niederrhein.md` ist eine laufende Serie: eigener Text, feste Reihenfolge,
eigene Seite. Die Blöcke in `data/gallery.yaml` sind lose Sammlungen nach Motiv.
Auf der Startseite steht die Serie oben und wird angeteasert, die Galerien folgen
darunter.

### Gear-Seite pflegen

Das Kopfbild liegt unter `assets/gear/` und wird im Front Matter von
`content/gear.md` über `photo` und `photo_alt` gesetzt. Wie bei den Galerien
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

```yaml
galleries:
  - title: Niederrhein
    description: Felder, Weite und Abendlicht vor der Haustür.
    items:
      - post: uedemer-feld-hohe-muehle
        image: dscf3638.jpg
        caption: Uedemer Feld an der Hohen Mühle

  - title: Wald                 # weiterer Block, einfach anhängen
    items:
      - image: winterwald.jpg   # ohne "post": aus assets/gallery/
        caption: Erster Schnee
```
