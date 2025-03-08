// frontend/script.js
// Yuri
// *** Inicialização do Parse ***
Parse.serverURL = "https://parseapi.back4app.com/";
Parse.initialize(
  "EDnEyoB0xK3F1wEe8RiEkEXwYNEit4NVMrqqXoux",
  "FZaVc79lLOddCTeMVwr5aCHDO7Lof0VNgBWeh7gh"
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
    alert(
      "Erro ao verificar autenticação. Redirecionando para login. Detalhes: " +
        error.message
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
    alert("Usuário deslogado com sucesso!");
    window.location.href = "/index.html"; // Redireciona para a página inicial
  } catch (error) {
    console.error("Erro ao deslogar usuário:", error);
    alert("Erro ao deslogar usuário: " + error.message);
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
    alert("Erro ao buscar pacientes: " + error.message);
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
    alert("Erro ao criar paciente: " + error.message);
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
    alert("Erro ao criar refeição: " + error.message);
    return null;
  }
}
// Fim yuri