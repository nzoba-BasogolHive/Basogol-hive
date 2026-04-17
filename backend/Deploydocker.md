# Déploiement et maintenance — Basogol Hive

Ce document explique comment travailler proprement entre le **local**, le **dépôt GitHub** et le **VPS**, sans versionner les secrets.

## 1. Principes à respecter

### Ce qui doit aller dans Git

* le code source backend et frontend
* les Dockerfiles
* `docker-compose.yml`
* les scripts de déploiement
* les fichiers d’exemple d’environnement, par exemple :

  * `backend/.env.docker.example`
  * `frontend/.env.production.example`
* la documentation du projet

### Ce qui ne doit jamais aller dans Git

* les vrais fichiers `.env`
* les mots de passe
* les clés API
* les accès SMTP
* les dumps SQL
* les certificats privés

### Règle simple

**Le code va dans Git. Les secrets restent hors Git.**

---

## 2. Structure recommandée

### Fichiers versionnés

* `docker-compose.yml`
* `backend/.env.docker.example`
* `frontend/.env.production.example`
* `.gitignore`

### Fichiers non versionnés

* `backend/.env.docker`
* `frontend/.env.production`
* `.env`
* `.env.local`

---

## 3. Préparer l’environnement local

Après un `git pull`, recréer les fichiers d’environnement réels à partir des fichiers d’exemple.

### Sous Windows PowerShell

```powershell
copy backend\.env.docker.example backend\.env.docker
copy frontend\.env.production.example frontend\.env.production
```

Ensuite, ouvrir ces deux fichiers et remplacer les valeurs d’exemple par les vraies valeurs locales.

### Vérifier que Git ignore bien les secrets

```bash
git status
```

Résultat attendu :

```text
nothing to commit, working tree clean
```

---

## 4. Workflow de développement normal

### En local

1. Modifier le code
2. Tester localement
3. Commiter uniquement les fichiers versionnés
4. Pousser sur GitHub

### Commandes type

```bash
git add .
git commit -m "Description claire du changement"
git push origin main
```

### Important

Si tu modifies un `.env`, **ne fais pas** `git add` dessus. Ces fichiers doivent rester locaux.

---

## 5. Déploiement sur le VPS

### Se connecter au serveur

```bash
ssh deploy@IP_DU_VPS
```

### Aller dans le projet

```bash
cd /var/www/projects/basogol
```

### Récupérer les dernières modifications

```bash
git pull origin main
```

### Reconstruire et redémarrer les services

```bash
docker compose up -d --build
```

### Appliquer les migrations Django si nécessaire

```bash
docker compose exec backend python manage.py migrate
```

### Vérifier l’état des conteneurs

```bash
docker compose ps
```

### Voir les logs du backend

```bash
docker compose logs --tail=200 backend
```

---

## 6. Variables d’environnement

### Backend — `backend/.env.docker`

Contient généralement :

* `DEBUG`
* `SECRET_KEY`
* `ALLOWED_HOSTS`
* `DB_NAME`
* `DB_USER`
* `DB_PASSWORD`
* `DB_HOST`
* `DB_PORT`
* `EMAIL_HOST`
* `EMAIL_PORT`
* `EMAIL_USE_TLS`
* `EMAIL_HOST_USER`
* `EMAIL_HOST_PASSWORD`
* `DEFAULT_FROM_EMAIL`

### Frontend — `frontend/.env.production`

Contient généralement :

* URL API
* URL publique du site
* variables frontend spécifiques à la production

### Bonnes pratiques

* pas d’espace inutile autour des valeurs
* pas de doublons de variables
* pas de secrets dans les fichiers `.example`

---

## 7. Dépannage — newsletter / email

### Symptôme

L’endpoint `/api/newsletter/` retourne :

```json
{"success":false,"message":"Une erreur est survenue lors de l’envoi de l’email. Veuillez réessayer plus tard."}
```

### Causes fréquentes

* mot de passe SMTP incorrect
* mauvaise adresse SMTP
* conteneur non recréé après modification du `.env`
* migrations non appliquées

### Vérifier les migrations

```bash
docker compose exec backend python manage.py migrate
```

### Tester l’envoi SMTP dans Django

```bash
docker compose exec backend python manage.py shell
```

Puis dans le shell Python :

