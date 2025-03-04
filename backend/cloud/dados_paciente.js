 // backend/cloud/dados_paciente.js

// *** Funções CRUD para DadosPaciente ***

// Função para criar dados do paciente
Parse.Cloud.define("criarDadosPaciente", async (request) => {
  console.log("criarDadosPaciente() chamada:", request.params);

  const pacienteId = request.params.pacienteId;
  const data = request.params.data;
  const peso = request.params.peso;
  const altura = request.params.altura;
  const gordura = request.params.gordura;
  const musculo = request.params.musculo;
  const hdl = request.params.hdl;
  const ldl = request.params.ldl;
  const ctotal = request.params.ctotal;
  const trigliceridios = request.params.trigliceridios;

  const DadosPaciente = Parse.Object.extend("DadosPaciente");
  const dadosPaciente = new DadosPaciente();

  // Relaciona com o paciente
  const Pacientes = Parse.Object.extend("Pacientes");
  const paciente = new Pacientes();
  paciente.id = pacienteId;
  dadosPaciente.set("paciente", paciente);

  // Verifica se o paciente pertence ao nutricionista logado
  const query = new Parse.Query(Pacientes);
  query.equalTo("nutri", request.user);
  query.equalTo("objectId", pacienteId); // Adiciona a verificação do ID do paciente
  try {
    console.log("Validando paciente com ID:", pacienteId, "e nutricionista:", request.user.id); // ADICIONADO LOG
    const pacienteValidado = await query.first({ useMasterKey: true });
    if (!pacienteValidado) {
      console.error("Paciente não encontrado ou não autorizado.");
      return { success: false, message: "Paciente não encontrado ou não autorizado." };
    }
    console.log("Paciente validado com sucesso:", pacienteValidado.id); // ADICIONADO LOG
  } catch (error) {
    console.error("Erro ao validar paciente:", error);
    return { success: false, message: "Paciente não encontrado ou não autorizado." };
  }

  dadosPaciente.set("data", new Date(data)); // Converte para data
  dadosPaciente.set("peso", peso);
  dadosPaciente.set("altura", altura);
  dadosPaciente.set("percentual_gordura", gordura);
  dadosPaciente.set("percentual_musculo", musculo);
  dadosPaciente.set("colesterol_hdl", hdl);
  dadosPaciente.set("colesterol_ldl", ldl);
  dadosPaciente.set("colesterol_total", ctotal);
  dadosPaciente.set("trigliceridios", trigliceridios);

  try {
    const result = await dadosPaciente.save(null, { useMasterKey: true });
    console.log("Dados do paciente criados com sucesso:", result.id); // ADICIONADO LOG
    return { success: true, message: "Dados do paciente criados com sucesso!", dadosPaciente: result };
  } catch (error) {
    console.error("Erro ao criar dados do paciente:", error);
    return {
      success: false,
      message: "Erro ao criar dados do paciente: " + error.message,
    };
  }
});

