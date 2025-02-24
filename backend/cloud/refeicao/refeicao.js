// backend/cloud/refeicao/refeicao.js

// *** Funções CRUD para Refeicao ***

// Função para criar refeição
Parse.Cloud.define("criarRefeicao", async (request) => {
  const pacienteId = request.params.pacienteId;
  const titulo = request.params.titulo;
  const horario = request.params.horario;
  const carboidratos = request.params.carboidratos;
  const proteinas = request.params.proteinas;
  const gorduras = request.params.gorduras;

  const Refeicao = Parse.Object.extend("Refeicao");
  const refeicao = new Refeicao();

  // Relaciona com o paciente
  const Pacientes = Parse.Object.extend("Pacientes");
  const paciente = new Pacientes();
  paciente.id = pacienteId;
  refeicao.set("paciente", paciente);

  refeicao.set("titulo", titulo);
  refeicao.set("horario", horario);
  refeicao.set("carboidratos", carboidratos);
  refeicao.set("proteinas", proteinas);
  refeicao.set("gorduras", gorduras);

  try {
    const result = await refeicao.save(null, { useMasterKey: true });
    return result;
  } catch (error) {
    console.error("Erro ao criar refeição:", error);
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      "Erro ao criar refeição: " + error.message
    );
  }
});

// Função para buscar refeição pelo ID
Parse.Cloud.define("buscarRefeicao", async (request) => {
  const idRefeicao = request.params.id;
  const Refeicao = Parse.Object.extend("Refeicao");
  const query = new Parse.Query(Refeicao);

  try {
    const refeicao = await query.get(idRefeicao, { useMasterKey: true });
    return refeicao;
  } catch (error) {
    console.error("Erro ao buscar refeição:", error);
    throw new Parse.Error(
      Parse.Error.OBJECT_NOT_FOUND,
      "Refeição não encontrada: " + error.message
    );
  }
});

// Função para atualizar refeição
Parse.Cloud.define("atualizarRefeicao", async (request) => {
  const idRefeicao = request.params.id;
  const titulo = request.params.titulo;
  const horario = request.params.horario;
  const carboidratos = request.params.carboidratos;
  const proteinas = request.params.proteinas;
  const gorduras = request.params.gorduras;

  const Refeicao = Parse.Object.extend("Refeicao");
  const query = new Parse.Query(Refeicao);

  try {
    const refeicao = await query.get(idRefeicao, { useMasterKey: true });

    refeicao.set("titulo", titulo);
    refeicao.set("horario", horario);
    refeicao.set("carboidratos", carboidratos);
    refeicao.set("proteinas", proteinas);
    refeicao.set("gorduras", gorduras);

    const result = await refeicao.save(null, { useMasterKey: true });
    return result;
  } catch (error) {
    console.error("Erro ao atualizar refeição:", error);
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      "Erro ao atualizar refeição: " + error.message
    );
  }
});

// Função para deletar refeição
Parse.Cloud.define("deletarRefeicao", async (request) => {
  const idRefeicao = request.params.id;
  const Refeicao = Parse.Object.extend("Refeicao");
  const query = new Parse.Query(Refeicao);

  try {
    const refeicao = await query.get(idRefeicao, { useMasterKey: true });
    await refeicao.destroy({ useMasterKey: true });
    return "Refeição deletada com sucesso!";
  } catch (error) {
    console.error("Erro ao deletar refeição:", error);
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      "Erro ao deletar refeição: " + error.message
    );
  }
});