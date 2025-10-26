#!/bin/bash
# ==============================================
# GitHub Webhook Auto-Deploy Script (Spring Boot)
# ==============================================

set -e  # Stop if any command fails

# Config
TARGET_DIRECTORY="/home/ubuntu/ibmgduitama/back"
PROJECT_DIR="$TARGET_DIRECTORY/ibmgbackend"
SYSTEMD_SERVICE="myapp.service"
REPO_URL="git@github.com:ProdDestroyer/ibmgbackend.git"

echo "🚀 Starting backend deployment..."

# 1️⃣ Stop currently running service
echo "🛑 Stopping $SYSTEMD_SERVICE..."
sudo systemctl stop "$SYSTEMD_SERVICE" || true

# 2️⃣ Remove old source
echo "🧹 Removing old source..."
sudo rm -rf "$PROJECT_DIR"

# 3️⃣ Clone latest code
echo "📦 Cloning repository..."
cd "$TARGET_DIRECTORY"
git clone "$REPO_URL"

# 4️⃣ Build JAR
echo "🔧 Building project..."
cd "$PROJECT_DIR"
mvn clean package -Dspring.profiles.active=production -DskipTests

# 5️⃣ Verify JAR exists
JAR_FILE=$(find target -type f -name "*.jar" | head -n 1)
if [ -z "$JAR_FILE" ]; then
  echo "❌ ERROR: Build failed — no JAR found in target/"
  exit 1
fi

echo "✅ Build successful: $JAR_FILE"

# 6️⃣ Restart service
echo "🔁 Restarting $SYSTEMD_SERVICE..."
sudo systemctl daemon-reload
sudo systemctl start "$SYSTEMD_SERVICE"

# 7️⃣ Show status
sudo systemctl status "$SYSTEMD_SERVICE" --no-pager -l

echo "🎉 Deployment complete!"
