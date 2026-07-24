# Blog — Oracle Cloud Deployment

## Domena

https://kaminski.consulting (+ wildcard *.kaminski.consulting)

## Architektura

```
Internet → Cloudflare Tunnel → CV-Blog VM (micro) → Next.js standalone (port 7777)
                                    │
                                    └── OLLAMA_HOST=http://10.0.0.243:11434
                                              │
                                              └── A1.Flex VM (Ollama, qwen2.5:7b)
```

## VM: CV-Blog

| Parametr | Wartość |
|----------|---------|
| **Shape** | VM.Standard.E2.1.Micro (1 OCPU, 1GB RAM, x86_64) |
| **IP** | 141.144.250.46 |
| **OS** | Ubuntu 24.04 |
| **SSH** | `ssh -i ~/.ssh/oci_vm ubuntu@141.144.250.46` |
| **Region** | eu-frankfurt-1 |

## Serwisy

| Serwis | Port | Opis |
|--------|------|------|
| `blog.service` | 7777 | Next.js standalone |
| `cloudflared.service` | — | Cloudflare Tunnel |

## Pliki na VM

```
/home/ubuntu/blog/          # Next.js standalone build
  ├── server.js             # Entry point
  ├── .next/                # Build output
  ├── public/               # Static assets
  └── node_modules/         # Runtime deps (standalone)

/etc/cloudflared/
  ├── config.yml            # Tunnel config (kaminski.consulting → localhost:7777)
  └── *.json                # Tunnel credentials
```

## Deploy

### Wymagania

- SSH klucz: `~/.ssh/oci_vm`
- Node.js 20 (lokalnie)
- Git Bash (Windows) lub bash (Linux/Mac)

### Automatyczny deploy

```bash
# Z katalogu blog-vite/
bash deploy.sh
```

Skrypt `deploy.sh` wykonuje:
1. Build micro frontends (Angular, Vue)
2. Build Next.js (standalone)
3. Pakowanie do tar.gz
4. SCP na micro VM
5. Restart serwisu `blog`
6. Weryfikacja

### Weryfikacja

```bash
# Status serwisów
ssh -i ~/.ssh/oci_vm ubuntu@141.144.250.46 "systemctl is-active blog cloudflared"

# Test HTTP
ssh -i ~/.ssh/oci_vm ubuntu@141.144.250.46 "curl -s -o /dev/null -w '%{http_code}' http://localhost:7777"

# Test Ollama (z micro VM → A1.Flex przez prywatne IP)
ssh -i ~/.ssh/oci_vm ubuntu@141.144.250.46 "curl -s http://10.0.0.243:11434/api/tags"

# Test publiczny
curl https://kaminski.consulting
```

## Konfiguracja

### Zmienne środowiskowe (blog.service)

| Zmienna | Wartość | Opis |
|---------|---------|------|
| `NODE_ENV` | production | Tryb produkcyjny |
| `PORT` | 7777 | Port serwera |
| `HOSTNAME` | 0.0.0.0 | Nasłuchuje na wszystkich interfejsach |
| `OLLAMA_HOST` | http://10.0.0.243:11434 | Ollama na A1.Flex (prywatne IP) |
| `OLLAMA_MODEL` | qwen2.5:7b | Model Ollamy (opcjonalne; domyślnie `qwen2.5:7b` w kodzie) |

### Cloudflare Tunnel

Konfiguracja w `/etc/cloudflared/config.yml`:
- `kaminski.consulting` → `http://localhost:7777`
- `*.kaminski.consulting` → `http://localhost:7777`

### Swap

Micro VM ma 1GB swap (`/swapfile`) aby zapobiec OOM.

## Ollama (AI Chat)

Ollama działa na osobnej maszynie A1.Flex (130.61.127.59, 24GB RAM).
Blog łączy się przez prywatne IP w VCN (10.0.0.243:11434).
Model: `qwen2.5:7b` (~4.7GB) — asystent CV, skupiony wyłącznie na temacie
Przemysława Kamińskiego (system prompt po stronie serwera w `route.ts`).

Odpowiedzi są **strumieniowane** (`/api/chat` zwraca strumień tekstu, front
renderuje tokeny na żywo). Jest to konieczne, bo tunel Cloudflare zrywa
połączenie (błąd 524), gdy origin milczy >100s. Backend na starcie strumienia
flushuje jeden bajt (spację, obcinaną na froncie) — Cloudflare od razu dostaje
odpowiedź 200 i nie zrywa połączenia, nawet gdy generacja 7B na CPU ARM trwa
kilkadziesiąt sekund (ok. 15–90s zależnie od długości odpowiedzi; ~4,7 tok/s).

Model utrzymywany jest ciepły przez:
- `keep_alive: '30m'` w zapytaniach do Ollamy,
- systemd timer **`blog-warm.timer`** (co 10 min woła `/api/chat` z „ping"
  przez `localhost` — utrzymuje model w RAM i cache prefiksu promptu, dzięki
  czemu realni odwiedzający trafiają w szybką ścieżkę zamiast zimnego startu
  ~170s). Jednostki: `/usr/local/bin/blog-warm.sh`, `blog-warm.service`,
  `blog-warm.timer`.

Zmiana modelu wymaga pobrania go na maszynie A1.Flex:

```bash
# Na A1.Flex VM (przez SSH):
ollama pull qwen2.5:7b
ollama list          # weryfikacja
# opcjonalnie inny model bez zmiany kodu: ustaw OLLAMA_MODEL w blog.service
```

Model utrzymywany jest „ciepły" w RAM przez 30 min (`keep_alive`), więc kolejne
pytania po krótkiej przerwie odpowiadają szybciej.

## Troubleshooting

```bash
# Logi bloga
ssh -i ~/.ssh/oci_vm ubuntu@141.144.250.46 "journalctl -u blog -f"

# Logi cloudflared
ssh -i ~/.ssh/oci_vm ubuntu@141.144.250.46 "journalctl -u cloudflared -f"

# Restart
ssh -i ~/.ssh/oci_vm ubuntu@141.144.250.46 "sudo systemctl restart blog"

# Port zajęty
ssh -i ~/.ssh/oci_vm ubuntu@141.144.250.46 "sudo fuser -k 7777/tcp && sudo systemctl start blog"

# Pamięć
ssh -i ~/.ssh/oci_vm ubuntu@141.144.250.46 "free -h"
```

## Bezpieczeństwo

Nie commitować do repozytorium:
- Klucze SSH (`~/.ssh/oci_vm`)
- Cloudflare credentials (`~/.cloudflared/*.json`, `cert.pem`)
- Wszelkie tokeny i hasła
