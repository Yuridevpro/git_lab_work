// backend/cloud/paciente.js

// *** Funções CRUD para Pacientes ***

// Função para criar um paciente
Parse.Cloud.define("criarPaciente", async (request) => {
  console.log("criarPaciente() chamada:", request.params);
  const nome = request.params.nome;
  const sexo = request.params.sexo;
  const idade = request.params.idade;
  const email = request.params.email;
  const telefone = request.params.telefone;

  // Validação de dados (exemplo)
  if (!nome || nome.trim() === "") {
    return { success: false, message: "O nome do paciente é obrigatório." };
  }

  const Pacientes = Parse.Object.extend("Pacientes");
  const paciente = new Pacientes();

  paciente.set("nome", nome);
  paciente.set("sexo", sexo);
  paciente.set("idade", parseInt(idade));
  paciente.set("email", email);
  paciente.set("telefone", telefone);
  paciente.set("nutri", request.user); // Relaciona o paciente com o nutricionista logado

  try {
    const result = await paciente.save(null, { useMasterKey: true });
    return {
      success: true,
      message: "Paciente criado com sucesso!",
      paciente: { // Adapta os dados para evitar exposição direta do objeto Parse
        id: result.id,
        nome: result.get("nome"),
        sexo: result.get("sexo"),
        idade: result.get("idade"),
        email: result.get("email"),
        telefone: result.get("telefone")
      },
    };
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    return {
      success: false,
      message: "Erro ao criar paciente: " + error.message,
    };
  }
});

// Função para buscar todos os pacientes DO NUTRICIONISTA LOGADO
Parse.Cloud.define("buscarTodosPacientes", async (request) => {
  const Pacientes = Parse.Object.extend("Pacientes");
  const query = new Parse.Query(Pacientes);
    query.equalTo("nutri", request.user); // Busca apenas os pacientes do nutricionista logado
  try {
    const results = await query.find({ useMasterKey: true });
    return {
      success: true,
      pacientes: results.map((paciente) => ({
        id: paciente.id,
        nome: paciente.get("nome"),
        sexo: paciente.get("sexo"),
        idade: paciente.get("idade"),
        email: paciente.get("email"),
        telefone: paciente.get("telefone"),
      })),
    };
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    return { success: false, message: error.message };
  }
});

// Função para buscar um paciente pelo ID
Parse.Cloud.define("buscarPaciente", async (request) => {
  const idPaciente = request.params.id;
  const Pacientes = Parse.Object.extend("Pacientes");
  const query = new Parse.Query(Pacientes);
  query.equalTo("nutri", request.user); // Garante que o paciente pertence ao nutricionista
  try {
    const paciente = await query.get(idPaciente, { useMasterKey: true });
    return {
      success: true,
      paciente: {
        id: paciente.id,
        nome: paciente.get("nome"),
        sexo: paciente.get("sexo"),
        idade: paciente.get("idade"),
        email: paciente.get("email"),
        telefone: paciente.get("telefone")
      },
    };
  } catch (error) {
    console.error("Erro ao buscar paciente:", error);
    return {
      success: false,
      message: "Paciente não encontrado ou não autorizado: " + error.message,
    };
  }
});

// Função para atualizar um paciente
Parse.Cloud.define("atualizarPaciente", async (request) => {
  const idPaciente = request.params.id;
  const nome = request.params.nome;
  const sexo = request.params.sexo;
  const idade = request.params.idade;
  const email = request.params.email;
  const telefone = request.params.telefone;

  const Pacientes = Parse.Object.extend("Pacientes");
  const query = new Parse.Query(Pacientes);
  query.equalTo("nutri", request.user); // Garante que o paciente pertence ao nutricionista

  try {
    const paciente = await query.get(idPaciente, { useMasterKey: true });

    paciente.set("nome", nome);
    paciente.set("sexo", sexo);
    paciente.set("idade", parseInt(idade));
    paciente.set("email", email);
    paciente.set("telefone", telefone);

    const result = await paciente.save(null, { useMasterKey: true });
    return {
      success: true,
      message: "Paciente atualizado com sucesso!",
      paciente: {
        id: result.id,
        nome: result.get("nome"),
        sexo: result.get("sexo"),
        idade: result.get("idade"),
        email: result.get("email"),
        telefone: result.get("telefone")
      },
    };
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    return {
      success: false,
      message: "Erro ao atualizar paciente ou não autorizado: " + error.message,
    };
  }
});

// Função para deletar um paciente
Parse.Cloud.define("deletarPaciente", async (request) => {
  const idPaciente = request.params.id;
  const Pacientes = Parse.Object.extend("Pacientes");
  const query = new Parse.Query(Pacientes);
  query.equalTo("nutri", request.user); // Garante que o paciente pertence ao nutricionista

  try {
    const paciente = await query.get(idPaciente, { useMasterKey: true });
    await paciente.destroy({ useMasterKey: true });
    return { success: true, message: "Paciente deletado com sucesso!" };
  } catch (error) {
    console.error("Erro ao deletar paciente:", error);
    return {
      success: false,
      message: "Erro ao deletar paciente ou não autorizado: " + error.message,
    };
  }
});