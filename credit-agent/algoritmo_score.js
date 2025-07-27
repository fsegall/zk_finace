// Receives user data from the previous node
let userData = $input.item.json[0];

// Security check: if userData is undefined, create an empty object
if (!userData) {
  userData = {};
  console.log('Aviso: Dados do usuário não encontrados. Usando valores padrão.');
}

// Implementation of score calculation algorithm with security checks
function calculateCreditScore(userData) {
  let score = 500; // Score base
  
  // Factors that can increase the score (with security checks)
  if (userData.income && userData.income > 5000) score += 100;
  if (userData.employment_years && userData.employment_years > 2) score += 50;
  if (userData.has_property === true) score += 70;
  
  // Factors that can decrease the score (with security checks)
  if (userData.has_debt === true) score -= 80;
  if (userData.payment_defaults && userData.payment_defaults > 0) score -= 100;
  
  // Garantir que o score esteja dentro dos limites (300-850)
  return Math.max(300, Math.min(850, score));
}

  // Define the threshold (minimum limit for approval)
const threshold = 650;

// Calcular o score
const score = calculateCreditScore(userData);

// Verificar se passou no threshold
const passed = score >= threshold;

  // Log information for debug
console.log('Dados do usuário:', JSON.stringify(userData));
console.log('Score calculado:', score);
console.log('Threshold:', threshold);
console.log('Passou:', passed);

// Retornar o resultado
return {
  score: score,
  threshold: threshold,
  passed: passed
};
