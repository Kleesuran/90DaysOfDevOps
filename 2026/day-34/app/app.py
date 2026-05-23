import os
import time
from flask import Flask
import psycopg2
import redis

app = Flask(__name__)

# Connect to Redis
redis_host = os.environ.get('REDIS_HOST', 'redis')
cache = redis.Redis(host=redis_host, port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

# Connect to Postgres
def get_db_status():
    db_host = os.environ.get('DB_HOST', 'db')
    db_name = os.environ.get('POSTGRES_DB', 'postgres')
    db_user = os.environ.get('POSTGRES_USER', 'postgres')
    db_password = os.environ.get('POSTGRES_PASSWORD', 'postgres')
    try:
        conn = psycopg2.connect(
            host=db_host,
            database=db_name,
            user=db_user,
            password=db_password
        )
        cur = conn.cursor()
        cur.execute('SELECT version();')
        db_version = cur.fetchone()[0]
        cur.close()
        conn.close()
        return f"Connected! Postgres version: {db_version}"
    except Exception as e:
        return f"Failed to connect to database: {str(e)}"

@app.route('/')
def hello():
    count = get_hit_count()
    db_status = get_db_status()
    return f"""
    <h1>Day 34: Advanced Docker Compose</h1>
    <p>Redis Cache hits: <b>{count}</b> times.</p>
    <p>Database Status: <b>{db_status}</b></p>
    """

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
