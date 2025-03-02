// backend/cloud/perfil.js

// Função para buscar informações do perfil do usuário
Parse.Cloud.define("buscarPerfil", async (request) => {
    const user = request.user;

    if (!user) {
        throw new Error("Usuário não autenticado.");
    }

    try {
        return {
            success: true,
            perfil: {
                username: user.get("username"),
                email: user.get("email"),
            },
        };
    } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        throw new Error("Erro ao buscar perfil: " + error.message);
    }
});

// Função para atualizar o perfil do usuário
Parse.Cloud.define("atualizarPerfil", async (request) => {
    const { username, email } = request.params;
    const user = request.user;

    if (!user) {
        throw new Error("Usuário não autenticado.");
    }

    try {
        user.setUsername(username);
        user.setEmail(email);

        await user.save(null, { useMasterKey: true });

        return {
            success: true,
            message: "Perfil atualizado com sucesso!",
            perfil: {
                username: user.get("username"),
                email: user.get("email"),
            },
        };
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        throw new Error("Erro ao atualizar perfil: " + error.message);
    }
});

// Função para deletar a conta do usuário
Parse.Cloud.define("deletarConta", async (request) => {
    const user = request.user;

    if (!user) {
        throw new Error("Usuário não autenticado.");
    }

    try {
        // 1. Excluir todos os dados relacionados aos pacientes do usuário
        const Pacientes = Parse.Object.extend("Pacientes");
        const queryPacientes = new Parse.Query(Pacientes);
        queryPacientes.equalTo("nutri", user);
        const pacientes = await queryPacientes.find({ useMasterKey: true });

        for (const paciente of pacientes) {
            // Excluir DadosPaciente
            const DadosPaciente = Parse.Object.extend("DadosPaciente");
            const queryDadosPaciente = new Parse.Query(DadosPaciente);
            queryDadosPaciente.equalTo("paciente", paciente);
            const dadosPacientes = await queryDadosPaciente.find({ useMasterKey: true });

            for (const dadosPaciente of dadosPacientes) {
                await dadosPaciente.destroy({ useMasterKey: true });
            }

            // Excluir Refeicoes e Opcoes
            const Refeicao = Parse.Object.extend("Refeicao");
            const queryRefeicoes = new Parse.Query(Refeicao);
            queryRefeicoes.equalTo("paciente", paciente);
            const refeicoes = await queryRefeicoes.find({ useMasterKey: true });

            for (const refeicao of refeicoes) {
                // Excluir Opcoes
                const Opcao = Parse.Object.extend("Opcao");
                const queryOpcoes = new Parse.Query(Opcao);
                queryOpcoes.equalTo("refeicao", refeicao);
                const opcoes = await queryOpcoes.find({ useMasterKey: true });

                for (const opcao of opcoes) {
                    await opcao.destroy({ useMasterKey: true });
                }

                await refeicao.destroy({ useMasterKey: true });
            }

            // Excluir o Paciente
            await paciente.destroy({ useMasterKey: true });
        }

        // 2. Excluir as sessões do usuário
        const Session = Parse.Object.extend("_Session");
        const querySessions = new Parse.Query(Session);
        querySessions.equalTo("user", user);
        const sessions = await querySessions.find({ useMasterKey: true });

        for (const session of sessions) {
            await session.destroy({ useMasterKey: true });
        }

        // 3. Excluir o usuário
        await user.destroy({ useMasterKey: true });

        return { success: true, message: "Conta excluída com sucesso!" };
    } catch (error) {
        console.error("Erro ao excluir conta:", error);
        throw new Error("Erro ao excluir conta: " + error.message);
    }
});