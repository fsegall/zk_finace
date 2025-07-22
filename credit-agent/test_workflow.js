// Script de teste para o workflow simplificado
const testWorkflow = async () => {
  const webhookUrl = 'https://fsegall-personal.app.n8n.cloud/webhook-test/credit-analysis';
  
  const testData = {
    income: 6000,
    employment_years: 3,
    has_property: true,
    has_debt: false,
    payment_defaults: 0
  };

  console.log('🧪 Testando workflow simplificado...');
  console.log('📤 Dados enviados:', JSON.stringify(testData, null, 2));

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    console.log('✅ Resposta recebida:');
    console.log(JSON.stringify(result, null, 2));
    
    // Verificar se a resposta tem a estrutura esperada
    if (result.score && result.threshold && typeof result.passed === 'boolean') {
      console.log('🎉 Workflow funcionando corretamente!');
      console.log(`📊 Score: ${result.score}/${result.threshold} - ${result.passed ? 'APROVADO' : 'REPROVADO'}`);
    } else {
      console.log('⚠️ Resposta não tem a estrutura esperada');
    }

  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
    console.log('🔧 Verifique se:');
    console.log('   1. O workflow está ativo no N8N');
    console.log('   2. A URL do webhook está correta');
    console.log('   3. O N8N está rodando');
  }
};

// Executar o teste
testWorkflow(); 