from flask import Flask, request, jsonify, render_template
from flask_cors import CORS  
import pymysql
from datetime import timedelta
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app) 

# Database configuration
DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')

def get_db_connection():
    try:
        return pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            cursorclass=pymysql.cursors.DictCursor
        )
    except Exception as e:
        print(f"Database connection failed: {str(e)}")
        return None  # Handle this case in the API call

def convert_timedelta_to_string(obj):
    """Convert timedelta objects to strings for JSON serialization."""
    if isinstance(obj, timedelta):
        return str(obj)  # Convert timedelta to string
    raise TypeError(f"Object of type {type(obj).__name__} is not JSON serializable")

# @app.route('/')
# def home():
#     return render_template('index.html')  # Serve the front-end

@app.route('/bus-routes', methods=['POST'])
def get_bus_routes():
    # Parse JSON input
    data = request.json
    stop1 = data.get('stop1')
    stop2 = data.get('stop2')

    if not stop1 or not stop2:
        return jsonify({"error": "Both stop1 and stop2 are required"}), 400

    # Connect to the database
    connection = get_db_connection()
    if not connection:
        return jsonify({"error": "Failed to connect to database"}), 500 
   
    try:
        with connection.cursor() as cursor:
            # SQL query
            sql = """
            SELECT DISTINCT b.* 
            FROM Buses b
            JOIN Bus_Routes br1 ON b.bus_id = br1.bus_id
            JOIN Stops s1 ON br1.stop_id = s1.stop_id
            JOIN Bus_Routes br2 ON b.bus_id = br2.bus_id
            JOIN Stops s2 ON br2.stop_id = s2.stop_id
            WHERE s1.stop_name = %s 
            AND s2.stop_name = %s 
            """
            # Execute the query
            cursor.execute(sql, (stop1, stop2))
            results = cursor.fetchall()

            # Convert timedelta objects to strings
            for result in results:
                for key, value in result.items():
                    if isinstance(value, timedelta):
                        result[key] = str(value)  # Convert timedelta to string

            return jsonify(results)
    finally:
        connection.close()


# NOT NEEDED IN ZAPPA 
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)