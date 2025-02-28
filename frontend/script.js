// frontend/script.js

// *** Funções de Autenticação ***
// (Código de autenticação que já estava aqui...)

// *** Funções para Pacientes ***

Parse.serverURL = "https://parseapi.back4app.com/";

// Função para buscar todos os pacientes
async function buscarPacientes() {
  try {
    const result = await Parse.Cloud.run("buscarTodosPacientes");
    if (result.success) {
      return result.pacientes;
    } else {
      console.error("Erro ao buscar pacientes:", result.message);
      alert("Erro ao buscar pacientes: " + result.message);
      return []; // Retorna um array vazio em caso de erro
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
    const result = await Parse.Cloud.run("criarPaciente", {
      nome: nome,
      sexo: sexo,
      idade: idade,
      email: email,
      telefone: telefone,
    });

    if (result.success) {
      alert(result.message);
      // Faça algo com o paciente criado (por exemplo, atualizar a lista de pacientes)
      return result.paciente; // Retorna o paciente criado
    } else {
      alert(result.message); // Exibe a mensagem de erro
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
async function criarRefeicao(
  pacienteId,
  titulo,
  horario,
  carboidratos,
  proteinas,
  gorduras
) {
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

// *** Outras funções CRUD para os outros modelos ***