# Guide Google Search Console + Sitemap + SEO (React/Vite)

# 1. Objectif

Ce guide permet de :

* connecter un site à Google Search Console ;
* indexer les pages sur Google ;
* ajouter un sitemap ;
* améliorer le SEO ;
* afficher le favicon/logo dans Google ;
* configurer correctement les balises SEO.

---

# 2. Ajouter le site dans Google Search Console

## Aller sur :

[https://search.google.com/search-console/about](https://search.google.com/search-console/about)

Puis :

```txt id="6rvj9n"
Commencer
```

---

# 3. Ajouter une propriété

Google propose 2 méthodes.

---

# MÉTHODE 1 — Domaine (recommandée)

## À quoi ça sert

Vérifie tout le domaine :

```txt id="4yw4n5"
monsite.com
www.monsite.com
blog.monsite.com
```

---

## Avantage

Plus complète.

---

## Inconvénient

Demande l’accès DNS du domaine.

---

## Étapes

Choisir :

```txt id="jlwmx7"
Domaine
```

Puis :

```txt id="6h0smw"
monsite.com
```

Google donnera un enregistrement TXT DNS.

Exemple :

```txt id="psh1hx"
google-site-verification=XXXX
```

Ajouter cela dans le DNS du domaine.

---

# MÉTHODE 2 — Préfixe URL (plus simple)

## À quoi ça sert

Vérifie uniquement :

```txt id="txr29z"
https://monsite.com
```

---

## Avantage

Très simple.

---

## Étapes

Choisir :

```txt id="9qv2qy"
Préfixe de l’URL
```

Puis :

```txt id="spzcl9"
https://monsite.com
```

---

# 4. Vérifier le site

Google propose plusieurs méthodes.

---

# MÉTHODE A — Balise META (recommandée)

Google fournit :

```html id="tlp37t"
<meta name="google-site-verification" content="CODE" />
```

Ajouter dans :

```txt id="3m1r6w"
index.html
```

Exemple :

```html id="0c4d5y"
<head>
  <meta charset="UTF-8" />

  <meta
    name="google-site-verification"
    content="CODE"
  />
</head>
```

---

# MÉTHODE B — Fichier HTML

Google fournit un fichier :

```txt id="u13b2z"
google123456.html
```

Mettre ce fichier dans :

```txt id="wwm21f"
public/
```

Puis il doit être accessible ici :

```txt id="5wsl88"
https://monsite.com/google123456.html
```

---

# 5. Ajouter le favicon/logo

## À quoi ça sert

Le logo peut apparaître :

* dans Google ;
* dans l’onglet navigateur ;
* dans les partages sociaux.

---

# Ajouter le logo

Mettre :

```txt id="s5ov4g"
logo.png
```

dans :

```txt id="g34l4g"
public/
```

---

# Ajouter dans `index.html`

```html id="bhj3bx"
<link
  rel="icon"
  type="image/png"
  sizes="48x48"
  href="/logo.png"
/>

<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/logo.png"
/>
```

---

# 6. Ajouter les balises SEO globales

Dans :

```txt id="04en9w"
index.html
```

Ajouter :

```html id="rlsokg"
<title>Mon Site</title>

<meta
  name="description"
  content="Agence spécialisée en développement web."
/>

<meta name="robots" content="index,follow" />

<link rel="canonical" href="https://monsite.com/" />
```

---

# 7. Ajouter Open Graph

## À quoi ça sert

Quand quelqu’un partage le site sur :

* WhatsApp ;
* Facebook ;
* LinkedIn ;

ces informations apparaissent.

---

# Ajouter dans `index.html`

```html id="j8h7m0"
<meta property="og:type" content="website" />

<meta property="og:title" content="Mon Site" />

<meta
  property="og:description"
  content="Agence web moderne"
/>

<meta
  property="og:image"
  content="https://monsite.com/logo.png"
/>

<meta
  property="og:url"
  content="https://monsite.com"
/>
```

---

# 8. Ajouter Twitter Card

```html id="07z5wd"
<meta
  name="twitter:card"
  content="summary_large_image"
/>
```

---

# 9. Installer Helmet

## À quoi ça sert

Permet :

* un titre SEO différent par page ;
* une description SEO différente par page.

---

# Installation

```bash id="tlyjlwm"
npm install react-helmet-async
```

---

# 10. Ajouter HelmetProvider

Dans :

```txt id="g7f0d2"
src/main.jsx
```

Ajouter :

```jsx id="s3ifzu"
import { HelmetProvider } from "react-helmet-async";

<HelmetProvider>
  <App />
</HelmetProvider>
```

---

# 11. Ajouter Helmet dans les pages

Exemple :

```jsx id="qca0ph"
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>
    Technologie | Mon Site
  </title>

  <meta
    name="description"
    content="Solutions technologiques modernes."
  />
</Helmet>
```

---

# 12. Créer le sitemap

Créer :

```txt id="jlwmn2"
public/sitemap.xml
```

---

# 13. Exemple de sitemap

```xml id="7brrgn"
<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://monsite.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://monsite.com/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>
```

---

# 14. Vérifier le sitemap

Ouvrir :

```txt id="z3ctqq"
https://monsite.com/sitemap.xml
```

Le XML doit apparaître dans le navigateur.

---

# 15. Envoyer le sitemap dans Search Console

Menu :

```txt id="jlwmwm"
Plans du site
```

Ajouter :

```txt id="jlwmts"
sitemap.xml
```

Puis :

```txt id="jlwmzz"
Soumettre
```

---

# 16. Demander l’indexation

Dans Search Console :

```txt id="jlwmu6"
Inspection d’URL
```

Tester :

```txt id="mjlwm1"
https://monsite.com/contact
```

Puis :

```txt id="jlwmh2"
URL DE TEST EN DIRECT
```

Si :

```txt id="jlwmr8"
URL is available to Google
```

Alors :

```txt id="jlwm94"
REQUEST INDEXING
```

---

# 17. Comprendre les messages Google

## URL is available to Google

✅ page accessible

---

## URL not on Google

⏳ page non indexée pour le moment

---

## Discovered – currently not indexed

⏳ Google connaît la page mais attend avant indexation

---

# 18. Vérifier l’indexation

Dans Google :

```txt id="jlwm3n"
site:monsite.com
```

---

# 19. Temps d’indexation

Google peut prendre :

* quelques heures ;
* plusieurs jours.

---

# 20. Checklist finale SEO

✅ HTTPS
✅ favicon
✅ sitemap
✅ Helmet
✅ Open Graph
✅ meta description
✅ Search Console
✅ indexation demandée

---

# 21. Structure idéale

```txt id="jlhw21"
project/
│
├── public/
│   ├── sitemap.xml
│   ├── favicon.ico
│   ├── logo.png
│
├── src/
│   ├── pages/
│   ├── components/
│
├── index.html
```
