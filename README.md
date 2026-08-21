# Eventia Location — Backend microservices

Implémentation des 4 services REST décrits dans l'énoncé du Laboratoire 1 (Institut Teccart).

| Service | Port | Base MongoDB | Ressource |
|---|---|---|---|
| client-service | 4001 | eventia-clients | `/api/clients` |
| equipment-service | 4002 | eventia-equipements | `/api/equipements` |
| reservation-service | 4003 | eventia-reservations | `/api/reservations` |
| notification-service | 4004 | eventia-notifications | `/api/notifications` |

Chaque service suit le pattern **Controller → Service → Repository → Model** (Mongoose), tel que décrit dans les diagrammes de classes de l'énoncé (voir `docs/exigences-user-stories-uml.md`).

## Démarrage rapide (sans Docker)

MongoDB doit tourner localement (`mongod`) sur `localhost:27017`, ou remplacez `MONGO_URI` dans chaque `.env`.

```bash
# Pour CHAQUE service (client-service, equipment-service, reservation-service, notification-service) :
cd <service>
cp .env.example .env
npm install
npm run dev     # ou: npm start
```

**Important** : démarrez `client-service`, `equipment-service` et `notification-service` AVANT `reservation-service`, puisque ce dernier les appelle.

## Démarrage rapide (avec Docker Compose)

```bash
docker compose up --build
```

Cela démarre MongoDB (un conteneur unique avec 4 bases logiques, pour simplifier le dev local) et les 4 services sur leurs ports respectifs.

## Tester rapidement

```bash
# Créer un client
curl -X POST http://localhost:4001/api/clients \
  -H "Content-Type: application/json" \
  -d '{"name":"Jean Tremblay","email":"jean@example.com","phone":"514-555-1234"}'

# Ajouter un équipement
curl -X POST http://localhost:4002/api/equipements \
  -H "Content-Type: application/json" \
  -d '{"name":"Projecteur EPSON","category":"Projection","dailyPrice":50,"availableQuantity":5}'

# Créer une réservation (remplacez les id ci-dessus)
curl -X POST http://localhost:4003/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"clientId":"<clientId>","equipmentId":"<equipmentId>","quantity":2,"startDate":"2026-09-01","endDate":"2026-09-03"}'

# Consulter les notifications générées automatiquement
curl http://localhost:4004/api/notifications
```

## Structure

```
eventia-location/
├── docs/
│   └── exigences-user-stories-uml.md   # RF, user stories, diagrammes UML (Mermaid)
├── client-service/
├── equipment-service/
├── reservation-service/
└── notification-service/
```

Chaque service a la même structure interne :

```
<service>/
├── package.json
├── .env.example
└── src/
    ├── models/        # Schéma Mongoose (équivaut à la classe "entité")
    ├── repositories/   # Accès aux données (findAll, findById, create...)
    ├── services/       # Logique métier + validations
    ├── controllers/    # Gestion des requêtes/réponses HTTP
    ├── routes/         # Définition des routes Express
    ├── app.js          # Configuration Express
    └── server.js        # Point d'entrée, connexion MongoDB
```

`reservation-service` contient en plus `src/clients/`, qui implémente les interfaces `IClientAPI`, `IMaterielAPI` et `INotificationAPI` du diagramme de classes (appels REST vers les autres services via `axios`).

## Prochaines étapes suggérées

- Le frontend React (fourni, non modifié) doit pointer vers `http://localhost:4001`, `4002`, `4003`.
- Ajouter des tests (Jest + Supertest) par service.
- Respecter la stratégie de branches Git décrite dans l'énoncé (`feature/*` → PR vers `develop` → PR vers `main`).
