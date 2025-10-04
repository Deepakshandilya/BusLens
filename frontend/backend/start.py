#!/usr/bin/env python3
"""
BusLens Backend Startup Script
This script initializes the database and starts the Flask application
"""

import os
import sys
import subprocess
import time

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import flask
        import flask_cors
        import flask_socketio
        import mysql.connector
        print("✅ All dependencies are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Installing dependencies...")
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        return True

def check_database():
    """Check if MySQL is running and database is accessible"""
    try:
        import mysql.connector
        connection = mysql.connector.connect(
            host='127.0.0.1',
            user='root',
            password='root',
            database='buslensdb'
        )
        connection.close()
        print("✅ Database connection successful")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("Please ensure MySQL is running and the database 'buslensdb' exists")
        print("You can create it with: CREATE DATABASE buslensdb;")
        return False

def main():
    """Main startup function"""
    print("🚀 Starting BusLens Backend...")
    print("=" * 50)
    
    # Check dependencies
    if not check_dependencies():
        print("❌ Failed to install dependencies")
        return
    
    # Check database
    if not check_database():
        print("❌ Database check failed")
        return
    
    print("✅ All checks passed!")
    print("🌐 Starting Flask application...")
    print("📍 Backend will be available at: http://localhost:5000")
    print("🔌 WebSocket will be available at: ws://localhost:5000")
    print("=" * 50)
    
    # Start the Flask application
    os.system("python app.py")

if __name__ == "__main__":
    main()
