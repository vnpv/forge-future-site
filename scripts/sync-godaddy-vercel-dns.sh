#!/usr/bin/env bash
# Point forge-future.com DNS at Vercel (GoDaddy API or nameservers).
set -euo pipefail

DOMAIN="${DOMAIN:-forge-future.com}"
ENV_FILE="${GODADDY_ENV:-$HOME/.config/godaddy/env}"

if [[ -f "$ENV_FILE" ]]; then
  # shellcheck source=/dev/null
  source "$ENV_FILE"
fi

: "${GODADDY_API_KEY:?Set GODADDY_API_KEY}"
: "${GODADDY_API_SECRET:?Set GODADDY_API_SECRET}"
BASE="${GODADDY_API_BASE:-https://api.godaddy.com}"
AUTH="sso-key ${GODADDY_API_KEY}:${GODADDY_API_SECRET}"

api() {
  curl -sS -H "Authorization: ${AUTH}" -H "Content-Type: application/json" "$@"
}

echo "→ Checking GoDaddy API (${BASE})..."
DOMAINS=$(api "${BASE}/v1/domains" || true)
if echo "$DOMAINS" | grep -q UNABLE_TO_AUTHENTICATE; then
  echo "ERROR: GoDaddy API auth failed."
  echo "  Production keys need 10+ domains on the account (or Domain Investor plan)."
  echo "  OTE/test keys only work on api.ote-godaddy.com — not for real domains."
  exit 1
fi

if ! echo "$DOMAINS" | grep -q "\"${DOMAIN}\""; then
  echo "ERROR: Domain ${DOMAIN} not found in this GoDaddy account."
  exit 1
fi

MODE="${1:-records}"

if [[ "$MODE" == "nameservers" ]]; then
  echo "→ Setting Vercel nameservers on ${DOMAIN}..."
  api -X PATCH "${BASE}/v1/domains/${DOMAIN}" \
    -d '{"nameServers":["ns1.vercel-dns.com","ns2.vercel-dns.com"]}'
  echo "OK. Propagation: 5–60 min."
  exit 0
fi

echo "→ Setting A records (@ and www) for Vercel..."
# Vercel recommended (rank 2); rank 1 anycast also works
IPS='["76.76.21.21"]'

put_a() {
  local name="$1"
  local encoded
  encoded=$(python3 -c "import urllib.parse; print(urllib.parse.quote('${name}', safe=''))")
  api -X PUT "${BASE}/v1/domains/${DOMAIN}/records/A/${encoded}" -d "${IPS}" \
    | python3 -c "import sys,json; d=json.load(sys.stdin); print(d)" 2>/dev/null || true
}

put_a "@"
put_a "www"

# Remove conflicting CNAME on www if present
api -X DELETE "${BASE}/v1/domains/${DOMAIN}/records/CNAME/www" 2>/dev/null || true

echo "OK. Waiting for DNS..."
for _ in 1 2 3 4 5 6; do
  sleep 10
  A=$(dig +short "@8.8.8.8" "${DOMAIN}" A | tr '\n' ' ')
  if [[ "$A" == *"76.76.21.21"* ]] || [[ "$A" == *"216.198.79"* ]] || [[ "$A" == *"64.29.17"* ]]; then
    echo "DNS live: ${A}"
    exit 0
  fi
  echo "  still: ${A:-pending...}"
done

echo "Records submitted. Full propagation may take up to 1 hour."
