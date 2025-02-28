 // backend/cloud.js

// *** Middleware CORS ***
Parse.Cloud.before("*", (req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "https://4ed6e85c-4c40-459f-afc4-3e2e0a894ff9-00-2yy51gvcjuce5.spock.replit.dev",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Parse-Application-Id, X-Parse-REST-API-Key, X-Parse-Session-Token",
  });
  next();
});

// *** Funções de Autenticação ***
require("./autenticacao");

// *** Funções para Pacientes ***
require("./paciente/paciente");

// *** Funções para DadosPaciente ***
require("./dados_paciente/dados_paciente");

// *** Funções para Refeicao ***
require("./refeicao/refeicao");

// *** Funções para Opcao ***
require("./opcao/opcao");

// *** Configurações gerais do Cloud Code ***

// Exemplo: Definir um tamanho máximo para upload de imagens
Parse.Cloud.define("getMaxUploadSize", () => {
  return 10 * 1024 * 1024; // 10MB
});

// *** Função de Teste ***
Parse.Cloud.define("hello", async (request) => {
  return "Hello from Cloud Code!";
});