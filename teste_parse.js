require('dotenv').config();
const Parse = require('parse/node');

Parse.serverURL = process.env.BACK4APP_SERVER_URL;
Parse.initialize(
    process.env.BACK4APP_APP_ID,
    process.env.BACK4APP_JS_KEY
);

async function testarConexao() {
    try {
        const testObject = new Parse.Object("TestClass");
        testObject.set("message", "Teste de conexão com Parse");
        await testObject.save();
        console.log("✅ Conectado ao Back4App com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao Back4App:", error);
    }
}

testarConexao();
