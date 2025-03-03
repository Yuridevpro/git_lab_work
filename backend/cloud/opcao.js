// backend/cloud/opcao.js

// *** Funções CRUD para Opcao ***

// Função para criar opção
Parse.Cloud.define("criarOpcao", async (request) => {
  console.log("criarOpcao chamado com:", request.params); // Loga todos os parâmetros

  const refeicaoId = request.params.refeicaoId;
  const imagemBase64 = request.params.imagem;
  const descricao = request.params.descricao;
  const pacienteId = request.params.pacienteId;
  const tamanhoPorcao = request.params.tamanhoPorcao;
  const informacoesNutricionais = request.params.informacoesNutricionais;

  const Opcao = Parse.Object.extend("Opcao");
  const opcao = new Opcao();

  // Relaciona com a refeição
  const Refeicao = Parse.Object.extend("Refeicao");
  const refeicao = new Refeicao();
  refeicao.id = refeicaoId;
  opcao.set("refeicao", refeicao);

  // Verifica se a refeição pertence ao nutricionista logado
  const queryRefeicao = new Parse.Query(Refeicao);
  queryRefeicao.include("paciente"); // Inclui os dados do paciente relacionado
  try {
      const refeicaoValidada = await queryRefeicao.get(refeicaoId, { useMasterKey: true });
      // Garante que o paciente pertence ao nutricionista logado
      if (refeicaoValidada.get("paciente").id !== pacienteId || refeicaoValidada.get("paciente").get("nutri").id !== request.user.id) {
          throw new Error("Não autorizado");
      }
  } catch (error) {
      console.error("Erro ao validar refeição:", error);
      return { success: false, message: "Refeição não encontrada ou não autorizada." };
  }

  opcao.set("descricao", descricao);
  opcao.set("tamanhoPorcao", tamanhoPorcao);
  opcao.set("informacoesNutricionais", informacoesNutricionais);

  // Salvar imagem (requer um tratamento especial)
  if (imagemBase64) {
      const parseFile = new Parse.File("imagem.png", { base64: imagemBase64 });
      opcao.set("imagem", parseFile);
  }

  try {
      const result = await opcao.save(null, { useMasterKey: true });
      console.log("Opção criada com sucesso:", result);
      return { success: true, message: "Opção criada com sucesso!", opcao: result };
  } catch (error) {
      console.error("Erro ao criar opção:", error);
      return {
          success: false,
          message: "Erro ao criar opção: " + error.message,
      };
  }
});

// Função para buscar opção pelo ID
Parse.Cloud.define("buscarOpcao", async (request) => {
  const idOpcao = request.params.id;
  const Opcao = Parse.Object.extend("Opcao");
  const query = new Parse.Query(Opcao);
  query.include("refeicao"); // Inclui os dados da refeição relacionada
  query.include("refeicao.paciente"); // Inclui os dados do paciente relacionado

  try {
      const opcao = await query.get(idOpcao, { useMasterKey: true });
      // Garante que o paciente pertence ao nutricionista logado
      if (opcao.get("refeicao").get("paciente").get("nutri").id !== request.user.id) {
          throw new Error("Não autorizado");
      }

      return {
          success: true,
          opcao: {
              id: opcao.id,
              descricao: opcao.get("descricao"),
              tamanhoPorcao: opcao.get("tamanhoPorcao"),
              informacoesNutricionais: opcao.get("informacoesNutricionais"),
              imagem: opcao.get("imagem"),
          }
      };
  } catch (error) {
      console.error("Erro ao buscar opção:", error);
      return { success: false, message: "Opção não encontrada ou não autorizado: " + error.message };
  }
});

// Função para atualizar opção
Parse.Cloud.define("atualizarOpcao", async (request) => {
  console.log("atualizarOpcao chamado com:", request.params);

  const idOpcao = request.params.id;
  const imagemBase64 = request.params.imagem;
  const descricao = request.params.descricao;
  const tamanhoPorcao = request.params.tamanhoPorcao;
  const informacoesNutricionais = request.params.informacoesNutricionais;

  const Opcao = Parse.Object.extend("Opcao");
  const query = new Parse.Query(Opcao);
  query.include("refeicao"); // Inclui os dados da refeição relacionada
  query.include("refeicao.paciente"); // Inclui os dados do paciente relacionado

  try {
      const opcao = await query.get(idOpcao, { useMasterKey: true });
      // Garante que o paciente pertence ao nutricionista logado
      if (opcao.get("refeicao").get("paciente").get("nutri").id !== request.user.id) {
          throw new Error("Não autorizado");
      }

      opcao.set("descricao", descricao);
      opcao.set("tamanhoPorcao", tamanhoPorcao);
      opcao.set("informacoesNutricionais", informacoesNutricionais);

      // Atualizar imagem (requer um tratamento especial)
      if (imagemBase64) {
          const parseFile = new Parse.File("imagem.png", { base64: imagemBase64 });
          opcao.set("imagem", parseFile);
      }

      const result = await opcao.save(null, { useMasterKey: true });
      console.log("Opção atualizada com sucesso:", result);
      return { success: true, message: "Opção atualizada com sucesso!", opcao: result };
  } catch (error) {
      console.error("Erro ao atualizar opção:", error);
      return {
          success: false,
          message: "Erro ao atualizar opção ou não autorizado: " + error.message,
      };
  }
});

// Função para deletar opção
Parse.Cloud.define("deletarOpcao", async (request) => {
  const idOpcao = request.params.id;
  const Opcao = Parse.Object.extend("Opcao");
  const query = new Parse.Query(Opcao);
  query.include("refeicao"); // Inclui os dados da refeição relacionada
  query.include("refeicao.paciente"); // Inclui os dados do paciente relacionado

  try {
      const opcao = await query.get(idOpcao, { useMasterKey: true });
      // Garante que o paciente pertence ao nutricionista logado
      if (opcao.get("refeicao").get("paciente").get("nutri").id !== request.user.id) {
          throw new Error("Não autorizado");
      }
      await opcao.destroy({ useMasterKey: true });
      console.log("Opção deletada com sucesso:", idOpcao);
      return { success: true, message: "Opção deletada com sucesso!" };
  } catch (error) {
      console.error("Erro ao deletar opção:", error);
      return {
          success: false,
          message: "Erro ao deletar opção ou não autorizado: " + error.message,
      };
  }
});