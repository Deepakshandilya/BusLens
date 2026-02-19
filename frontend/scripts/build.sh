#!/bin/bash

# Build script for BusLens Frontend
echo "🚀 Building BusLens Frontend..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

# Run linting
echo "🧹 Running linting..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Output: ./out"
echo "🌐 To preview: npm run start"