// Função para buscar dados do paciente pelo ID
Parse.Cloud.define("buscarDadosPaciente", async (request) => {
  console.log("buscarDadosPaciente() chamada:", request.params);
  const idDadosPaciente = request.params.id;
    const DadosPaciente = Parse.Object.extend("DadosPaciente");
    const query = new Parse.Query(DadosPaciente);
  query.include("paciente"); // Inclui os dados do paciente relacionado

  try {
      console.log("Buscando dados do paciente com ID:", idDadosPaciente); // ADICIONADO LOG
        const dadosPaciente = await query.get(idDadosPaciente, { useMasterKey: true });

        // Garante que o paciente pertence ao nutricionista logado
        console.log("Validando paciente com ID:", dadosPaciente.get("paciente").id, "e nutricionista:", request.user.id); // ADICIONADO LOG
        if (dadosPaciente.get("paciente").get("nutri").id !== request.user.id) {
            console.error("Não autorizado: Paciente não pertence ao nutricionista.");
            throw new Error("Não autorizado");
        }
        console.log("Paciente validado com sucesso."); // ADICIONADO LOG
        return {
            success: true,
            dadosPaciente: {
                id: dadosPaciente.id,
                data: dadosPaciente.get("data"),
                peso: dadosPaciente.get("peso"),
                altura: dadosPaciente.get("altura"),
                percentual_gordura: dadosPaciente.get("percentual_gordura"),
                percentual_musculo: dadosPaciente.get("percentual_musculo"),
                colesterol_hdl: dadosPaciente.get("colesterol_hdl"),
                colesterol_ldl: dadosPaciente.get("colesterol_ldl"),
                colesterol_total: dadosPaciente.get("colesterol_total"),
                trigliceridios: dadosPaciente.get("trigliceridios"),
            }
        };
    } catch (error) {
        console.error("Erro ao buscar dados do paciente:", error);
        return { success: false, message: "Dados do paciente não encontrados ou não autorizado: " + error.message };
    }
});

// Função para atualizar dados do paciente
Parse.Cloud.define("atualizarDadosPaciente", async (request) => {
  const idDadosPaciente = request.params.id;
  const data = request.params.data;
  const peso = request.params.peso;
  const altura = request.params.altura;
  const gordura = request.params.gordura;
  const musculo = request.params.musculo;
  const hdl = request.params.hdl;
  const ldl = request.params.ldl;
  const ctotal = request.params.ctotal;
  const trigliceridios = request.params.trigliceridios;

  const DadosPaciente = Parse.Object.extend("DadosPaciente");
  const query = new Parse.Query(DadosPaciente);
    query.include("paciente"); // Inclui os dados do paciente relacionado


  try {
    const dadosPaciente = await query.get(idDadosPaciente, {
      useMasterKey: true,
    });
      // Garante que o paciente pertence ao nutricionista logado
        if (dadosPaciente.get("paciente").get("nutri").id !== request.user.id) {
            throw new Error("Não autorizado");
        }

    dadosPaciente.set("data", new Date(data));
    dadosPaciente.set("peso", peso);
    dadosPaciente.set("altura", altura);
    dadosPaciente.set("percentual_gordura", gordura);
    dadosPaciente.set("percentual_musculo", musculo);
    dadosPaciente.set("colesterol_hdl", hdl);
    dadosPaciente.set("colesterol_ldl", ldl);
    dadosPaciente.set("colesterol_total", ctotal);
    dadosPaciente.set("trigliceridios", trigliceridios);

    const result = await dadosPaciente.save(null, { useMasterKey: true });
    return { success: true, message: "Dados do paciente atualizados com sucesso!", dadosPaciente: result };
  } catch (error) {
    console.error("Erro ao atualizar dados do paciente:", error);
    return {
      success: false,
      message: "Erro ao atualizar dados do paciente ou não autorizado: " + error.message,
    };
  }
});

// Função para deletar dados do paciente
Parse.Cloud.define("deletarDadosPaciente", async (request) => {
  const idDadosPaciente = request.params.id;
  const DadosPaciente = Parse.Object.extend("DadosPaciente");
  const query = new Parse.Query(DadosPaciente);
    query.include("paciente"); // Inclui os dados do paciente relacionado

  try {
    const dadosPaciente = await query.get(idDadosPaciente, {
      useMasterKey: true,
    });
       // Garante que o paciente pertence ao nutricionista logado
        if (dadosPaciente.get("paciente").get("nutri").id !== request.user.id) {
            throw new Error("Não autorizado");
        }
    await dadosPaciente.destroy({ useMasterKey: true });
    return { success: true, message: "Dados do paciente deletados com sucesso!" };
  } catch (error) {
    console.error("Erro ao deletar dados do paciente:", error);
    return {
      success: false,
      message: "Erro ao deletar dados do paciente ou não autorizado: " + error.message,
    };
  }
});