# Docker Cheat Sheet

## Container Commands
* **Run a container (interactive):** `docker run -it <image> <command>`
* **Run a container (detached):** `docker run -d <image>`
* **List running containers:** `docker ps`
* **List all containers:** `docker ps -a`
* **Stop a container:** `docker stop <container_id_or_name>`
* **Remove a container:** `docker rm <container_id_or_name>`
* **Execute command in running container:** `docker exec -it <container_id_or_name> <command>`
* **View container logs:** `docker logs <container_id_or_name>`

## Image Commands
* **Build an image:** `docker build -t <tag_name> <path_to_dockerfile_dir>`
* **Pull an image from registry:** `docker pull <image_name>`
* **Push an image to registry:** `docker push <image_name>`
* **Tag an image:** `docker tag <source_image> <target_image>`
* **List local images:** `docker images`
* **Remove a local image:** `docker rmi <image_id_or_name>`

## Volume Commands
* **Create a volume:** `docker volume create <volume_name>`
* **List volumes:** `docker volume ls`
* **Inspect a volume:** `docker volume inspect <volume_name>`
* **Remove a volume:** `docker volume rm <volume_name>`

## Network Commands
* **Create a custom network:** `docker network create <network_name>`
* **List networks:** `docker network ls`
* **Inspect a network:** `docker network inspect <network_name>`
* **Connect a container to a network:** `docker network connect <network_name> <container_name>`

## Compose Commands
* **Start services:** `docker compose up`
* **Start services in detached mode:** `docker compose up -d`
* **Stop and remove services:** `docker compose down`
* **Stop, remove services, and delete volumes:** `docker compose down -v`
* **List services status:** `docker compose ps`
* **View service logs:** `docker compose logs`
* **Rebuild services:** `docker compose build`

## Cleanup Commands
* **Show Docker disk usage:** `docker system df`
* **Clean up unused containers, networks, images (dangling):** `docker system prune`
* **Clean up all unused resources (including volumes and unused images):** `docker system prune -a --volumes`

## Dockerfile Instructions
* **FROM:** Defines the base image.
* **RUN:** Executes commands during the build process (creates a new layer).
* **COPY:** Copies files from host to container.
* **WORKDIR:** Sets the working directory inside the container.
* **EXPOSE:** Documents the port the container listens on at runtime.
* **CMD:** Sets default command/parameters (can be overridden).
* **ENTRYPOINT:** Sets the executable command (harder to override, arguments appended).
