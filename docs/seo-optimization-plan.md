# SEO-Optimierungsplan für kvix.de

## Aktuelle SEO-Analyse

### Vorhandene SEO-Elemente
- ✓ Meta-Tags (title, description)
- ✓ OpenGraph Tags für Social Media
- ✓ Twitter Cards
- ✓ JSON-LD Strukturierte Daten
- ✓ Kanonische URLs
- ✓ Korrekte Sprachdeklaration (lang="de")
- ✓ Responsive Design Meta-Tag
- ✓ Font Preloading

### Optimierungspotenziale

## 1. Technische SEO

### 1.1 Performance-Optimierung
- [ ] Implementierung von Image-Optimierung
  ```astro
  import { Image } from 'astro:assets';
  ```
- [ ] Lazy Loading für Bilder unterhalb der Fold
- [ ] WebP-Format für alle Bilder bereitstellen
- [ ] Critical CSS extrahieren und inline einbinden

### 1.2 Sitemap
- [ ] XML-Sitemap erstellen
  ```typescript
  // src/pages/sitemap.xml.ts
  import { getCollection } from 'astro:content';
  ```
- [ ] Robots.txt aktualisieren mit Sitemap-Verweis

### 1.3 Meta-Robots-Tags
- [ ] Noindex für Utility-Pages (z.B. 404, 500)
- [ ] Index für Hauptseiten

## 2. On-Page SEO

### 2.1 Content-Struktur
- [ ] Heading-Hierarchie überprüfen (H1 > H2 > H3)
- [ ] Alt-Texte für alle Bilder
- [ ] Strukturierte Daten erweitern
  ```json
  {
    "@type": "Person",
    "name": "Rico Loschke",
    "jobTitle": "Director Automation & AI",
    "description": "KI Experte",
    "url": "https://kvix.de",
    "sameAs": [
      "https://www.linkedin.com/in/rico-loschke/"
    ]
  }
  ```

### 2.2 Keywords und Content
- [ ] Meta-Descriptions für alle Seiten optimieren
  - Homepage: "Rico Loschke - KI Experte für generative KI und deren praktische Anwendung. ✓ Beratung ✓ Workshops ✓ Vorträge"
  - Kontakt: "Kontaktieren Sie KI-Experte Rico Loschke für Ihre Projekte im Bereich künstliche Intelligenz und digitale Transformation."

### 2.3 URL-Struktur
- [ ] Saubere URL-Struktur beibehalten
- [ ] Keine Parameter in URLs
- [ ] Trailing Slashes konsistent verwenden

## 3. Mobile SEO

### 3.1 Mobile-First
- [ ] Mobile Viewport korrekt konfiguriert
- [ ] Touch-Targets mindestens 48x48px
- [ ] Lesbare Schriftgrößen (min. 16px)

### 3.2 Core Web Vitals
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1

## 4. Lokale SEO

### 4.1 Strukturierte Daten erweitern
```json
{
  "@type": "LocalBusiness",
  "name": "Rico Loschke - KI Experte",
  "description": "Beratung und Expertise im Bereich künstliche Intelligenz",
  "url": "https://kvix.de",
  "areaServed": "Deutschland"
}
```

## 5. Content-Marketing

### 5.1 Blog-Optimierung
- [ ] Blog-Posts mit relevanten Keywords
- [ ] Interne Verlinkung zwischen Artikeln
- [ ] Kategorien und Tags optimieren

## Implementierungsreihenfolge

1. Technische Grundlagen
   - Sitemap.xml erstellen
   - Robots.txt aktualisieren
   - Meta-Robots-Tags implementieren

2. Performance
   - Bildoptimierung
   - Critical CSS
   - Lazy Loading

3. Content & Struktur
   - Heading-Hierarchie
   - Alt-Texte
   - Meta-Descriptions

4. Erweiterte Features
   - Strukturierte Daten
   - Lokale SEO
   - Blog-Optimierung

## Monitoring & Messung

### Tools
- Google Search Console einrichten
- Google Analytics 4 implementieren
- Core Web Vitals monitoring

### KPIs
- Organische Sichtbarkeit
- Klickraten (CTR)
- Bounce Rate
- Core Web Vitals Metriken
- Mobile Performance

## Automatisierung

### Build-Zeit Checks
```typescript
// scripts/seo-check.ts
import { glob } from 'glob';
import { readFile } from 'fs/promises';

async function checkSEO() {
  const files = await glob('src/pages/**/*.astro');
  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    // Prüfe Meta-Tags, Headings, etc.
  }
}
```

## Nächste Schritte

1. Implementierung der technischen SEO-Grundlagen
2. Content-Optimierung der Hauptseiten
3. Performance-Optimierung
4. Monitoring-Setup
5. Regelmäßige SEO-Audits
