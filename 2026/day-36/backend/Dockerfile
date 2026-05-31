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
