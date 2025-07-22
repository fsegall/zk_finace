#!/bin/bash

echo "🧪 Testando webhook com curl..."

# Dados de teste
TEST_DATA='{
  "income": 6000,
  "employment_years": 3,
  "has_property": true,
  "has_debt": false,
  "payment_defaults": 0
}'

echo "📤 Dados enviados:"
echo "$TEST_DATA"
echo ""

# Teste 1: Path original
echo "🔍 Teste 1: /webhook-test/credit-analysis"
curl -X POST \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA" \
  "https://fsegall-personal.app.n8n.cloud/webhook-test/credit-analysis" \
  -w "\nStatus: %{http_code}\nTempo: %{time_total}s\n" \
  -s

echo ""
echo "----------------------------------------"
echo ""

# Teste 2: Path simples
echo "🔍 Teste 2: /credit-analysis"
curl -X POST \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA" \
  "https://fsegall-personal.app.n8n.cloud/credit-analysis" \
  -w "\nStatus: %{http_code}\nTempo: %{time_total}s\n" \
  -s

echo ""
echo "----------------------------------------"
echo ""

# Teste 3: Path webhook
echo "🔍 Teste 3: /webhook/credit-analysis"
curl -X POST \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA" \
  "https://fsegall-personal.app.n8n.cloud/webhook/credit-analysis" \
  -w "\nStatus: %{http_code}\nTempo: %{time_total}s\n" \
  -s

echo ""
echo "----------------------------------------"
echo ""

# Teste 4: GET request (para ver se o servidor responde)
echo "🔍 Teste 4: GET request (teste de conectividade)"
curl -X GET \
  "https://fsegall-personal.app.n8n.cloud/" \
  -w "\nStatus: %{http_code}\nTempo: %{time_total}s\n" \
  -s

echo ""
echo "✅ Testes concluídos!" 