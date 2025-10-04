from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import mysql.connector
from mysql.connector import Error
import json
import time
from datetime import datetime, timedelta
import threading
import random

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Database configuration
DB_CONFIG = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': 'root',
    'database': 'buslensdb',
    'charset': 'utf8mb4'
}

def get_db_connection():
    """Create database connection"""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def init_database():
    """Initialize database with sample data"""
    connection = get_db_connection()
    if not connection:
        return
    
    cursor = connection.cursor()
    
    try:
        # Create tables
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS stations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                city VARCHAR(100) NOT NULL,
                latitude DECIMAL(10, 8),
                longitude DECIMAL(11, 8),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS routes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                route_number VARCHAR(10) NOT NULL,
                name VARCHAR(255) NOT NULL,
                from_station_id INT,
                to_station_id INT,
                duration_minutes INT,
                frequency_minutes INT,
                total_stops INT,
                color VARCHAR(7),
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (from_station_id) REFERENCES stations(id),
                FOREIGN KEY (to_station_id) REFERENCES stations(id)
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS route_stops (
                id INT AUTO_INCREMENT PRIMARY KEY,
                route_id INT,
                station_id INT,
                sequence_order INT,
                FOREIGN KEY (route_id) REFERENCES routes(id),
                FOREIGN KEY (station_id) REFERENCES stations(id)
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS buses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                route_id INT,
                bus_number VARCHAR(20),
                current_latitude DECIMAL(10, 8),
                current_longitude DECIMAL(11, 8),
                status ENUM('On Time', 'Delayed', 'Early') DEFAULT 'On Time',
                next_stop_id INT,
                passengers_count INT DEFAULT 0,
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (route_id) REFERENCES routes(id),
                FOREIGN KEY (next_stop_id) REFERENCES stations(id)
            )
        """)
        
        # Insert sample data
        insert_sample_data(cursor)
        
        connection.commit()
        print("Database initialized successfully")
        
    except Error as e:
        print(f"Error initializing database: {e}")
    finally:
        cursor.close()
        connection.close()

def insert_sample_data(cursor):
    """Insert sample data for Tricity region"""
    
    # Insert stations
    stations = [
        ('Sector 17 Bus Stand', 'Chandigarh', 30.7333, 76.7794),
        ('ISBT 43', 'Chandigarh', 30.7500, 76.8000),
        ('Panchkula Bus Stand', 'Panchkula', 30.7600, 76.8200),
        ('Mohali Bus Stand', 'Mohali', 30.7200, 76.7500),
        ('Sector 22', 'Chandigarh', 30.7400, 76.7800),
        ('Sector 35', 'Chandigarh', 30.7300, 76.7900),
        ('Sector 43', 'Chandigarh', 30.7500, 76.8000),
        ('Zirakpur Bus Stand', 'Zirakpur', 30.7000, 76.7000),
        ('Chandigarh Airport', 'Chandigarh', 30.7100, 76.7900),
        ('Punjab University', 'Chandigarh', 30.7400, 76.7600),
    ]
    
    cursor.executemany("""
        INSERT IGNORE INTO stations (name, city, latitude, longitude) 
        VALUES (%s, %s, %s, %s)
    """, stations)
    
    # Insert routes
    routes = [
        ('101', 'Chandigarh-Panchkula Express', 1, 3, 25, 10, 8, '#6366f1'),
        ('205', 'Chandigarh-Mohali Connector', 2, 4, 20, 15, 6, '#10b981'),
        ('312', 'Tricity Circular', 1, 8, 45, 20, 12, '#ef4444'),
        ('420', 'Airport Express', 9, 1, 30, 30, 5, '#8b5cf6'),
        ('501', 'University Line', 10, 3, 35, 25, 10, '#f59e0b'),
    ]
    
    cursor.executemany("""
        INSERT IGNORE INTO routes (route_number, name, from_station_id, to_station_id, duration_minutes, frequency_minutes, total_stops, color) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, routes)
    
    # Insert route stops
    route_stops = [
        (1, 1, 1), (1, 5, 2), (1, 6, 3), (1, 7, 4), (1, 2, 5), (1, 3, 6), (1, 3, 7), (1, 3, 8),
        (2, 2, 1), (2, 7, 2), (2, 6, 3), (2, 4, 4), (2, 4, 5), (2, 4, 6),
        (3, 1, 1), (3, 5, 2), (3, 6, 3), (3, 2, 4), (3, 3, 5), (3, 4, 6), (3, 8, 7), (3, 8, 8), (3, 8, 9), (3, 8, 10), (3, 8, 11), (3, 8, 12),
        (4, 9, 1), (4, 6, 2), (4, 7, 3), (4, 2, 4), (4, 1, 5),
        (5, 10, 1), (5, 5, 2), (5, 6, 3), (5, 2, 4), (5, 3, 5), (5, 3, 6), (5, 3, 7), (5, 3, 8), (5, 3, 9), (5, 3, 10),
    ]
    
    cursor.executemany("""
        INSERT IGNORE INTO route_stops (route_id, station_id, sequence_order) 
        VALUES (%s, %s, %s)
    """, route_stops)
    
    # Insert buses
    buses = [
        (1, 'CH-101-001', 30.7333, 76.7794, 'On Time', 2, 45),
        (2, 'CH-205-001', 30.7500, 76.8000, 'On Time', 4, 32),
        (3, 'CH-312-001', 30.7200, 76.7500, 'Delayed', 6, 28),
        (4, 'CH-420-001', 30.7100, 76.7900, 'On Time', 9, 15),
        (5, 'CH-501-001', 30.7400, 76.7600, 'On Time', 10, 38),
    ]
    
    cursor.executemany("""
        INSERT IGNORE INTO buses (route_id, bus_number, current_latitude, current_longitude, status, next_stop_id, passengers_count) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, buses)

# API Routes
@app.route('/api/stations/search', methods=['GET'])
def search_stations():
    query = request.args.get('q', '')
    if len(query) < 2:
        return jsonify([])
    
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = connection.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT id, name, city, latitude, longitude 
            FROM stations 
            WHERE name LIKE %s OR city LIKE %s 
            ORDER BY 
                CASE WHEN name LIKE %s THEN 1 ELSE 2 END,
                name
            LIMIT 10
        """, (f'%{query}%', f'%{query}%', f'{query}%'))
        
        results = cursor.fetchall()
        return jsonify(results)
        
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/routes/search', methods=['GET'])
def search_routes():
    from_station = request.args.get('from', '')
    to_station = request.args.get('to', '')
    
    if not from_station or not to_station:
        return jsonify({'error': 'Both from and to stations are required'}), 400
    
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = connection.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT DISTINCT r.*, 
                   fs.name as from_station_name, 
                   ts.name as to_station_name
            FROM routes r
            JOIN stations fs ON r.from_station_id = fs.id
            JOIN stations ts ON r.to_station_id = ts.id
            JOIN route_stops rs1 ON r.id = rs1.route_id
            JOIN route_stops rs2 ON r.id = rs2.route_id
            JOIN stations s1 ON rs1.station_id = s1.id
            JOIN stations s2 ON rs2.station_id = s2.id
            WHERE (s1.name LIKE %s OR s1.city LIKE %s)
            AND (s2.name LIKE %s OR s2.city LIKE %s)
            AND rs1.sequence_order < rs2.sequence_order
            AND r.is_active = TRUE
            ORDER BY r.route_number
        """, (f'%{from_station}%', f'%{from_station}%', f'%{to_station}%', f'%{to_station}%'))
        
        results = cursor.fetchall()
        return jsonify(results)
        
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/routes/<int:route_id>', methods=['GET'])
def get_route_details(route_id):
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = connection.cursor(dictionary=True)
    
    try:
        # Get route details
        cursor.execute("""
            SELECT r.*, fs.name as from_station_name, ts.name as to_station_name
            FROM routes r
            JOIN stations fs ON r.from_station_id = fs.id
            JOIN stations ts ON r.to_station_id = ts.id
            WHERE r.id = %s
        """, (route_id,))
        
        route = cursor.fetchone()
        if not route:
            return jsonify({'error': 'Route not found'}), 404
        
        # Get route stops
        cursor.execute("""
            SELECT s.name, s.city, rs.sequence_order
            FROM route_stops rs
            JOIN stations s ON rs.station_id = s.id
            WHERE rs.route_id = %s
            ORDER BY rs.sequence_order
        """, (route_id,))
        
        stops = cursor.fetchall()
        route['stops'] = stops
        
        return jsonify(route)
        
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/buses/locations', methods=['GET'])
def get_bus_locations():
    route_id = request.args.get('route')
    
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = connection.cursor(dictionary=True)
    
    try:
        query = """
            SELECT b.*, r.route_number, r.name as route_name, r.color,
                   s.name as next_stop_name
            FROM buses b
            JOIN routes r ON b.route_id = r.id
            LEFT JOIN stations s ON b.next_stop_id = s.id
            WHERE r.is_active = TRUE
        """
        params = []
        
        if route_id:
            query += " AND r.id = %s"
            params.append(route_id)
        
        query += " ORDER BY r.route_number"
        
        cursor.execute(query, params)
        results = cursor.fetchall()
        
        return jsonify(results)
        
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/api/analytics/system', methods=['GET'])
def get_system_analytics():
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = connection.cursor(dictionary=True)
    
    try:
        # Get system statistics
        cursor.execute("SELECT COUNT(*) as total_routes FROM routes WHERE is_active = TRUE")
        total_routes = cursor.fetchone()['total_routes']
        
        cursor.execute("SELECT COUNT(*) as total_stations FROM stations")
        total_stations = cursor.fetchone()['total_stations']
        
        cursor.execute("SELECT COUNT(*) as active_buses FROM buses")
        active_buses = cursor.fetchone()['active_buses']
        
        # Get ridership data (mock data for now)
        ridership_data = []
        for hour in range(6, 22):
            ridership_data.append({
                'time': f'{hour}:00',
                'passengers': random.randint(100, 800)
            })
        
        return jsonify({
            'total_routes': total_routes,
            'total_stations': total_stations,
            'active_buses': active_buses,
            'ridership_data': ridership_data
        })
        
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

# WebSocket for real-time updates
@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('status', {'msg': 'Connected to BusLens real-time updates'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

def simulate_bus_movement():
    """Simulate real-time bus movement updates"""
    while True:
        connection = get_db_connection()
        if connection:
            cursor = connection.cursor(dictionary=True)
            try:
                cursor.execute("""
                    SELECT b.*, r.route_number, r.color
                    FROM buses b
                    JOIN routes r ON b.route_id = r.id
                """)
                buses = cursor.fetchall()
                
                for bus in buses:
                    # Simulate small position changes
                    lat_change = random.uniform(-0.001, 0.001)
                    lng_change = random.uniform(-0.001, 0.001)
                    
                    new_lat = bus['current_latitude'] + lat_change
                    new_lng = bus['current_longitude'] + lng_change
                    
                    cursor.execute("""
                        UPDATE buses 
                        SET current_latitude = %s, current_longitude = %s, last_updated = NOW()
                        WHERE id = %s
                    """, (new_lat, new_lng, bus['id']))
                    
                    # Emit real-time update
                    socketio.emit('bus_update', {
                        'bus_id': bus['id'],
                        'route_number': bus['route_number'],
                        'latitude': new_lat,
                        'longitude': new_lng,
                        'status': bus['status'],
                        'passengers': bus['passengers_count'],
                        'color': bus['color']
                    })
                
                connection.commit()
                
            except Error as e:
                print(f"Error in bus simulation: {e}")
            finally:
                cursor.close()
                connection.close()
        
        time.sleep(10)  # Update every 10 seconds

if __name__ == '__main__':
    # Initialize database
    init_database()
    
    # Start bus movement simulation in background
    bus_thread = threading.Thread(target=simulate_bus_movement, daemon=True)
    bus_thread.start()
    
    # Run the application
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
