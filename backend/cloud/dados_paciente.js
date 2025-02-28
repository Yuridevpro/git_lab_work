 // backend/cloud/dados_paciente.js

// *** Funções CRUD para DadosPaciente ***

// Função para criar dados do paciente
Parse.Cloud.define("criarDadosPaciente", async (request) => {
  const pacienteId = request.params.pacienteId;
  const data = request.params.data;
  const peso = request.params.peso;
  const altura = request.params.altura;
  const gordura = request.params.gordura;
  const musculo = request.params.musculo;
  const hdl = request.params.hdl;
  const ldl = request.params.ldl;
  const ctotal = request.params.ctotal;
  const trigliceridios = request.params.trigliceridios;

  const DadosPaciente = Parse.Object.extend("DadosPaciente");
  const dadosPaciente = new DadosPaciente();

  // Relaciona com o paciente
  const Pacientes = Parse.Object.extend("Pacientes");
  const paciente = new Pacientes();
  paciente.id = pacienteId;
  dadosPaciente.set("paciente", paciente);

  dadosPaciente.set("data", new Date(data)); // Converte para data
  dadosPaciente.set("peso", peso);
  dadosPaciente.set("altura", altura);
  dadosPaciente.set("percentual_gordura", gordura);
  dadosPaciente.set("percentual_musculo", musculo);
  dadosPaciente.set("colesterol_hdl", hdl);
  dadosPaciente.set("colesterol_ldl", ldl);
  dadosPaciente.set("colesterol_total", ctotal);
  dadosPaciente.set("trigliceridios", trigliceridios);

  try {
    const result = await dadosPaciente.save(null, { useMasterKey: true });
    return result;
  } catch (error) {
    console.error("Erro ao criar dados do paciente:", error);
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      "Erro ao criar dados do paciente: " + error.message
    );
  }
});

// Função para buscar dados do paciente pelo ID
Parse.Cloud.define("buscarDadosPaciente", async (request) => {
  const idDadosPaciente = request.params.id;
  const DadosPaciente = Parse.Object.extend("DadosPaciente");
  const query = new Parse.Query(DadosPaciente);

  try {
    const dadosPaciente = await query.get(idDadosPaciente, {
      useMasterKey: true,
    });
    return dadosPaciente;
  } catch (error) {
    console.error("Erro ao buscar dados do paciente:", error);
    throw new Parse.Error(
      Parse.Error.OBJECT_NOT_FOUND,
      "Dados do paciente não encontrados: " + error.message
    );
  }
});

// Função para atualizar dados do paciente
Parse.Cloud.define("atualizarDadosPaciente", async (request) => {
  const idDadosPaciente = request.params.id;
  const data = request.params.data;
  const peso = request.params.peso;
  const altura = request.params.altura;
  const gordura = request.params.gordura;
  const musculo = request.params.musculo;
  const hdl = request.params.hdl;
  const ldl = request.params.ldl;
  const ctotal = request.params.ctotal;
  const trigliceridios = request.params.trigliceridios;

  const DadosPaciente = Parse.Object.extend("DadosPaciente");
  const query = new Parse.Query(DadosPaciente);

  try {
    const dadosPaciente = await query.get(idDadosPaciente, {
      useMasterKey: true,
    });

    dadosPaciente.set("data", new Date(data));
    dadosPaciente.set("peso", peso);
    dadosPaciente.set("altura", altura);
    dadosPaciente.set("percentual_gordura", gordura);
    dadosPaciente.set("percentual_musculo", musculo);
    dadosPaciente.set("colesterol_hdl", hdl);
    dadosPaciente.set("colesterol_ldl", ldl);
    dadosPaciente.set("colesterol_total", ctotal);
    dadosPaciente.set("trigliceridios", trigliceridios);

    const result = await dadosPaciente.save(null, { useMasterKey: true });
    return result;
  } catch (error) {
    console.error("Erro ao atualizar dados do paciente:", error);
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      "Erro ao atualizar dados do paciente: " + error.message
    );
  }
});

// Função para deletar dados do paciente
Parse.Cloud.define("deletarDadosPaciente", async (request) => {
  const idDadosPaciente = request.params.id;
  const DadosPaciente = Parse.Object.extend("DadosPaciente");
  const query = new Parse.Query(DadosPaciente);

  try {
    const dadosPaciente = await query.get(idDadosPaciente, {
      useMasterKey: true,
    });
    await dadosPaciente.destroy({ useMasterKey: true });
    return "Dados do paciente deletados com sucesso!";
  } catch (error) {
    console.error("Erro ao deletar dados do paciente:", error);
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      "Erro ao deletar dados do paciente: " + error.message
    );
  }
});