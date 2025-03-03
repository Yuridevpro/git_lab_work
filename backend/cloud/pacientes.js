// cloud/pacientes.js

// *** Funções CRUD para Pacientes ***

// Função para criar um paciente
Parse.Cloud.define("salvarPaciente", async (request) => {
  console.log("salvarPaciente() chamada:", request.params);

  const { nome, sexo, idade, email, telefone } = request.params;
  const user = request.user;

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  if (!nome || nome.trim() === "") {
    throw new Error("O nome do paciente é obrigatório.");
  }

  const Pacientes = Parse.Object.extend("Pacientes");
  const paciente = new Pacientes();

  paciente.set("nome", nome);
  paciente.set("sexo", sexo);
  paciente.set("idade", parseInt(idade));
  paciente.set("email", email);
  paciente.set("telefone", telefone);
  paciente.set("nutri", user); // Relaciona o paciente com o nutricionista logado

  try {
    const result = await paciente.save(null, { useMasterKey: true });
    return {
      success: true,
      message: "Paciente criado com sucesso!",
      paciente: {
        id: result.id,
        nome: result.get("nome"),
        sexo: result.get("sexo"),
        idade: result.get("idade"),
        email: result.get("email"),
        telefone: result.get("telefone"),
      },
    };
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    throw new Error("Erro ao criar paciente: " + error.message);
  }
});

// Função para buscar todos os pacientes do nutricionista logado
Parse.Cloud.define("buscarPacientes", async (request) => {
  const user = request.user;

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  const Pacientes = Parse.Object.extend("Pacientes");
  const query = new Parse.Query(Pacientes);
  query.equalTo("nutri", user);

  try {
    const results = await query.find({ useMasterKey: true });
    return results.map((paciente) => ({
      id: paciente.id,
      nome: paciente.get("nome"),
      sexo: paciente.get("sexo"),
      idade: paciente.get("idade"),
      email: paciente.get("email"),
      telefone: paciente.get("telefone"),
    }));
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    throw new Error(error.message);
  }
});

// Função para buscar um paciente pelo ID
Parse.Cloud.define("buscarPaciente", async (request) => {
  const { id } = request.params;
  const user = request.user;

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  const Pacientes = Parse.Object.extend("Pacientes");
  const query = new Parse.Query(Pacientes);
  query.equalTo("nutri", user);

  try {
    const paciente = await query.get(id, { useMasterKey: true });
    return {
      id: paciente.id,
      nome: paciente.get("nome"),
      sexo: paciente.get("sexo"),
      idade: paciente.get("idade"),
      email: paciente.get("email"),
      telefone: paciente.get("telefone"),
    };
  } catch (error) {
    console.error("Erro ao buscar paciente:", error);
    throw new Error("Paciente não encontrado ou não autorizado: " + error.message);
  }
});

// Função para atualizar um paciente
Parse.Cloud.define("atualizarPaciente", async (request) => {
  const { id, nome, sexo, idade, email, telefone } = request.params;
  const user = request.user;

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  const Pacientes = Parse.Object.extend("Pacientes");
  const query = new Parse.Query(Pacientes);
  query.equalTo("nutri", user);

  try {
    const paciente = await query.get(id, { useMasterKey: true });

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
        telefone: result.get("telefone"),
      },
    };
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    throw new Error("Erro ao atualizar paciente ou não autorizado: " + error.message);
  }
});

// Função para deletar um paciente
Parse.Cloud.define("deletarPaciente", async (request) => {
  const { id } = request.params;
  const user = request.user;

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  const Pacientes = Parse.Object.extend("Pacientes");
  const query = new Parse.Query(Pacientes);
  query.equalTo("nutri", user);

  try {
    const paciente = await query.get(id, { useMasterKey: true });
    await paciente.destroy({ useMasterKey: true });

    return { success: true, message: "Paciente deletado com sucesso!" };
  } catch (error) {
    console.error("Erro ao deletar paciente:", error);
    throw new Error("Erro ao deletar paciente ou não autorizado: " + error.message);
  }
});
