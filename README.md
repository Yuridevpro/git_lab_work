# NUTRI LAB - Plataforma de Gestão de Pacientes e Planos Alimentares


## ✨ Sobre o Projeto

**NUTRI LAB** é uma plataforma web projetada para auxiliar nutricionistas na gestão de seus pacientes e na elaboração de planos alimentares personalizados. A aplicação proporciona um ambiente intuitivo e acessível para:

- Cadastro e gerenciamento de pacientes.
- Registro e acompanhamento de dados de saúde.
- Criação e edição de planos alimentares detalhados.

---

## 🔧 Funcionalidades

### 🔑 **Autenticação de Usuário**
- Cadastro de novos nutricionistas.
- Login seguro com e-mail e senha.
- Recuperação de senha via e-mail.
- Logout para encerrar a sessão.

### 👥 **Gestão de Pacientes**
- Cadastro de novos pacientes (nome, sexo, idade, e-mail, telefone).
- Listagem e visualização detalhada de pacientes.
- Edição e exclusão de pacientes.

### 🏥 **Dados do Paciente**
- Registro de informações de saúde:
  - Peso, altura, percentual de gordura e músculo.
  - Colesterol (HDL, LDL, total) e triglicerídeos.
- Histórico de dados em formato de tabela.
- Edição e exclusão de registros de saúde.

### 🍽️ **Plano Alimentar**
- Criação de planos alimentares personalizados.
- Definição de refeições e horários.
- Registro de valores nutricionais (carboidratos, proteínas, gorduras).
- Edição e exclusão de refeições.

### 👤 **Perfil do Usuário**
- Visualização e edição do perfil (nome, e-mail).
- Exclusão da conta do nutricionista.

---

## 🤖 Tecnologias Utilizadas

### 🎨 **Frontend**
- HTML 🏗️
- CSS 🎨
- JavaScript ⚡
- Bootstrap 💅 (para estilização)
- Parse SDK 🔌 (para comunicação com o backend)

### 🛠️ **Backend**
- Back4App ☁️ (Plataforma como Serviço - PaaS)
- Parse Cloud Code 📝 (JavaScript)
- Parse SDK 🔗
- Express.js 🚀

### 🌐 **Outros**
- **Replit** 🖥️ (ambiente de desenvolvimento)
- **Vercel** 🚀 (hospedagem do frontend)
- **GitHub** 🐙 (controle de versão e repositório de código)

---

## 🏗️ Arquitetura

A aplicação segue o modelo **cliente-servidor**, onde:

- **Frontend**: Responsável por exibir a interface do usuário e interagir com o backend via Parse SDK.
- **Backend**: Gerencia as requisições do frontend, acessa o banco de dados e realiza operações CRUD.
---

## ⚙️ Configuração do Projeto

### ⚡ **Pré-requisitos**

Antes de iniciar, você precisará de:
- Conta no [Back4App](https://www.back4app.com/).
- Conta no [Vercel](https://vercel.com/).
- Conta no [GitHub](https://github.com/) (ou similar).
- [Replit](https://replit.com/) (opcional, mas recomendado para desenvolvimento).

### 🛠️ **Passos para Configuração**

1. **Clone o repositório:**

```bash
 git clone [URL_DO_REPOSITORIO]
 cd nutri-lab
```

2. **Instale as dependências do frontend:**

```bash
 npm install
```

3. **Configure as credenciais do Parse Server:**

Edite o arquivo de configuração `.env` com suas chaves do Back4App.

4. **Instale as dependências do backend:**

```bash
 npm install express
```

5. **Inicie o servidor:**

```bash
 node server.js
```

---

## 📸 Telas da Aplicação

| Tela de Login | Dashboard | Gestão de Pacientes |
| ![Login](https://via.placeholder.com/250x150) | ![Dashboard](https://via.placeholder.com/250x150) | ![Pacientes](https://via.placeholder.com/250x150) |

---

🎯 **Nutri Lab** - Facilite a gestão de seus pacientes e otimize sua prática nutricional! 🌟

