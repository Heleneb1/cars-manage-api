# Étape 1 : Build lts version stable de node et alléger l'image
FROM node:lts-slim AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production 

# Copier tout le projet
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Exécution
FROM node:lts-slim AS runner

WORKDIR /app

# Copier les fichiers compilés depuis la première étape
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Exposer le port utilisé par l'application
EXPOSE 3000

# Démarrer l'application
CMD ["node", "dist/main.js"]
