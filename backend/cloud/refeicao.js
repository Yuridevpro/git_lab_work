 // backend/cloud/refeicao.js

// *** Funções CRUD para Refeicao ***

// Função para criar refeição
Parse.Cloud.define("criarRefeicao", async (request) => {
  console.log("Criar Refeicao - Usuário que chamou:", request.user);

  const pacienteId = request.params.pacienteId;
  const titulo = request.params.titulo;
  const descricao = request.params.descricao;  // Nova descrição
  const horario = request.params.horario;
  const carboidratos = request.params.carboidratos;
  const proteinas = request.params.proteinas;
  const gorduras = request.params.gorduras;

  // Cria objeto Refeicao
  const Refeicao = Parse.Object.extend("Refeicao");
  const refeicao = new Refeicao();

  // Relaciona com o paciente
  const Pacientes = Parse.Object.extend("Pacientes");
  const paciente = new Pacientes();
  paciente.id = pacienteId;
  refeicao.set("paciente", paciente);

  // Verifica se o paciente pertence ao nutricionista logado
  const query = new Parse.Query(Pacientes);
  query.equalTo("nutri", request.user);
  try {
    const pacienteValidado = await query.get(pacienteId, { useMasterKey: true });
    console.log("Paciente validado:", pacienteValidado.id);
  } catch (error) {
    console.error("Erro ao validar paciente:", error);
    return { success: false, message: "Paciente não encontrado ou não autorizado." };
  }

  // Define os demais campos
  refeicao.set("titulo", titulo);
  refeicao.set("descricao", descricao); // Nova descrição
  refeicao.set("horario", horario);
  refeicao.set("carboidratos", carboidratos);
  refeicao.set("proteinas", proteinas);
  refeicao.set("gorduras", gorduras);

  try {
    const result = await refeicao.save(null, { useMasterKey: true });
    console.log("Refeição criada com sucesso, ID:", result.id);
    return { success: true, message: "Refeição criada com sucesso!", refeicao: result };
  } catch (error) {
    console.error("Erro ao criar refeição:", error);
    return { success: false, message: "Erro ao criar refeição: " + error.message };
  }
});

// Função para buscar refeição pelo ID
Parse.Cloud.define("buscarRefeicao", async (request) => {
  const idRefeicao = request.params.id;
  const Refeicao = Parse.Object.extend("Refeicao");
  const query = new Parse.Query(Refeicao);
  query.include("paciente"); // Inclui os dados do paciente relacionado

  try {
    const refeicao = await query.get(idRefeicao, { useMasterKey: true });
    // Verifica se o paciente associado à refeição pertence ao nutricionista logado
    if (refeicao.get("paciente").get("nutri").id !== request.user.id) {
      throw new Error("Não autorizado");
    }
    return {
      success: true,
      refeicao: {
        id: refeicao.id,
        titulo: refeicao.get("titulo"),
        descricao: refeicao.get("descricao"),//nova descricao
        horario: refeicao.get("horario"),
        carboidratos: refeicao.get("carboidratos"),
        proteinas: refeicao.get("proteinas"),
        gorduras: refeicao.get("gorduras"),
      }
    };
  } catch (error) {
    console.error("Erro ao buscar refeição:", error);
    return { success: false, message: "Refeição não encontrada ou não autorizado: " + error.message };
  }
});

// Função para atualizar refeição
Parse.Cloud.define("atualizarRefeicao", async (request) => {
  const idRefeicao = request.params.id;
  const titulo = request.params.titulo;
  const descricao = request.params.descricao; // Nova Descrição
  const horario = request.params.horario;
  const carboidratos = request.params.carboidratos;
  const proteinas = request.params.proteinas;
  const gorduras = request.params.gorduras;

  const Refeicao = Parse.Object.extend("Refeicao");
  const query = new Parse.Query(Refeicao);
  query.include("paciente"); // Inclui os dados do paciente relacionado

  try {
    const refeicao = await query.get(idRefeicao, { useMasterKey: true });
    // Verifica se o paciente associado à refeição pertence ao nutricionista logado
    if (refeicao.get("paciente").get("nutri").id !== request.user.id) {
      throw new Error("Não autorizado");
    }

    refeicao.set("titulo", titulo);
    refeicao.set("descricao", descricao); // Nova Descrição
    refeicao.set("horario", horario);
    refeicao.set("carboidratos", carboidratos);
    refeicao.set("proteinas", proteinas);
    refeicao.set("gorduras", gorduras);

    const result = await refeicao.save(null, { useMasterKey: true });
    console.log("Refeição atualizada com sucesso, ID:", result.id);
    return { success: true, message: "Refeição atualizada com sucesso!", refeicao: result };
  } catch (error) {
    console.error("Erro ao atualizar refeição:", error);
    return { success: false, message: "Erro ao atualizar refeição ou não autorizado: " + error.message };
  }
});

// Função para deletar refeição
Parse.Cloud.define("deletarRefeicao", async (request) => {
  const idRefeicao = request.params.id;
  const Refeicao = Parse.Object.extend("Refeicao");
  const query = new Parse.Query(Refeicao);
  query.include("paciente"); // Inclui os dados do paciente relacionado

  try {
    const refeicao = await query.get(idRefeicao, { useMasterKey: true });
    // Verifica se o paciente associado à refeição pertence ao nutricionista logado
    if (refeicao.get("paciente").get("nutri").id !== request.user.id) {
      throw new Error("Não autorizado");
    }
    await refeicao.destroy({ useMasterKey: true });
    console.log("Refeição deletada com sucesso, ID:", idRefeicao);
    return { success: true, message: "Refeição deletada com sucesso!" };
  } catch (error) {
    console.error("Erro ao deletar refeição:", error);
    return { success: false, message: "Erro ao deletar refeição ou não autorizado: " + error.message };
  }
});