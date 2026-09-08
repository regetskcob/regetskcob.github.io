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
content/          Inhalte (Markdown, Posts als Page Bundles mit ihren Bildern)
  posts/          Blogbeiträge
  about.md        Über mich
  library.md      Bibliothek / Buchempfehlungen
  legal.md        Impressum & Datenschutz
layouts/          Eigene Overrides, die das Theme ergänzen oder ersetzen
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
hugo new content posts/mein-beitrag/index.md
```
