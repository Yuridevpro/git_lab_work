// backend/cloud/opcao/opcao.js

// *** Funções CRUD para Opcao ***

// Função para criar opção
Parse.Cloud.define("criarOpcao", async (request) => {
  const refeicaoId = request.params.refeicaoId;
  const imagem = request.params.imagem;
  const descricao = request.params.descricao;

  const Opcao = Parse.Object.extend("Opcao");
  const opcao = new Opcao();

  // Relaciona com a refeição
  const Refeicao = Parse.Object.extend("Refeicao");
  const refeicao = new Refeicao();
  refeicao.id = refeicaoId;
  opcao.set("refeicao", refeicao);

  opcao.set("descricao", descricao);

  // Salvar imagem (requer um tratamento especial)
  if (imagem) {
    const parseFile = new Parse.File("imagem.png", { base64: imagem });
    opcao.set("imagem", parseFile);
  }

  try {
    const result = await opcao.save(null, { useMasterKey: true });
    return result;
  } catch (error) {
    console.error("Erro ao criar opção:", error);
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      "Erro ao criar opção: " + error.message
    );
  }
});

// Função para buscar opção pelo ID
Parse.Cloud.define("buscarOpcao", async (request) => {
  const idOpcao = request.params.id;
  const Opcao = Parse.Object.extend("Opcao");
  const query = new Parse.Query(Opcao);

  try {
    const opcao = await query.get(idOpcao, { useMasterKey: true });
    return opcao;
  } catch (error) {
    console.error("Erro ao buscar opção:", error);
    throw new Parse.Error(
      Parse.Error.OBJECT_NOT_FOUND,
      "Opção não encontrada: " + error.message
    );
  }
});

// Função para atualizar opção
Parse.Cloud.define("atualizarOpcao", async (request) => {
  const idOpcao = request.params.id;
  const imagem = request.params.imagem;
  const descricao = request.params.descricao;

  const Opcao = Parse.Object.extend("Opcao");
  const query = new Parse.Query(Opcao);

  try {
    const opcao = await query.get(idOpcao, { useMasterKey: true });

    opcao.set("descricao", descricao);

    // Atualizar imagem (requer um tratamento especial)
    if (imagem) {
      const parseFile = new Parse.File("imagem.png", { base64: imagem });
      opcao.set("imagem", parseFile);
    }

    const result = await opcao.save(null, { useMasterKey: true });
    return result;
  } catch (error) {
    console.error("Erro ao atualizar opção:", error);
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      "Erro ao atualizar opção: " + error.message
    );
  }
});

// Função para deletar opção
Parse.Cloud.define("deletarOpcao", async (request) => {
  const idOpcao = request.params.id;
  const Opcao = Parse.Object.extend("Opcao");
  const query = new Parse.Query(Opcao);

  try {
    const opcao = await query.get(idOpcao, { useMasterKey: true });
    await opcao.destroy({ useMasterKey: true });
    return "Opção deletada com sucesso!";
  } catch (error) {
    console.error("Erro ao deletar opção:", error);
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      "Erro ao deletar opção: " + error.message
    );
  }
}); // backend/cloud/opcao/opcao.js

// *** Funções CRUD para Opcao ***

// Função para criar opção
Parse.Cloud.define("criarOpcao", async (request) => {
  const refeicaoId = request.params.refeicaoId;
  const imagem = request.params.imagem;
  const descricao = request.params.descricao;

  const Opcao = Parse.Object.extend("Opcao");
  const opcao = new Opcao();

  // Relaciona com a refeição
  const Refeicao = Parse.Object.extend("Refeicao");
  const refeicao = new Refeicao();
  refeicao.id = refeicaoId;
  opcao.set("refeicao", refeicao);

  opcao.set("descricao", descricao);

  // Salvar imagem (requer um tratamento especial)
  if (imagem) {
    const parseFile = new Parse.File("imagem.png", { base64: imagem });
    opcao.set("imagem", parseFile);
  }

  try {
    const result = await opcao.save(null, { useMasterKey: true });
    return result;
  } catch (error) {
    console.error("Erro ao criar opção:", error);
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      "Erro ao criar opção: " + error.message
    );
  }
});

// Função para buscar opção pelo ID
Parse.Cloud.define("buscarOpcao", async (request) => {
  const idOpcao = request.params.id;
  const Opcao = Parse.Object.extend("Opcao");
  const query = new Parse.Query(Opcao);

  try {
    const opcao = await query.get(idOpcao, { useMasterKey: true });
    return opcao;
  } catch (error) {
    console.error("Erro ao buscar opção:", error);
    throw new Parse.Error(
      Parse.Error.OBJECT_NOT_FOUND,
      "Opção não encontrada: " + error.message
    );
  }
});

// Função para atualizar opção
Parse.Cloud.define("atualizarOpcao", async (request) => {
  const idOpcao = request.params.id;
  const imagem = request.params.imagem;
  const descricao = request.params.descricao;

  const Opcao = Parse.Object.extend("Opcao");
  const query = new Parse.Query(Opcao);

  try {
    const opcao = await query.get(idOpcao, { useMasterKey: true });

    opcao.set("descricao", descricao);

    // Atualizar imagem (requer um tratamento especial)
    if (imagem) {
      const parseFile = new Parse.File("imagem.png", { base64: imagem });
      opcao.set("imagem", parseFile);
    }

    const result = await opcao.save(null, { useMasterKey: true });
    return result;
  } catch (error) {
    console.error("Erro ao atualizar opção:", error);
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      "Erro ao atualizar opção: " + error.message
    );
  }
});

// Função para deletar opção
Parse.Cloud.define("deletarOpcao", async (request) => {
  const idOpcao = request.params.id;
  const Opcao = Parse.Object.extend("Opcao");
  const query = new Parse.Query(Opcao);

  try {
    const opcao = await query.get(idOpcao, { useMasterKey: true });
    await opcao.destroy({ useMasterKey: true });
    return "Opção deletada com sucesso!";
  } catch (error) {
    console.error("Erro ao deletar opção:", error);
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      "Erro ao deletar opção: " + error.message
    );
  }
});