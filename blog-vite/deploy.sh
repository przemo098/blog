#!/bin/bash
set -euo pipefail

SSH_KEY="$HOME/.ssh/oci_vm"
MICRO_VM="ubuntu@141.144.250.46"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "=== 1/5 Building Angular MFE ==="
cd src/features/MicroFePage/apps/angular-todo
npm install
npm run build
mkdir -p ../../../../../public/micro-fe/angular
cp -r dist/* ../../../../../public/micro-fe/angular/
cd "$SCRIPT_DIR"

echo "=== 2/5 Building Vue MFE ==="
cd src/features/MicroFePage/apps/vue-todo
npm install
npm run build
mkdir -p ../../../../../public/micro-fe/vue
cp -r dist/* ../../../../../public/micro-fe/vue/
cd "$SCRIPT_DIR"

# echo "=== Building Blazor MFE ==="
# cd src/features/MicroFePage/apps/blazor-todo
# dotnet publish -c Release -o bin/publish
# mkdir -p ../../../../../public/micro-fe/blazor
# cp -r bin/publish/wwwroot/* ../../../../../public/micro-fe/blazor/
# cd "$SCRIPT_DIR"

echo "=== 3/5 Building Next.js ==="
npm run build

echo "=== 4/5 Packaging standalone build ==="
tar czf /tmp/blog-standalone.tar.gz \
  -C .next/standalone . \
  -C "$SCRIPT_DIR" .next/static public

echo "=== 5/5 Deploying to Oracle VM ==="
scp -i "$SSH_KEY" /tmp/blog-standalone.tar.gz "$MICRO_VM":~/

ssh -i "$SSH_KEY" "$MICRO_VM" "
  sudo systemctl stop blog
  rm -rf ~/blog && mkdir ~/blog && cd ~/blog
  tar xzf ~/blog-standalone.tar.gz && rm ~/blog-standalone.tar.gz
  sudo systemctl start blog
"

rm -f /tmp/blog-standalone.tar.gz

echo "=== Deploy complete ==="
ssh -i "$SSH_KEY" "$MICRO_VM" "systemctl is-active blog"
curl -s -o /dev/null -w "HTTPS status: %{http_code}\n" https://kaminski.consulting
