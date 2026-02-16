#!/bin/bash

# LA Parking App - Quick GitHub Setup Script
# This script helps you quickly push your code to GitHub

echo "🚗 LA Parking App - GitHub Setup"
echo "================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install it first:"
    echo "   Mac: brew install git (or download from https://git-scm.com)"
    echo "   Windows: Download from https://git-scm.com"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Get GitHub username
echo "📝 Setup Questions:"
read -p "Enter your GitHub username: " github_username
read -p "Enter repository name [la-parking-app]: " repo_name
repo_name=${repo_name:-la-parking-app}

echo ""
echo "🔧 Initializing repository..."

# Initialize git if not already initialized
if [ ! -d .git ]; then
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Add all files
git add .
echo "✅ Files staged"

# Commit
git commit -m "Initial commit - LA Parking Finder app"
echo "✅ Initial commit created"

# Set remote
git remote add origin "https://github.com/${github_username}/${repo_name}.git" 2>/dev/null || git remote set-url origin "https://github.com/${github_username}/${repo_name}.git"
echo "✅ Remote repository set"

echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   👉 https://github.com/new"
echo "   - Repository name: ${repo_name}"
echo "   - Keep it Public (or Private)"
echo "   - Don't add README, .gitignore, or license (we already have them)"
echo "   - Click 'Create repository'"
echo ""
echo "2. After creating the repo on GitHub, run:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Then follow DEPLOYMENT.md to deploy to Replit!"
echo ""
echo "✨ Repository ready to push!"