```python
from django.core.mail import send_mail
from django.conf import settings

send_mail(
    "Test SMTP",
    "Test d'envoi",
    settings.DEFAULT_FROM_EMAIL,
    ["destinataire@example.com"],
    fail_silently=False,
)
```

### Si erreur `SMTPAuthenticationError: 535`

Cela signifie généralement :

* mauvais `EMAIL_HOST_USER`
* mauvais `EMAIL_HOST_PASSWORD`
* ou compte mail non valide

### Après modification du `.env`

Toujours recréer le backend :

```bash
docker compose up -d --force-recreate backend
```

---

## 8. Accès à la base PostgreSQL depuis pgAdmin

### Principe recommandé

Ne pas exposer PostgreSQL publiquement. Utiliser un **tunnel SSH**.

### Exemple de tunnel

Si PostgreSQL est publié en local sur le VPS en `127.0.0.1:55432` :

```powershell
ssh -p 49152 -N -L 5433:127.0.0.1:55432 deploy@IP_DU_VPS
```

Tant que cette commande tourne, la base reste accessible dans pgAdmin.

### Réglages pgAdmin

* Host : `127.0.0.1`
* Port : `5433`
* Database : `basogol`
* User : `postgres`
* Password : mot de passe PostgreSQL

Ne pas activer le tunnel SSH de pgAdmin si tu utilises déjà `ssh -L` dans le terminal.

---

## 9. GitHub sur le VPS

### Méthode recommandée

Utiliser **SSH** plutôt qu’un mot de passe ou un token HTTP.

### Vérifier la clé SSH

```bash
ls -la ~/.ssh
cat ~/.ssh/id_ed25519.pub
```

### Tester GitHub

```bash
ssh -T git@github.com
```

### Remote Git recommandé

```bash
git remote set-url origin git@github.com:nzoba-BasogolHive/Basogol-hive.git
```

### Vérifier

```bash
git remote -v
```

---

## 10. Procédure standard de mise à jour

### Depuis le local

```bash
git add .
git commit -m "Description du changement"
git push origin main
```

### Sur le VPS

```bash
cd /var/www/projects/basogol
git pull origin main
docker compose up -d --build
docker compose exec backend python manage.py migrate
```

---

## 11. Vérifications utiles

### Voir les fichiers modifiés

```bash
git status
```

### Voir les logs backend

```bash
docker compose logs --tail=200 backend
```

### Voir les services Docker

```bash
docker compose ps
```

### Tester l’API newsletter

```bash
curl -i -X POST http://127.0.0.1:8002/api/newsletter/ \
  -H "Host: basogolhive.com" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","language":"fr"}'
```

---

## 12. Rappels importants

* ne jamais commiter les vrais `.env`
* utiliser les `.example` pour documenter la configuration
* appliquer les migrations après un changement de modèle
* recréer les conteneurs après changement d’environnement
* privilégier SSH pour GitHub et pour l’accès distant sécurisé

---

## 13. Commandes utiles résumées

### Local

```bash
git pull origin main
git status
```

### VPS

```bash
cd /var/www/projects/basogol
git pull origin main
docker compose up -d --build
docker compose exec backend python manage.py migrate
docker compose logs --tail=200 backend
```

### pgAdmin via tunnel SSH

```powershell
ssh -p 49152 -N -L 5433:127.0.0.1:55432 deploy@IP_DU_VPS
```

---

## 14. Conseils de sécurité

* changer les mots de passe exposés pendant les tests
* ne pas stocker de secrets dans Git
* limiter l’exposition réseau des services de base de données
* faire des sauvegardes régulières

### Exemple de backup PostgreSQL

```bash
docker compose exec db pg_dump -U postgres basogol > backup.sql
```

---

## 15. Évolution conseillée

Plus tard, il sera utile d’ajouter :

* un script `deploy.sh`
* un workflow GitHub Actions
* une sauvegarde automatique de la base
* un serveur applicatif de production à la place de `runserver`

---

## 16. Résumé final

Le bon fonctionnement du projet repose sur cette logique :

* **le code est versionné**
* **les secrets ne sont jamais versionnés**
* **le VPS récupère le code via Git**
* **les services sont relancés avec Docker Compose**
* **les migrations Django sont appliquées après déploiement**

Si cette discipline est respectée, le projet restera propre, déployable et maintenable.
