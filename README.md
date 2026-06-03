# 🎮 lets-play API

API REST sécurisée développée avec **Spring Boot 3**, **MongoDB** et **JWT Authentication**.

Le projet permet :

- Authentification utilisateur
- Gestion des rôles (USER / ADMIN)
- Gestion complète des produits (CRUD)
- Documentation interactive avec Swagger
- Persistance des données avec MongoDB

---

# 📌 Fonctionnalités

## Authentification
✔ Inscription utilisateur  
✔ Connexion JWT  
✔ Génération automatique de token

## Produits
✔ Créer un produit  
✔ Modifier un produit  
✔ Supprimer un produit  
✔ Afficher un produit  
✔ Afficher tous les produits  

## Utilisateurs
✔ Afficher les utilisateurs  
✔ Gestion ADMIN uniquement  

## Sécurité
✔ JWT  
✔ BCrypt  
✔ Spring Security  
✔ Contrôle des rôles  

---

# 🛠 Technologies

| Technologie | Version |
|------------|---------|
| Java | 17 |
| Spring Boot | 3.3.5 |
| Spring Security | 6 |
| MongoDB | 8 |
| JWT | 0.12.6 |
| Swagger | OpenAPI 3 |
| Maven | 3+ |

---

# 📁 Structure du projet

```bash
lets-play
│
├── src
│ ├── main
│ │ ├── java/com/letsplay
│ │ │
│ │ ├── config
│ │ ├── controller
│ │ ├── dto
│ │ ├── exception
│ │ ├── model
│ │ ├── repository
│ │ ├── security
│ │ └── service
│ │
│ └── resources
│
├── pom.xml
└── README.md
```

---

# ⚙️ Installation

## 1 — Cloner

```bash
git clone <repo-url>

cd lets-play
```

---

## 2 — Lancer MongoDB

Vérifier :

```bash
mongod
```

Connexion :

```text
mongodb://localhost:27017
```

---

## 3 — Configurer application.properties

```properties
spring.application.name=lets-play

server.port=8080

spring.data.mongodb.uri=mongodb://localhost:27017/letsplay

app.jwt.secret=your-secret-key

app.jwt.expiration=86400000

app.cors.allowed-origins=http://localhost:3000
```

---

## 4 — Démarrer

```bash
mvn spring-boot:run
```

Attendre :

```text
Tomcat started on port 8080
Started LetsPlayApplication
```

---

# 🌐 Accès application

## Documentation Swagger

```text
http://localhost:8080/swagger-ui/index.html
```

⚠️ Ne pas ouvrir :

```text
http://localhost:8080
```

Le projet est une API REST → aucune interface graphique n’est prévue sur `/`.

---

# 🔐 Authentification

## Inscription

### POST

```http
/auth/register
```

Exemple :

```json
{
"name":"Admin",
"email":"admin@test.com",
"password":"123456"
}
```

---

## Connexion

### POST

```http
/auth/login
```

Exemple :

```json
{
"email":"admin@test.com",
"password":"123456"
}
```

Réponse :

```json
{
"token":"JWT_TOKEN"
}
```

---

# 🔑 Utiliser JWT

Dans Swagger :

1. Login
2. Copier token
3. Cliquer sur :

```text
Authorize
```

4. Coller :

```text
TOKEN
```

(Sans écrire Bearer)

---

# 👤 Endpoints Utilisateurs

## Voir tous les utilisateurs

```http
GET /users
```

Accès :

```text
ADMIN uniquement
```

Exemple :

```json
[
{
"id":"...",
"name":"Admin",
"email":"admin@test.com",
"role":"ADMIN"
}
]
```

---

# 📦 Endpoints Produits

## Voir tous

```http
GET /products
```

Public.

---

## Voir un

```http
GET /products/{id}
```

---

## Créer

```http
POST /products
```

Exemple :

```json
{
"name":"Produit Swagger",
"description":"Créé depuis Swagger",
"price":999
}
```

---

## Modifier

```http
PUT /products/{id}
```

---

## Supprimer

```http
DELETE /products/{id}
```

---

# 🗄 Base MongoDB

Connexion :

```text
localhost:27017
```

Base :

```text
letsplay
```

Collections :

```text
users
products
```

Exemple :

```json
{
"name":"Produit Swagger",
"price":999
}
```

---

# 🔒 Sécurité

Le projet applique :

✔ JWT Authentication  
✔ BCrypt Password Encoder  
✔ Session Stateless  
✔ CORS Configuration  
✔ Protection des routes  

---

# 🧪 Tests réalisés

| Test | Statut |
|------|--------|
| Register | ✅ |
| Login JWT | ✅ |
| GET Users | ✅ |
| CRUD Produits | ✅ |
| Swagger | ✅ |
| MongoDB Compass | ✅ |

---

# 📚 Documentation

Swagger :

```text
http://localhost:8080/swagger-ui/index.html
```

API JSON :

```text
http://localhost:8080/v3/api-docs
```

---

# 👨‍💻 Auteur

Projet universitaire — API REST Spring Boot

Nom :

```text
lets-play API
```