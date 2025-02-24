// backend/cloud.js

// *** Funções de Autenticação ***
require("./autenticacao");

// *** Funções para Pacientes ***
require("./pacientes/pacientes");

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