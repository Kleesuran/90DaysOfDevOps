import time
import os
from flask import Flask
import redis
import psycopg2

app = Flask(__name__)

# Connect to Redis
cache = redis.Redis(host='redis', port=6379)

# Connect to PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(
        host="db",
        database=os.environ.get("POSTGRES_DB", "mydb"),
        user=os.environ.get("POSTGRES_USER", "myuser"),
        password=os.environ.get("POSTGRES_PASSWORD", "mypassword")
    )
    return conn

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

@app.route('/')
def hello():
    count = get_hit_count()
    
    # Check Database connection and get version
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT version();')
    db_version = cur.fetchone()[0]
    cur.close()
    conn.close()
    
    return f"""
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1 style="color: #2e7d32;">Hello from Docker Compose! 🚀</h1>
        <p style="font-size: 1.2em;">This page has been viewed <strong>{count}</strong> times.</p>
        <p style="color: #555;">Successfully connected to the database!</p>
        <p style="font-size: 0.9em; color: #888; background-color: #f5f5f5; display: inline-block; padding: 10px; border-radius: 5px;">
            DB Version: {db_version}
        </p>
    </div>
    """

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
