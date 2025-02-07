# Cars Manage API

API RESTful permettant de gérer les voitures, avec des fonctionnalités telles que la création, la lecture, la mise à jour, et la suppression (CRUD). Elle inclut également une fonctionnalité de pagination pour les listes de voitures, ainsi que la recherche par marque.

### 🛠️ Technologies utilisées

- NestJS - Framework Node.js
- MongoDB - Base de données NoSQL
- Docker - Conteneurisation
- Docker Compose - Orchestration des conteneurs

### Prérequis

- Node.js (v20+ recommandé)

- Docker & Docker Compose (si utilisation de Docker)

- MongoDB (si installation locale)

### ▶️ Installation et exécution

1. Cloner le projet  
   https://github.com/Heleneb1/cars-manage-api.git

2. Se rendre sur le projet via cette commande :

```
cd cars-manage-api
```

3. Installation des dépendances

```
npm install
```

4. Configuration de l'environnement (un modele est visible sous .env.sample)

```
MONGO_URI=mongodb://localhost:27017/carsdb
JWT_SECRET=ton_secret_jwt
PORT=3001
```

5. Démarrer l'API

```
npm run start:dev
```

L'API sera accessible sur http://localhost:3001.

🔹Démarrer l'application avec Docker

```
docker-compose up -d
```

les Endpoints disponible l'API est documenté en partie avec Swagger

🔹 Accéder à Swagger

Une fois l'API démarrée, ouvre :👉 http://localhost:3001/api

( json visible sur http://localhost:3001/api-json )
