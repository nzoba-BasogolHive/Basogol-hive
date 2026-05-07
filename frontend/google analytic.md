# Guide Google Analytics 4 (GA4) — React/Vite

# 1. Objectif

Google Analytics permet de :

* voir le nombre de visiteurs ;
* voir les pages visitées ;
* voir le pays des visiteurs ;
* suivre les clics et conversions ;
* analyser le trafic du site.

---

# 2. Créer un compte Google Analytics

Aller sur :

[https://analytics.google.com/](https://analytics.google.com/)

Puis :

```txt id="lfx9g1"
Commencer
```

---

# 3. Créer une propriété

## Étape 1 — Nom du compte

Exemple :

```txt id="jlwm01"
Basogol-Hive
```

---

## Étape 2 — Créer une propriété

Exemple :

```txt id="jlwm02"
Basogol-Hive Website
```

Choisir :

* pays ;
* devise ;
* fuseau horaire.

Puis :

```txt id="jlwm03"
Suivant
```

---

# 4. Choisir le type de plateforme

Choisir :

```txt id="jlwm04"
Web
```

---

# 5. Ajouter le site

Entrer :

```txt id="jlwm05"
https://monsite.com
```

Puis :

```txt id="jlwm06"
Nom du flux
```

Exemple :

```txt id="jlwm07"
Basogol-Hive Web
```

Puis :

```txt id="jlwm08"
Créer un flux
```

---

# 6. Récupérer l’ID Google Analytics

Google donnera un ID :

```txt id="jlwm09"
G-XXXXXXXXXX
```

IMPORTANT :

Conserver cet ID.

---

# 7. Installer Google Analytics dans React/Vite

# MÉTHODE 1 — Google Tag (recommandée)

Ajouter dans :

```txt id="jlwm10"
index.html
```

avant :

```html id="jlwm11"
</head>
```

---

# Ajouter ce code

```html id="jlwm12"
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

<script>
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

# IMPORTANT

Remplacer :

```txt id="jlwm13"
G-XXXXXXXXXX
```

par votre vrai ID.

Exemple :

```txt id="jlwm14"
G-ABC123XYZ
```

---

# 8. Vérifier si Analytics fonctionne

Retourner dans :

```txt id="jlwm15"
Google Analytics
```

Puis :

```txt id="jlwm16"
Rapports
```

---

# Ouvrir le site

Visiter le site dans un autre onglet.

Après quelques secondes :

```txt id="jlwm17"
1 utilisateur actif
```

doit apparaître.

---

# 9. Activer les statistiques avancées

Dans :

```txt id="jlwm18"
Admin
```

Puis :

```txt id="jlwm19"
Flux de données
```

Cliquer sur le site.

---

# Activer :

```txt id="jlwm20"
Mesure améliorée
```

---

# Cela permet de suivre :

✅ scroll
✅ clics sortants
✅ téléchargements
✅ recherches
✅ vidéos
✅ pages vues

---

# 10. Ajouter Analytics sur chaque page React

Avec React Router, Analytics peut parfois ne pas détecter les changements de pages automatiquement.

---

# Installer React GA

```bash id="jlwm21"
npm install react-ga4
```

---

# 11. Configurer React GA

Créer :

```txt id="jlwm22"
src/analytics.js
```

---

# Ajouter :

```js id="jlwm23"
import ReactGA from "react-ga4";

ReactGA.initialize("G-XXXXXXXXXX");

export default ReactGA;
```

---

# 12. Initialiser dans `main.jsx`

```jsx id="jlwm24"
import "./index.css";
import App from "./App.jsx";

import ReactGA from "./analytics";

ReactGA.send("pageview");

createRoot(document.getElementById("root")).render(
  <App />
);
```

---

# 13. Suivre les pages automatiquement

Dans :

```txt id="jlwm25"
App.jsx
```

---

# Ajouter :

```jsx id="jlwm26"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import ReactGA from "./analytics";
```

---

# Puis :

```jsx id="jlwm27"
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
    });
  }, [location]);

  return null;
}
```

---

# Puis dans App :

```jsx id="jlwm28"
<>
  <AnalyticsTracker />

  <Routes>
    {/* routes */}
  </Routes>
</>
```

---

# 14. Vérifier les pages vues

Dans Google Analytics :

```txt id="jlwm29"
Rapports
→ Engagement
→ Pages et écrans
```

---

# 15. Temps d’apparition des données

Temps réel :

```txt id="jlwm30"
quelques secondes
```

Rapports complets :

```txt id="jlwm31"
24h à 48h
```

---

# 16. Ajouter Google Analytics à Google Search Console

Permet de relier :

* SEO ;
* trafic ;
* recherches Google.

---

# Étapes

Dans :

```txt id="jlwm32"
Google Search Console
```

Puis :

```txt id="jlwm33"
Paramètres
→ Associations
```

---

# Cliquer :

```txt id="jlwm34"
Associer
```

Choisir :

```txt id="jlwm35"
Google Analytics
```

---

# 17. Vérifier l’installation

Utiliser :

[https://tagassistant.google.com/](https://tagassistant.google.com/)

---

# 18. Erreurs fréquentes

# Rien dans Analytics

Causes :

* mauvais ID ;
* code absent ;
* cache navigateur ;
* adblock activé.

---

# Mauvaises pages suivies

Cause :

React Router sans tracking manuel.

---

# 19. Checklist finale

✅ compte Analytics créé
✅ propriété GA4 créée
✅ ID G-XXXXXXXXXX récupéré
✅ script ajouté dans index.html
✅ React GA installé
✅ tracking React Router ajouté
✅ pages vues fonctionnelles
✅ Search Console liée

---

# 20. Structure finale

```txt id="jlwm36"
project/
│
├── src/
│   ├── analytics.js
│   ├── App.jsx
│   ├── main.jsx
│
├── index.html
```
