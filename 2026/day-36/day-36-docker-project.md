# Day 36 – Docker Project: Dockerize a Full Application

## 📋 1. Project Overview & Tech Stack
For Day 36, I chose to build and containerize a **DevOps Task Manager & System Dashboard**. 

Instead of a basic "Hello World" or single-page static site, this is a **production-ready 3-tier application**:
- **Frontend**: A highly polished, responsive dashboard built with semantic HTML, custom HSL styling (dark mode, glassmorphism, micro-animations), and Vanilla JS. It is served by a secured, non-root **Nginx** reverse proxy.
- **Backend API**: A **Node.js + Express** REST API that handles task manipulation and provides mock system metrics (CPU load, memory load, uptime).
- **Database**: A **MongoDB** service to store tasks persistently.

### Why this architecture?
1. **Separation of Concerns**: Simulates a real production environment where frontends and backends are isolated.
2. **Reverse Proxying**: Nginx routes `/api/*` requests to the backend container, avoiding CORS errors and keeping internal endpoints private.
3. **Database Integration**: Demonstrates container linking, custom bridge networks, volume mounts, and boot-dependency health checks.

---

## 🐋 2. The Dockerfiles

### Backend Dockerfile (`backend/Dockerfile`)
The backend image is optimized for size, performance, and security:
- Uses a **multi-stage build** to keep build-time dependencies out of the final layer.
- Uses **non-root user** (`appuser`) for security compliance.
- Uses the minimal **Node 20 Alpine** base image.

```dockerfile
# Stage 1: Build dependencies
FROM docker.io/library/node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies in a clean, production-only way
RUN npm ci --only=production

# Stage 2: Final production image
FROM docker.io/library/node:20-alpine

WORKDIR /usr/src/app

# Create a non-root group and user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built node_modules and configuration files from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./

# Change ownership of the app directory to the non-root user
RUN chown -R appuser:appgroup /usr/src/app

# Switch to the non-root user
USER appuser

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
```

### Frontend Dockerfile (`frontend/Dockerfile`)
For the frontend, we use the official Nginx unprivileged image (`nginxinc/nginx-unprivileged:alpine`) to enforce non-root execution out of the box (runs on port `8080` instead of `80`).

```dockerfile
FROM docker.io/nginxinc/nginx-unprivileged:alpine

# Copy custom Nginx configuration (handles API reverse proxying)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static frontend assets
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration (`frontend/nginx.conf`)
```nginx
server {
    listen 8080;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend service in the docker network
    location /api/ {
        proxy_pass http://backend:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

---

## 🎼 3. Docker Compose Orchestration (`docker-compose.yml`)
The orchestration ties all three containers together on a private network with a healthcheck-based dependency chain.

```yaml
version: '3.8'

services:
  # Frontend static server (Nginx Reverse Proxy)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "${FRONTEND_PORT:-8080}:8080"
    depends_on:
      - backend
    networks:
      - devops-net
    restart: always
    labels:
      project: "90days-devops-project"
      role: "frontend"

  # Backend Node.js API Service
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "${PORT:-3000}:3000"
    environment:
      - MONGO_URI=${MONGO_URI:-mongodb://db:27017/devops_tasks}
      - PORT=${PORT:-3000}
    depends_on:
      db:
        condition: service_healthy
    networks:
      - devops-net
    restart: always
    labels:
      project: "90days-devops-project"
      role: "backend-api"

  # Database Service (MongoDB)
  db:
    image: docker.io/library/mongo:6-jammy
    volumes:
      - mongo_data:/data/db
    networks:
      - devops-net
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "mongosh --eval \"db.adminCommand('ping')\" || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    labels:
      project: "90days-devops-project"
      role: "database"

networks:
  devops-net:
    driver: bridge

volumes:
  mongo_data:
```

---

## 🛠️ 4. Local Deployment Instructions

1. **Start the Stack**:
   ```bash
   podman compose up -d --build
   ```
2. **Access the Dashboard**:
   Open [http://localhost:8080](http://localhost:8080) in your browser.
3. **Verify the Telemetry & Database**:
   - Add new DevOps tasks (e.g. *Deploy Minikube*, *Configure Prometheus Alerting*).
   - Check the **Host Telemetry** section. Metrics refresh automatically every 3 seconds!
4. **Shutdown the Stack**:
   ```bash
   podman compose down -v
   ```

---

## ⚠️ 5. Challenges Faced & Solutions

### Challenge 1: MongoDB Startup Race Condition
**Problem**: The backend service would start up faster than MongoDB, causing the backend connection logic to crash on boot.
**Solution**: 
- Added a `healthcheck` to the `db` service using `mongosh --eval "db.adminCommand('ping')"`.
- Configured the backend's `depends_on` in Compose with `condition: service_healthy` to wait for DB readiness.
- Built **exponential reconnect logic** in `server.js` using `setTimeout` to guarantee resiliency even if MongoDB restarts or experiences temporary timeouts.

### Challenge 2: Non-Root Port Binding and Rootless Podman
**Problem**: When attempting to run Nginx as a non-root user, Nginx could not bind to port `80` because ports below `1024` are privileged.
**Solution**: Switched Nginx to use the unprivileged Nginx image (`nginxinc/nginx-unprivileged`) which defaults to port `8080` internally.

### Challenge 3: Environment Variable Sync
**Problem**: Keeping port bindings and DB connection URIs uniform across the backend, frontend, and Compose can lead to configuration creep.
**Solution**: Configured a `.env` file that centralizes the ports and connection URIs, feeding them seamlessly into the compose stack dynamically.

---

## 🚀 6. Shipment & Shipping Specs

- **Base Images Used**:
  - Node Backend: `node:20-alpine` (Minimal size, lightweight Musl libc environment)
  - Nginx Frontend: `nginxinc/nginx-unprivileged:alpine` (Production-hardened, unprivileged)
  - DB: `mongo:6-jammy`
- **Docker Hub Images**:
  - Frontend: `kleesuran/devops-dashboard-frontend:latest`
  - Backend: `kleesuran/devops-dashboard-backend:latest`
