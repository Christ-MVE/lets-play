# 🎮 lets-play API

API REST sécurisée développée avec **Spring Boot 3**, **MongoDB** et **JWT Authentication**.

Projet réalisé dans le cadre d’un projet académique afin de construire une API REST moderne avec authentification, gestion des utilisateurs et gestion de produits.

---

# 📌 Fonctionnalités

## 🔐 Authentification

* Inscription utilisateur
* Connexion JWT
* Génération automatique de token
* Gestion des rôles

## 👤 Utilisateurs

* Consultation des utilisateurs
* Protection ADMIN

## 📦 Produits

* Création
* Modification
* Suppression
* Consultation

## 📚 Documentation

* Swagger / OpenAPI intégré
* Tests directs depuis le navigateur

---

# 🛠 Technologies utilisées

| Technologie     | Version   |
| --------------- | --------- |
| Java            | 17        |
| Spring Boot     | 3.3       |
| Spring Security | 6         |
| MongoDB         | 8         |
| JWT             | 0.12.6    |
| Swagger         | OpenAPI 3 |
| Maven           | 3+        |

---

# 📁 Structure du projet

```bash
lets-play
│
├── src
│   ├── main
│   │   ├── java/com/letsplay
│   │   │
│   │   ├── config
│   │   ├── controller
│   │   ├── dto
│   │   ├── exception
│   │   ├── model
│   │   ├── repository
│   │   ├── security
│   │   └── service
│   │
│   └── resources
│
├── pom.xml
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## Cloner le projet

```bash
git clone https://github.com/Christ-MVE/lets-play.git

cd lets-play
```

---

## Lancer MongoDB

```bash
mongod
```

Connexion :

```text
mongodb://localhost:27017
```

---

## Configuration

Créer ou modifier :

```properties
src/main/resources/application.properties
```

```properties
spring.application.name=lets-play

server.port=8080

spring.data.mongodb.uri=mongodb://localhost:27017/letsplay

app.jwt.secret=your-secret-key

app.jwt.expiration=86400000

app.cors.allowed-origins=http://localhost:3000
```

---

## Démarrage

```bash
mvn spring-boot:run
```

Application :

```text
http://localhost:8080
```

---

# 📚 Documentation Swagger

Accéder à :

```text
http://localhost:8080/swagger-ui/index.html
```

Permet :

* tester les endpoints
* générer les requêtes
* utiliser JWT
* visualiser les réponses

---

# 🔐 Authentification

## Register

```http
POST /auth/register
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

## Login

```http
POST /auth/login
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

# 🔑 Utiliser JWT dans Swagger

1. Se connecter
2. Copier le token
3. Cliquer sur **Authorize**
4. Coller uniquement :

```text
JWT_TOKEN
```

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

---

# 📦 Endpoints Produits

## Tous les produits

```http
GET /products
```

---

## Produit par ID

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

# 🗄 Base de données

MongoDB :

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

---

# 🔒 Sécurité

Le projet utilise :

* JWT Authentication
* BCrypt Password Encoder
* Spring Security
* Session Stateless
* Contrôle des rôles

---

# 🧪 Tests réalisés

✅ Register
✅ Login JWT
✅ CRUD Produits
✅ Gestion ADMIN
✅ Swagger
✅ MongoDB Compass

---

# 👨‍💻 Auteurs

### Christ Renaud MVE

Développement backend • Architecture • Sécurité • Intégration

### Amine CHACHOU

Développement • Implémentation • Validation

---

# 📄 Licence

Projet académique — usage éducatif.
