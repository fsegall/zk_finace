#!/bin/bash

echo "🧪 Testando Análise de Crédito Local (Express)"
echo "=============================================="

# URL do endpoint local
LOCAL_URL="http://localhost:3001/api/credit-analysis"

# Dados de teste
TEST_DATA='{
  "income": 8000,
  "employment_years": 5,
  "has_property": true,
  "has_debt": false,
  "payment_defaults": 0
}'

echo "📤 Enviando dados para análise local..."
echo "Dados: $TEST_DATA"
echo ""

# Fazer a requisição
RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "X-Request-ID: test-local-$(date +%s)" \
  -d "$TEST_DATA" \
  "$LOCAL_URL")

echo "📥 Resposta recebida:"
echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
echo ""

echo "✅ Teste concluído!"
echo ""
echo "🔗 Endpoints disponíveis:"
echo "- POST http://localhost:3001/api/credit-analysis"
echo "- GET http://localhost:3001/api/credit-analysis/health"
echo "- GET http://localhost:3001/api/credit-analysis/algorithm"
echo "- GET http://localhost:3001/health"
echo ""
echo "💡 Verifique o console do servidor para logs detalhados." 