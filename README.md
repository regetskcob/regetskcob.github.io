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
data/
  gallery.yaml    Kuratierte Bildauswahl für die Galerie auf der Startseite
layouts/          Eigene Overrides, die das Theme ergänzen oder ersetzen
assets/css/       Eigenes CSS (custom.css überschreibt die leere Datei im Theme)
assets/gallery/   Optionale Galerie-Bilder ohne zugehörigen Beitrag
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

- **`layouts/partials/gallery.html`** — Galerie, gespeist aus `data/gallery.yaml`.

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
