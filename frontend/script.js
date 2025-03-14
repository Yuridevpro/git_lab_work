//yuri
// *** Inicialização do Parse ***
Parse.serverURL = "https://parseapi.back4app.com/";
Parse.initialize(
  "GAcpwTn8vWR3IH6vopjoWxeMi9r0HNQpujteULei",
  "eohDaTIobNJcVdrnRoJHmU9Sgm1i8TtsJ7HdWg1O",
);

// *** Funções de Autenticação - Verificação de Sessão ***
async function requireAuth() {
  try {
    const currentUser = await Parse.User.currentAsync();
    if (!currentUser) {
      console.log("Usuário não autenticado. Redirecionando...");
      window.location.replace("/templates/autenticacao/logar.html");
    }
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    exibirMensagem(
      "Erro ao verificar autenticação. Redirecionando para login. Detalhes: " +
        error.message, "erro"
    );
    window.location.replace("/templates/autenticacao/logar.html");
  }
}



// Adiciona a função deslogarUsuario
async function deslogarUsuario() {
  try {
    // Desloga o usuário no Back4App (se necessário)
    await Parse.User.logOut();

    localStorage.removeItem("sessionToken"); // Limpa o token
    exibirMensagem("Usuário deslogado com sucesso!", "sucesso");
    window.location.href = "/index.html"; // Redireciona para a página inicial
  } catch (error) {
    console.error("Erro ao deslogar usuário:", error);
    exibirMensagem("Erro ao deslogar usuário: " + error.message, "erro");
  }
}



// Função para atualizar o menu de autenticação (login/logout)
async function atualizarMenuAutenticacao() {
  const menu = document.getElementById("menu-autenticacao");
  if (!menu) {
    console.warn("Elemento #menu-autenticacao não encontrado.");
    return;
  }

  menu.innerHTML = ""; // Limpa o menu

  if (localStorage.getItem("sessionToken")) {
    // Usuário está logado
    const liPerfil = document.createElement("li");
    liPerfil.className = "nav-item";
    liPerfil.innerHTML = `
            <a class="nav-link" href="/templates/plataforma/perfil/perfil.html">Meu Perfil</a>
        `;
    menu.appendChild(liPerfil);

    const liSair = document.createElement("li");
    liSair.className = "nav-item";
    liSair.innerHTML = `
            <a class="nav-link" href="#" onclick="deslogarUsuario()">Sair</a>
        `;
    menu.appendChild(liSair);
  } else {
    // Usuário não está logado
    const liLogin = document.createElement("li");
    liLogin.className = "nav-item";
    liLogin.innerHTML = `
            <a class="nav-link" href="/templates/autenticacao/logar.html">Logar</a>
        `;
    menu.appendChild(liLogin);

    const liCadastro = document.createElement("li");
    liCadastro.className = "nav-item";
    liCadastro.innerHTML = `
            <a class="nav-link" href="/templates/autenticacao/cadastro.html">Cadastre-se</a>
        `;
    menu.appendChild(liCadastro);
  }
}

// Fim Yuri
// Alan


// *** Funções para Pacientes ***

// Função para buscar todos os pacientes
async function buscarPacientes() {
  try {
    const results = await Parse.Cloud.run("buscarPacientes");
    return results;
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    exibirMensagem("Erro ao buscar pacientes: " + error.message, "erro");
    return []; // Retorna um array vazio em caso de erro
  }
}

// Função para criar um paciente
async function criarPaciente(nome, sexo, idade, email, telefone) {
  try {
    const result = await Parse.Cloud.run("salvarPaciente", {
      nome: nome,
      sexo: sexo,
      idade: idade,
      email: email,
      telefone: telefone,
    });
    return result;
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    exibirMensagem("Erro ao criar paciente: " + error.message, "erro");
    return null; // Retorna null em caso de erro
  }
}
// Fim Alan

// Gabriel
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
    exibirMensagem("Erro ao criar dados do paciente: " + error.message, "erro");
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
    exibirMensagem("Erro ao buscar dados do paciente: " + error.message, "erro");
    return null;
  }
}
// Fim gabriel

// Yuri
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
    exibirMensagem("Erro ao criar refeição: " + error.message, "erro");
    return null;
  }
}
// Fim yuri


// Função para exibir a mensagem usando o alerta Bootstrap
function exibirMensagem(texto, tipo) {
  const mensagemDiv = document.getElementById("mensagem");

  if (!mensagemDiv) {
    console.error("Elemento #mensagem não encontrado.  Certifique-se de que o HTML correto está presente.");
    return; // Interrompe a execução se o elemento não existir
  }

  mensagemDiv.textContent = texto;

  // Remove classes de alerta existentes
  mensagemDiv.classList.remove("alert-success", "alert-danger", "alert-warning", "alert-info");

  // Adiciona a classe de alerta apropriada com base no tipo
  switch (tipo) {
    case "sucesso":
      mensagemDiv.classList.add("alert-success");
      break;
    case "erro":
      mensagemDiv.classList.add("alert-danger");
      break;
    case "aviso":
      mensagemDiv.classList.add("alert-warning");
      break;
    case "info":
      mensagemDiv.classList.add("alert-info");
      break;
    default:
      console.warn("Tipo de mensagem desconhecido: " + tipo);
      return;  //Não exibe nada se o tipo for desconhecido
  }

  // Mostra o alerta
  mensagemDiv.style.display = "block";

  // Oculta o alerta após 3 segundos (ajuste conforme necessário)
  setTimeout(() => {
    mensagemDiv.style.display = "none";
  }, 3000);
}

// Exporta a função para que ela possa ser usada em outros arquivos
window.exibirMensagem = exibirMensagem;