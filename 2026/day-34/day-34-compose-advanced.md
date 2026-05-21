# Day 34 – Docker Compose: Real-World Multi-Container Apps

This document contains notes and verification steps for the Day 34 challenges.

## Task 1: Build Your Own App Stack
* **Status**: Completed setup.
* **Stack**: Python Flask (web) + PostgreSQL (database) + Redis (cache).
* **Dockerfile**: Created at `./app/Dockerfile`.

## Task 2: depends_on & Healthchecks
* **Concept**:
  - `depends_on` defines the order of starting services.
  - Using `condition: service_healthy` ensures that the dependent container (`web`) only starts after the target container (`db`) has successfully run its healthcheck probe (`pg_isready`) and reported `healthy`.
* **Verification Test**:
  - Run `docker compose up -d`
  - Observe `docker compose ps` and `docker compose logs` to see if the web app waits for the DB to be healthy.

## Task 3: Restart Policies
* **Concept & Differences**:
  - `always`: Always restart the container if it stops. If it is manually stopped, it is restarted only when Docker daemon restarts or the container itself is manually started.
  - `on-failure`: Only restart if the container exits with a non-zero exit code.
  - `unless-stopped`: Similar to `always`, but does not restart if it was manually stopped by the user.
* **When to use each**:
  - **`always`**: Critical infrastructure databases or message queues where uptime is paramount, and any stop is an incident.
  - **`on-failure`**: Standard application APIs or microservices where a code crash should trigger a restart, but clean exits (or manual shutdowns) should be respected.
  - **`unless-stopped`**: Production services where you want to keep them running across daemon reboots, but you also want to be able to manually stop them without them auto-spawning.
  - **`no`**: One-off cron jobs, DB migration tasks, or scripts.

## Task 4: Custom Dockerfiles in Compose
* **Build Configuration**:
  - Used `build: ./app` in `docker-compose.yml` to build from local Dockerfile.
* **Command to Rebuild and Restart**:
  ```bash
  docker compose up -d --build
  ```

## Task 5: Named Networks & Volumes
* **Networks**:
  - `frontend`: Exposes the web container.
  - `backend`: Connects web, database, and cache containers. Isolates database and cache from public frontend access.
* **Volumes**:
  - `db_data`: A named volume mapped to `/var/lib/postgresql/data` for persistent DB storage.
* **Labels**:
  - Added `project` and `tier` labels to services.

## Task 6: Scaling
* **Question**: Why doesn't simple scaling work with port mapping?
* **Answer**:
  - When port mapping `5000:5000` is defined, the host's port `5000` is bound to the container's port `5000`.
  - When we scale to multiple instances (e.g., `--scale web=3`), Docker Compose attempts to bind three different containers to the host's port `5000`.
  - Since only one process/container can bind to a specific host port at any given time, the second and third containers fail to start due to port conflicts.
