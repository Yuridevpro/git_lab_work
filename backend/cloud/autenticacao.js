// cloud/autenticacao.js



// backend/cloud/autenticacao.js
  // Função para cadastrar um novo usuário
  Parse.Cloud.define("cadastrarUsuario", async (request) => {
    const username = request.params.username;
    const email = request.params.email;
    const password = request.params.password;
  
    const user = new Parse.User();
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);
  
    try {
      await user.signUp(null, { useMasterKey: true }); // Use master key para criar o usuário
      return { success: true, message: "Usuário cadastrado com sucesso!" };
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw new Parse.Error(
        Parse.Error.INTERNAL_SERVER_ERROR,
        "Erro ao cadastrar usuário: " + error.message
      );
    }
  });
  
  
  // Função para fazer login
  Parse.Cloud.define("logarUsuario", async (request) => {
    const email = request.params.email;
    const password = request.params.password;
  
    try {
      const user = await Parse.User.logIn(email, password);
      return {
        success: true,
        message: "Login realizado com sucesso!",
        sessionToken: user.getSessionToken(), // Retorna o token de sessão para o frontend
      };
    } catch (error) {
      console.error("Erro ao logar usuário:", error);
      throw new Parse.Error(
        Parse.Error.INTERNAL_SERVER_ERROR,
        "Erro ao logar usuário: " + error.message
      );
    }
  });
  
  // Função para fazer logout
  Parse.Cloud.define("deslogarUsuario", async (request) => {
    const user = request.user; // Usuário atual
  
    if (!user) {
      return { success: false, message: "Nenhum usuário logado." };
    }
  
    try {
      await Parse.User.logOut();
      return { success: true, message: "Logout realizado com sucesso!" };
    } catch (error) {
      console.error("Erro ao deslogar usuário:", error);
      throw new Parse.Error(
        Parse.Error.INTERNAL_SERVER_ERROR,
        "Erro ao deslogar usuário: " + error.message
      );
    }
  });
  
  // Função para solicitar reset de senha
  Parse.Cloud.define("solicitarResetSenha", async (request) => {
    const email = request.params.email;
  
    try {
      await Parse.User.requestPasswordReset(email);
      return { success: true, message: "Email de recuperação de senha enviado!" };
    } catch (error) {
      console.error("Erro ao solicitar reset de senha:", error);
      throw new Parse.Error(
        Parse.Error.INTERNAL_SERVER_ERROR,
        "Erro ao solicitar reset de senha: " + error.message
      );
    }
  });