# Dokumentations-Implementation für Kvix.de

## Analyse & Empfehlungen

### 1. Astro Docs Theme vs. Custom Implementation

#### Integration von Starlight
Starlight lässt sich nahtlos in bestehende Astro-Projekte integrieren:

**Installation & Setup:**
```bash
# Installation des Starlight Packages
npm install @astrojs/starlight

# Anpassung der astro.config.mjs
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Kvix Guides',
      defaultLocale: 'de',
      locales: {
        de: {
          label: 'Deutsch',
        }
      },
      customCss: [
        // Pfad zu Ihrem bestehenden Tailwind CSS
        './src/style/global.css',
      ],
      sidebar: [
        {
          label: 'Design Guide',
          items: [
            {
              label: 'Prompt Framework',
              collapsed: true,
              items: [
                { label: 'Konzept', link: '/guides/design-guide/prompt-framework/konzept' },
                { label: 'Komposition', link: '/guides/design-guide/prompt-framework/komposition' },
                { label: 'Kreativität', link: '/guides/design-guide/prompt-framework/kreativitat' }
              ]
            },
            {
              label: 'Design Tools',
              collapsed: true,
              items: [
                { label: 'Midjourney', link: '/guides/design-guide/design-tools/midjourney' },
                { label: 'DALL-E', link: '/guides/design-guide/design-tools/dall-e' },
                { label: 'Stable Diffusion', link: '/guides/design-guide/design-tools/stable-diffusion' }
              ]
            }
          ]
        }
      ]
    }),
    // Ihre bestehenden Integrationen bleiben erhalten
    tailwind(),
    // ...weitere Integrationen
  ],
});
```

**Vorteile der Integration:**
- Nutzung des bestehenden Projekt-Setups
- Beibehaltung Ihrer Custom Styles
- Flexible Anpassungsmöglichkeiten
- Dreistufige Navigation unterstützt
- Kompatibel mit Ihrem Tailwind Setup

#### Custom Implementation
Eine eigene Implementierung wäre möglich, aber zeitaufwändiger:

**Vorteile:**
- Vollständige Kontrolle über Design
- Maßgeschneiderte Features
- Nahtlose Integration ins bestehende Design

**Empfehlung:** Starlight als Basis nutzen und das Design anpassen. Dies spart Entwicklungszeit und bietet trotzdem Flexibilität für Anpassungen.

### 2. Content-Management mit Markdown & MDX

#### Markdown für Textinhalte
- Ideal für technische Dokumentation
- Einfache Syntax
- Gute Lesbarkeit
- Versionierbar mit Git

#### MDX für erweiterte Funktionalität
- Ermöglicht React/Astro Components in Markdown
- Perfekt für interaktive Elemente
- Unterstützt komplexe Layouts

**Beispiel MDX mit Galerie-Component:**
```mdx
---
title: Guide Title
layout: ../layouts/GuideLayout.astro
---

# Einführung

Normaler Markdown-Content hier...

<ImageGallery columns={4}>
  <img src="/images/guide/image1.jpg" alt="Beschreibung 1" />
  <img src="/images/guide/image2.jpg" alt="Beschreibung 2" />
  <img src="/images/guide/image3.jpg" alt="Beschreibung 3" />
  <img src="/images/guide/image4.jpg" alt="Beschreibung 4" />
</ImageGallery>
```

### 3. Suchfunktionalität

#### Optionen:

1. **Starlight's integrierte Suche**
   - Clientseitig
   - Keine zusätzliche Infrastruktur nötig
   - Gut für kleinere bis mittlere Dokumentationen

2. **Algolia DocSearch**
   - Leistungsfähige Volltextsuche
   - Kostenlos für Open Source
   - Externe Abhängigkeit

3. **Custom Suche mit Pagefind**
   - Statische Suchindexierung
   - Sehr gute Performance
   - Selbst-gehostet

**Empfehlung:** Start mit Starlight's integrierter Suche, später Upgrade auf Algolia wenn nötig.

### 4. Bildergalerien und Layout

#### Galerie-Component
```typescript
// src/components/docs/ImageGallery.astro
---
interface Props {
  columns?: 2 | 3 | 4 | 6;
  gap?: string;
}

const { columns = 4, gap = '1rem' } = Astro.props;
---

<div class="image-gallery" style={`--columns: ${columns}; --gap: ${gap};`}>
  <slot />
</div>

<style>
  .image-gallery {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: var(--gap);
    margin: 2rem 0;
  }

  .image-gallery :global(img) {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    .image-gallery {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
```

### 5. Navigation und Struktur

#### Vorgeschlagene Struktur:
```
docs/
├── getting-started/
│   ├── introduction.md
│   ├── installation.md
│   └── quick-start.md
├── guides/
│   ├── basic-concepts.md
│   └── advanced-topics.md
└── api/
    └── reference.md
```

#### Dateistruktur für Guides
```
src/content/guides/
├── design-guide/
│   ├── prompt-framework/
│   │   ├── konzept.mdx
│   │   ├── komposition.mdx
│   │   └── kreativitat.mdx
│   └── design-tools/
│       ├── midjourney.mdx
│       ├── dall-e.mdx
│       └── stable-diffusion.mdx
└── weitere-guides/
    └── ...
```

#### Beispiel Guide-Datei (konzept.mdx)
```mdx
---
title: Konzept des Prompt Frameworks
description: Einführung in die Grundlagen des Prompt Engineering Frameworks
---

import { ImageGallery } from '@components/docs/ImageGallery.astro';

# Prompt Framework Konzept

Hier kommt Ihr Markdown-Content...

<ImageGallery columns={4}>
  <img src="/images/guides/prompt-framework/beispiel1.jpg" alt="Beispiel 1" />
  <img src="/images/guides/prompt-framework/beispiel2.jpg" alt="Beispiel 2" />
  <img src="/images/guides/prompt-framework/beispiel3.jpg" alt="Beispiel 3" />
  <img src="/images/guides/prompt-framework/beispiel4.jpg" alt="Beispiel 4" />
</ImageGallery>
```

## Implementierungsplan

1. **Phase 1: Integration**
   - Starlight in bestehendes Projekt integrieren
   - Tailwind-Konfiguration anpassen
   - Guide-Struktur aufsetzen
   - Custom Components migrieren

2. **Phase 2: Content Migration**
   - Bestehende Inhalte in MDX konvertieren
   - Bildergalerien implementieren
   - Navigation strukturieren
   - Erste Guides erstellen

3. **Phase 3: Optimierung**
   - Design-Feinschliff
   - Performance-Tests
   - SEO-Optimierung
   - Benutzer-Feedback einarbeiten

## Technische Anforderungen

- Bestehendes Astro 5.x Projekt
- @astrojs/starlight Package
- MDX Support (wird von Starlight mitgeliefert)
- Tailwind CSS (bereits vorhanden)
- TypeScript (bereits vorhanden)

## Nächste Schritte

1. Installation von @astrojs/starlight
2. Anpassung der Astro-Konfiguration
3. Erstellung der Guide-Verzeichnisstruktur
4. Migration der ImageGallery-Component
5. Erstellung des ersten Guide-Contents
