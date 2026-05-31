# Day 35: Multi-Stage Builds & Docker Hub

## Task 1 & 2: Image Size Comparison (Single-Stage vs Multi-Stage)

To demonstrate the size difference, we built a simple Go web application (`main.go`) using both single-stage and multi-stage Dockerfiles.

### Go Web Application (`main.go`)
This app starts a simple HTTP server on port 8080.

### Dockerfiles
- **Single-Stage (`Dockerfile.single`)**: Uses `golang:1.21` (~800MB+) as the base image and builds/runs the app inside the same container.
- **Multi-Stage (`Dockerfile.multi`)**: Uses `golang:1.21` only as the build stage (`AS builder`), then copies only the compiled binary to a tiny `alpine:3.18` final image (~7MB).

### Size Analysis Table

| Image Type | Dockerfile | Base Image | Approximate Size | Size Reduction |
|---|---|---|---|---|
| **Single-Stage** | `Dockerfile.single` | `golang:1.21` (Debian-based) | **~840 MB** | Base Line |
| **Multi-Stage** | `Dockerfile.multi` | `alpine:3.18` (Final) | **~19 MB** | **~97.7% smaller** |
| **Best Practices** | `Dockerfile.bestpractices` | `alpine:3.18.4` (Final) + Non-root | **~19 MB** | **~97.7% smaller + Secure** |

### Why is the Multi-Stage Image so much smaller?
1. **No Build Toolchain in the Final Image:** The compiler, standard libraries, git, and other build utilities inside the large `golang:1.21` image are left behind in the first stage.
2. **Minimal Operating System:** The final base image is `alpine`, which is extremely lightweight (around 7MB) compared to a full Debian/Ubuntu distribution (around 100-200MB).
3. **Only Built Artifacts are Copied:** The final container contains *only* the compiled binary `/app/main` and the bare minimum library files needed to execute it.

---

## Task 3 & 4: Push to Docker Hub

Here is how the image was tagged and pushed to Docker Hub:

1. **Login to Docker Hub:**
   ```bash
   docker login -u <your-dockerhub-username>
   ```
2. **Build and Tag the Image:**
   ```bash
   # Build the best practices image
   docker build -t day-35-go-app -f Dockerfile.bestpractices .

   # Tag for Docker Hub
   docker tag day-35-go-app:latest <your-dockerhub-username>/day-35-go-app:1.0.0
   docker tag day-35-go-app:latest <your-dockerhub-username>/day-35-go-app:latest
   ```
3. **Push to Docker Hub:**
   ```bash
   docker push <your-dockerhub-username>/day-35-go-app:1.0.0
   docker push <your-dockerhub-username>/day-35-go-app:latest
   ```
4. **Verify by Pulling:**
   ```bash
   # Remove local images to verify
   docker rmi <your-dockerhub-username>/day-35-go-app:1.0.0
   docker pull <your-dockerhub-username>/day-35-go-app:1.0.0
   ```

---

## Task 5: Docker Image Best Practices Applied

The following best practices were applied to `Dockerfile.bestpractices`:

1. **Minimal Base Image:** Used `golang:1.21-alpine` for the build stage to keep build times down, and `alpine:3.18.4` for the runtime stage to keep the final size tiny.
2. **Specific Base Image Tags:** Avoided `latest` tags. Used explicit tags like `golang:1.21-alpine` and `alpine:3.18.4` to ensure builds are reproducible and won't break when a new base version is released.
3. **Non-Root USER:** Added a dedicated system user/group (`appuser` / `appgroup`) and switched to it using `USER appuser`. This prevents container breakout vulnerabilities from gaining root access on the host.
4. **Minimal Layers & Cleanup:** Copied files with appropriate ownership (`--chown=appuser:appgroup`) in a single step to avoid creating extra modified file layers.
