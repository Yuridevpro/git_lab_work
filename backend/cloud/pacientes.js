 // backend/cloud/paciente.js

// *** Funções CRUD para Pacientes ***

// Função para criar um paciente
Parse.Cloud.define("criarPaciente", async (request) => {
  console.log("criarPaciente() chamada:", request.params); // ADICIONE ESTE LOG
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
  paciente.set("idade", parseInt(idade)); // Converte para número
  paciente.set("email", email);
  paciente.set("telefone", telefone);

  try {
    const result = await paciente.save(null, { useMasterKey: true });
    return {
      success: true,
      message: "Paciente criado com sucesso!",
      paciente: result, // Retorna o objeto paciente criado
    };
  } catch (error) {
    console.error("Erro ao criar paciente:", error); // Adicionado log de erro
    return {
      success: false,
      message: "Erro ao criar paciente: " + error.message,
    };
  }
});

// Função para buscar um paciente pelo ID
Parse.Cloud.define("buscarPaciente", async (request) => {
  const idPaciente = request.params.id;
  const Pacientes = Parse.Object.extend("Pacientes");
  const query = new Parse.Query(Pacientes);

  try {
    const paciente = await query.get(idPaciente, { useMasterKey: true });
    return {
      success: true,
      paciente: paciente,
    };
  } catch (error) {
    console.error("Erro ao buscar paciente:", error); // Adicionado log de erro
    return {
      success: false,
      message: "Paciente não encontrado: " + error.message,
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

  try {
    const paciente = await query.get(idPaciente, { useMasterKey: true });

    paciente.set("nome", nome);
    paciente.set("sexo", sexo);
    paciente.set("idade", parseInt(idade)); // Converte para número
    paciente.set("email", email);
    paciente.set("telefone", telefone);

    const result = await paciente.save(null, { useMasterKey: true });
    return {
      success: true,
      message: "Paciente atualizado com sucesso!",
      paciente: result,
    };
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error); // Adicionado log de erro
    return {
      success: false,
      message: "Erro ao atualizar paciente: " + error.message,
    };
  }
});

// Função para deletar um paciente
Parse.Cloud.define("deletarPaciente", async (request) => {
  const idPaciente = request.params.id;
  const Pacientes = Parse.Object.extend("Pacientes");
  const query = new Parse.Query(Pacientes);

  try {
    const paciente = await query.get(idPaciente, { useMasterKey: true });
    await paciente.destroy({ useMasterKey: true });
    return { success: true, message: "Paciente deletado com sucesso!" };
  } catch (error) {
    console.error("Erro ao deletar paciente:", error); // Adicionado log de erro
    return {
      success: false,
      message: "Erro ao deletar paciente: " + error.message,
    };
  }
});

// Função para buscar todos os pacientes
Parse.Cloud.define("buscarTodosPacientes", async (request) => {
  const Pacientes = Parse.Object.extend("Pacientes");
  const query = new Parse.Query(Pacientes);

  try {
    const results = await query.find({ useMasterKey: true });
    return {
      success: true,
      pacientes: results.map((paciente) => {
        // Adapta os resultados para um formato mais simples
        return {
          id: paciente.id,
          nome: paciente.get("nome"),
          sexo: paciente.get("sexo"),
          idade: paciente.get("idade"),
          email: paciente.get("email"),
          telefone: paciente.get("telefone"),
        };
      }),
    };
  } catch (error) {
    console.error("Erro ao buscar todos os pacientes:", error);
    return {
      success: false,
      message: "Erro ao buscar todos os pacientes: " + error.message,
    };
  }
});