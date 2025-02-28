// frontend/script.js

// *** Funções de Autenticação ***
// (Código de autenticação que já estava aqui...)

// *** Funções para Pacientes ***

Parse.serverURL = "https://parseapi.back4app.com/";

// frontend/script.js

// Função para buscar todos os pacientes
async function buscarPacientes() {
  try {
    // Verifica se há um usuário logado antes de buscar os pacientes
    if (!Parse.User.current()) {
      console.log("Nenhum usuário logado.");
      return []; // Retorna um array vazio se não houver usuário logado
    }
    const result = await Parse.Cloud.run("buscarTodosPacientes");
    if (result.success) {
      return result.pacientes;
    } else {
      console.error("Erro ao buscar pacientes:", result.message);
      alert("Erro ao buscar pacientes: " + result.message);
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    alert("Erro ao buscar pacientes: " + error.message);
    return []; // Retorna um array vazio em caso de erro
  }
}

// Função para criar um paciente
async function criarPaciente(nome, sexo, idade, email, telefone) {
  try {
       // Verifica se há um usuário logado antes de criar o paciente
    if (!Parse.User.current()) {
      alert("Nenhum usuário logado.");
      window.location.href = "/templates/autenticacao/logar.html"; // Redireciona para a página de login
      return null;
    }
    const result = await Parse.Cloud.run("criarPaciente", {
      nome: nome,
      sexo: sexo,
      idade: idade,
      email: email,
      telefone: telefone,
    });

    if (result.success) {
      alert(result.message);
      return result.paciente;
    } else {
      alert(result.message);
      return null;
    }
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    alert("Erro ao criar paciente: " + error.message);
    return null;
  }
}

// *** Funções para DadosPaciente ***

// Função para criar dados do paciente
async function criarDadosPaciente(
  pacienteId,
  data,
  peso,
  altura,
  gordura,
  musculo,
  hdl,
  ldl,
  ctotal,
  trigliceridios
) {
  try {
     // Verifica se há um usuário logado antes de criar os dados do paciente
    if (!Parse.User.current()) {
      alert("Nenhum usuário logado.");
      window.location.href = "/templates/autenticacao/logar.html"; // Redireciona para a página de login
      return null;
    }
    const result = await Parse.Cloud.run("criarDadosPaciente", {
      pacienteId: pacienteId,
      data: data,
      peso: peso,
      altura: altura,
      gordura: gordura,
      musculo: musculo,
      hdl: hdl,
      ldl: ldl,
      ctotal: ctotal,
      trigliceridios: trigliceridios,
    });
    return result;
  } catch (error) {
    console.error("Erro ao criar dados do paciente:", error);
    alert("Erro ao criar dados do paciente: " + error.message);
    return null;
  }
}

// Função para buscar dados do paciente
async function buscarDadosPaciente(id) {
  try {
     // Verifica se há um usuário logado antes de buscar os dados do paciente
    if (!Parse.User.current()) {
      alert("Nenhum usuário logado.");
      window.location.href = "/templates/autenticacao/logar.html"; // Redireciona para a página de login
      return null;
    }
    const result = await Parse.Cloud.run("buscarDadosPaciente", { id: id });
    return result;
  } catch (error) {
    console.error("Erro ao buscar dados do paciente:", error);
    alert("Erro ao buscar dados do paciente: " + error.message);
    return null;
  }
}

// *** Funções para Refeicao ***

// Função para criar refeição
async function criarRefeicao(pacienteId, titulo, horario, carboidratos, proteinas, gorduras) {
  try {
     // Verifica se há um usuário logado antes de criar a refeição
    if (!Parse.User.current()) {
      alert("Nenhum usuário logado.");
      window.location.href = "/templates/autenticacao/logar.html"; // Redireciona para a página de login
      return null;
    }
    const result = await Parse.Cloud.run("criarRefeicao", {
      pacienteId: pacienteId,
      titulo: titulo,
      horario: horario,
      carboidratos: carboidratos,
      proteinas: proteinas,
      gorduras: gorduras,
    });
    return result;
  } catch (error) {
    console.error("Erro ao criar refeição:", error);
    alert("Erro ao criar refeição: " + error.message);
    return null;
  }
}

// *** Funções para Opcao ***

// Função para criar opção
async function criarOpcao(refeicaoId, imagem, descricao) {
    try {
       // Verifica se há um usuário logado antes de criar a opção
    if (!Parse.User.current()) {
      alert("Nenhum usuário logado.");
      window.location.href = "/templates/autenticacao/logar.html"; // Redireciona para a página de login
      return null;
    }
      const result = await Parse.Cloud.run("criarOpcao", {
        refeicaoId: refeicaoId,
        imagem: imagem,
        descricao: descricao,
      });
      return result;
    } catch (error) {
      console.error("Erro ao criar opção:", error);
      alert("Erro ao criar opção: " + error.message);
      return null;
    }
  }

// *** Outras funções CRUD para os outros modelos ***