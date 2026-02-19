#!/bin/bash

# Development script for BusLens Frontend
echo "🚀 Starting BusLens Frontend Development Server..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start development server
echo "🌐 Starting development server on http://localhost:3000"
npm run dev
