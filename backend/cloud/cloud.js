 // cloud/cloud.js


// *** Importando funções do Cloud Code ***
require("./autenticacao");
require("./pacientes");
require("./dados_paciente");
require("./refeicao");
require("./perfil");

// *** Configurações gerais do Cloud Code ***
Parse.Cloud.define("getMaxUploadSize", () => {
  return 10 * 1024 * 1024; // 10MB
});

// *** Função de Teste ***
Parse.Cloud.define("hello", async () => {
  return "Hello from Cloud Code!";
});
