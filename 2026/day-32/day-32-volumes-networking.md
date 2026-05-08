# Day 32 - Docker Volumes & Networking

## Task 1: The Problem (Ephemeral Data)

### Steps taken:
1. Run a Postgres container without a volume.
2. Create a table and insert data.
3. Remove the container.
4. Start a new container and check for the data.

### Observations:
- Data was lost after the container was removed because no volume was attached. Containers are ephemeral by nature.
