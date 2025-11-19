# 🧪 Repositório Centralizado de Testes de Software

Este repositório serve como um hub central para projetos de testes de software de diversas aplicações, abrangendo diferentes tipos de testes (E2E, Integração, Unitários) e frameworks.
O objetivo é fornecer um ambiente organizado para versionar, documentar e executar as suítes de testes de forma padronizada.

---

## 📂 Estrutura do Repositório

O repositório é organizado em diretórios, onde cada pasta na raiz representa um projeto de teste ou uma tecnologia específica.

**Para configurar e rodar qualquer projeto específico, navegue até a subpasta desejada e siga a instrução geral apresentada no final desse arquivo.**

---

## 🛠️ Tecnologias Principais

Este repositório utiliza e documenta o uso das seguintes ferramentas no escopo dos projetos:

* **Cypress:** Framework principal para testes E2E e de Componentes.
* **Jest:** Framework utilizado para testes unitários em JavaScript.
* **Node.js / npm:** Gerenciamento de dependências para projetos baseados em JavaScript.
* **Java / Maven:** Utilizado em projetos de testes de API (Ex: RestAssured).

---

## ⚙️ Configuração e Instalação Geral

Para que você possa rodar qualquer projeto de teste neste repositório, siga estas etapas básicas:

### Pré-requisitos

Certifique-se de que os seguintes ambientes e ferramentas estão instalados em sua máquina:

1.  **Git**
2.  **Node.js e npm** (Necessário para Cypress, Jest e projetos JS)
3.  **Java JDK** (Necessário para projetos de API com Maven/RestAssured)

### 1. Clonar o Repositório
```bash
git clone https://github.com/JaoMachado/TesteSoftware.git
```

### 2. Entrar no Projeto Desejado
Como cada subpasta é um projeto independente, você deve instalar as dependências separadamente:
```bash
cd [Projeto Desejado]
```

### 3. Inicializar um Projeto Node
```bash
npm init --yes
```

### 4. Instalar o Cypress no Projeto
```bash
npm install -D cypress
```

### 5. Abrir o Cypress
```bash
npx cypress open
```

---

### 👨‍💻 Créditos
* **João Pedro Machado Silva**
* **Prof. Doutor Breno Lisi Romano**
