#!/bin/bash
# Frontend Setup Script
# Run this to install everything you need

echo "🚀 Starting frontend setup..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js: $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm: $(npm -v)"

# Install npm packages
echo "📦 Installing npm packages..."
npm install

# Check Python
if command -v python3 &> /dev/null; then
    echo "✅ Python: $(python3 --version)"
    
    # Install Python dependencies if pip is available
    if command -v pip3 &> /dev/null; then
        echo "📦 Installing Python packages..."
        pip3 install -r requirements-python.txt 2>/dev/null || echo "⚠️  Python install skipped (optional)"
    fi
elif command -v python &> /dev/null; then
    echo "✅ Python: $(python --version)"
    
    if command -v pip &> /dev/null; then
        echo "📦 Installing Python packages..."
        pip install -r requirements-python.txt 2>/dev/null || echo "⚠️  Python install skipped (optional)"
    fi
else
    echo "⚠️  Python not found (optional for frontend dev)"
fi

# Setup shadcn components (if using)
echo "🎨 Setting up shadcn/ui..."
npx shadcn-ui@latest init -d 2>/dev/null || echo "⚠️  shadcn setup skipped (run manually later)"

echo ""
echo "✅ Setup complete!"
echo "👉 Run 'npm run dev' to start the dev server"