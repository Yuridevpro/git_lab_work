// frontend/script.js

// *** Funções de Autenticação ***

// Inicialização do Parse
Parse.serverURL = "https://parseapi.back4app.com/";
Parse.initialize("6LAVwcoGQ2XX4nDRe7n9Ng1ES0HCP0qDnO5DCmJB", "mt4zRG5t4bIcWOVSCzh08A1BKjUfI6GcgzkLYwCk");

// Adiciona a função deslogarUsuario
async function deslogarUsuario() {
  try {
      // Desloga o usuário no Back4App (se necessário)
      await Parse.User.logOut();

      localStorage.removeItem("sessionToken"); // Limpa o token
      alert("Usuário deslogado com sucesso!");
      window.location.href = "/index.html"; // Redireciona para a página inicial
  } catch (error) {
      console.error("Erro ao deslogar usuário:", error);
      alert("Erro ao deslogar usuário: " + error.message);
  }
}
// *** Funções para Pacientes ***

// Função para buscar todos os pacientes
async function buscarPacientes() {
  try {
    const results = await Parse.Cloud.run("buscarTodosPacientes");
    return results;
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    alert("Erro ao buscar pacientes: " + error.message);
    return []; // Retorna um array vazio em caso de erro
  }
}

// Função para criar um paciente
async function criarPaciente(nome, sexo, idade, email, telefone) {
  try {
    const result = await Parse.Cloud.run("criarPaciente", {
      nome: nome,
      sexo: sexo,
      idade: idade,
      email: email,
      telefone: telefone,
    });
    return result;
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    alert("Erro ao criar paciente: " + error.message);
    return null; // Retorna null em caso de erro
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

// *** Funções de Autenticação - Verificação de Sessão ***

// Verifica se o usuário está logado
function verificarSessao() {
  const sessionToken = localStorage.getItem("sessionToken");

  if (!sessionToken) {
    alert("Por favor, faça login para continuar.");
    window.location.href = "/templates/autenticacao/logar.html"; // Redireciona para a página de login
  } else {
    console.log("Usuário está logado.");
  }
}

