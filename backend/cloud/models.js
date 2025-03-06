// backend/cloud/models.js

// *** Definição das Classes (Modelos) ***

// Classe Pacientes
Parse.Object.registerSubclass(
    "Pacientes",
    class Pacientes extends Parse.Object {
        constructor() {
            super("Pacientes");
        }

        // Getters e Setters (opcional, mas ajuda a organizar e evitar erros de digitação)
        getNome() {
            return this.get("nome");
        }
        setNome(nome) {
            this.set("nome", nome);
        }

        getSexo() {
            return this.get("sexo");
        }
        setSexo(sexo) {
            this.set("sexo", sexo);
        }

        getIdade() {
            return this.get("idade");
        }
        setIdade(idade) {
            this.set("idade", idade);
        }

        getEmail() {
            return this.get("email");
        }
        setEmail(email) {
            this.set("email", email);
        }

        getTelefone() {
            return this.get("telefone");
        }
        setTelefone(telefone) {
            this.set("telefone", telefone);
        }
    }
);

// Classe DadosPaciente
Parse.Object.registerSubclass(
    "DadosPaciente",
    class DadosPaciente extends Parse.Object {
        constructor() {
            super("DadosPaciente");
        }

        getPaciente() {
            return this.get("paciente");
        }
        setPaciente(paciente) {
            this.set("paciente", paciente);
        }

        getData() {
            return this.get("data");
        }
        setData(data) {
            this.set("data", data);
        }

        getPeso() {
            return this.get("peso");
        }
        setPeso(peso) {
            this.set("peso", peso);
        }

        getAltura() {
            return this.get("altura");
        }
        setAltura(altura) {
            this.set("altura", altura);
        }

        getPercentualGordura() {
            return this.get("percentual_gordura");
        }
        setPercentualGordura(percentual_gordura) {
            this.set("percentual_gordura", percentual_gordura);
        }

        getPercentualMusculo() {
            return this.get("percentual_musculo");
        }
        setPercentualMusculo(percentual_musculo) {
            this.set("percentual_musculo", percentual_musculo);
        }

        getColesterolHdl() {
            return this.get("colesterol_hdl");
        }
        setColesterolHdl(colesterol_hdl) {
            this.set("colesterol_hdl", colesterol_hdl);
        }

        getColesterolLdl() {
            return this.get("colesterol_ldl");
        }
        setColesterolLdl(colesterol_ldl) {
            this.set("colesterol_ldl", colesterol_ldl);
        }

        getColesterolTotal() {
            return this.get("colesterol_total");
        }
        setColesterolTotal(colesterol_total) {
            this.set("colesterol_total", colesterol_total);
        }

        getTrigliceridios() {
            return this.get("trigliceridios");
        }
        setTrigliceridios(trigliceridios) {
            this.set("trigliceridios", trigliceridios);
        }
    }
);

// Classe Refeicao
Parse.Object.registerSubclass(
    "Refeicao",
    class Refeicao extends Parse.Object {
        constructor() {
            super("Refeicao");
        }
        getPaciente() {
            return this.get("paciente");
        }
        setPaciente(paciente) {
            this.set("paciente", paciente);
        }

        getTitulo() {
            return this.get("titulo");
        }
        setTitulo(titulo) {
            this.set("titulo", titulo);
        }

        // New Getters and Setters for Descricao
        getDescricao() {
            return this.get("descricao");
        }
        setDescricao(descricao) {
            this.set("descricao", descricao);
        }

        getHorario() {
            return this.get("horario");
        }
        setHorario(horario) {
            this.set("horario", horario);
        }

        getCarboidratos() {
            return this.get("carboidratos");
        }
        setCarboidratos(carboidratos) {
            this.set("carboidratos", carboidratos);
        }

        getProteinas() {
            return this.get("proteinas");
        }
        setProteinas(proteinas) {
            this.set("proteinas", proteinas);
        }

        getGorduras() {
            return this.get("gorduras");
        }
        setGorduras(gorduras) {
            this.set("gorduras", gorduras);
        }
    }
);