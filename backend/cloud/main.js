require('./cloud');

Parse.Cloud.define("obterDadosNutricionista", async (request) => {
  const user = request.user;
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  const query = new Parse.Query(Parse.User);
  try {
    const nutricionista = await query.get(user.id, { useMasterKey: true });
    // Use o campo correto que contém o nome do nutricionista
    const nomeNutricionista = nutricionista.get("nomeCompleto") || nutricionista.get("fullName") || nutricionista.get("nome") || nutricionista.get("username");

    return {
      nome: nomeNutricionista, // Use a variável nomeNutricionista
      email: nutricionista.get("email"),
    };
  } catch (error) {
    console.error("Erro ao buscar dados do nutricionista:", error);
    throw new Error("Erro ao buscar dados do nutricionista.");
  }
});