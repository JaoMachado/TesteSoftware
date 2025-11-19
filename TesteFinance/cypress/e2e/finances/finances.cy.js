/// <reference types="cypress" />

//Suíte de Testes: Transações
describe('Transações', () => {
    beforeEach(() => {
        // Definindo a Página a ser Testada
        cy.visit("https://dev-finance.netlify.app/")
    });

    //Caso de Teste 01: Cadastrar Nova Transação - Entrada
    it('Cadastrar Nova Transação - Entrada', () => {
        //Selecionando a Opção para se Cadastrar Nova Transação - Entrada
        cy.contains("Nova Transação").click();

        //Inserindo o Conteúdo da Descrição
        cy.get('#description').type("Manutenção no Site do IFSP-SBV");

        //Inserindo o Conteúdo do Valor
        cy.get('#amount').type("500");

        //Inserindo o Conteúdo da Data -> Máscara obrigatória: yyyy-mm-dd
        cy.get('#date').type("2023-10-20");

        //Selecionando a opção para Salvar a Transação
        cy.contains('button', 'Salvar').click();

        //Assertion para verificar se tivemos sucesso ou falha
        cy.get("tbody tr td.description").should("have.text", "Manutenção no Site do IFSP-SBV");
    });

    //Caso de Teste 02: Cadastrar Nova Transação - Saída
    it('Cadastrar Nova Transação - Saída', () => {
        //Selecionando a Opção para se Cadastrar Nova Transação - Saída
        cy.contains("Nova Transação").click();
    
        //Inserindo o Conteúdo da Descrição
        cy.get('#description').type("Pagamento da Infraestrutura");
    
        //Inserindo o Conteúdo do Valor
        cy.get('#amount').type("-270");
    
        //Inserindo o Conteúdo da Data -> Máscara obrigatória: yyyy-mm-dd
        cy.get('#date').type("2023-10-21");
    
        //Selecionando a opção para Salvar a Transação
        cy.contains('button', 'Salvar').click();
    
        //Assertion para verificar se tivemos sucesso ou falha
        cy.get("tbody tr td.description").should("have.text", "Pagamento da Infraestrutura");
    });

    //Caso de Teste 03: Cadastrar Nova Transação - Saída Refatorada - Functiona
    it('Cadastrar Nova Transação - Saída Refatorada - Function', () => {
        //Preenchendo o Formulario de Transacao utilizando a function definida
        criarTrasacao("Pagamento da Infraestrutura", -270, "2023-10-21");

        //Assertion para verificar se tivemos sucesso ou falha
        cy.get("tbody tr td.description").should("have.text", "Pagamento da Infraestrutura"); // Verifica se a descrição da transação de saída aparece na tabela
    });

    //Caso de Teste 04: Excluir Transação - Opção 1
    it('Excluir Transação - Opção 1', () => {
        //Preenchendo o Formulario de Transacao utilizando a function definida
        criarTrasacao("Refatoração da Aplicação XPTO", 170, "2023-10-23");
        criarTrasacao ("Terceirizando o serviço de Backend", -100, "2023-10-23");
        
        cy.contains(".description", "Refatoração da Aplicação XPTO") //Identificando o conteúdo que queremos excluir
        .parent()                                                    //Selecionando a linha por completo (elemento HTML em um nivel acima)
        .find("img")                                                 //Buscando onde está o comando de exclusão
        .click();                                                    //Executando a ação do click na Imagem que realiza a ação da exclusão

        //Assertion para verificar se tivemos sucesso ou falha
        cy.get('tbody tr').should("have.length", 1); //Fazendo uma Assertion diferente -> Inserimos 2 elementos, Excluímos 1
                                                     //e verificamos se sobrou apenas 1 na tabela
    });

    //Caso de Teste 05: Excluir Transação - Opção 2
    it('Excluir Transação - Opção 2', () => {
        //Preenchendo o Formulario de Transacao utilizando a function definida
        criarTrasacao("Refatoração da Aplicação XPTO", 170, "2023-10-23");
        criarTrasacao ("Terceirizando o serviço de Backend", -100, "2023-10-23");

        cy.contains(".description", "Refatoração da Aplicação XPTO") //Identificando o conteúdo que queremos excluir
        .siblings()                                                  //Selecionando os elementos irmãos do  elemento selecionado
        .children("img")                                             //Buscando os filhos dos irmãos que possuem o img
        .click();                                                    //Executando a ação do click na Imagem que realiza a ação da exclusão

        //Assertion para verificar se tivemos sucesso ou falha
        cy.get('tbody tr').should("have.length", 1); //Fazendo uma Assertion diferente -> Inserimos 2 elementos, Excluímos 1
                                                     //e verificamos se sobrou apenas 1 na tabela
    });

    //Caso de Teste 06: Somatório do Card de Entrada
    it('Somatório do Card de Entrada', () => {
        // Variáveis armazenando os valores de entrada e o esperado
        const entrada1 = 170.50;
        const entrada2 = 100.20;
        const somaEsperada = entrada1 + entrada2;

        //Preenchendo o Formulario de Transacao utilizando a function definida
        criarTrasacao("Refatoração da Aplicação XPTO", entrada1, "2023-10-23");
        criarTrasacao ("Terceirizando o serviço de Backend", entrada2, "2023-10-23");

        // O seletor #incomeDisplay é o valor total de entradas
        cy.get('#incomeDisplay')
        .invoke('text') // Pega o texto do elemento
        .then(text => { 
            const textoLimpo = text.trim()              // Adapta o texto para testarmos
                                    .replace('R$', '')  // Remove o "R$"
                                    .replace('.', '')   // Remove o ponto de milhar
                                    .replace(',', '.'); // Troca a vírgula por ponto

            // converte o texto limpo para float e atribui a variável
            const valorAtual = parseFloat(textoLimpo);

            // Assertion para verificar se tivemos sucesso ou falha
            expect(valorAtual).to.equal(somaEsperada); // Compara o valor lido com o esperado
        });
    });

    //Caso de Teste 07: Somatório do Card de Saída
    it('Somatório do Card de Saída', () => {
        // Variáveis armazenando os valores de entrada e o esperado
        const saida1 = -170.50;
        const saida2 = -100.20;
        const somaEsperadaAbsoluta = Math.abs(saida1 + saida2); // Valor absoluto

        //Preenchendo o Formulario de Transacao utilizando a function definida
        criarTrasacao("Refatoração da Aplicação XPTO", saida1, "2023-10-23");
        criarTrasacao ("Terceirizando o serviço de Backend", saida2, "2023-10-23");

        // O seletor #expenseDisplay é o valor total de saídas
        cy.get('#expenseDisplay')
        .invoke('text') // Pega o texto do elemento
        .then(text => { 
            const textoLimpo = text.trim()              // Adapta o texto para testarmos
                                    .replace('-', '')   // Remove o sinal de menos
                                    .replace('R$', '')  // Remove o "R$"
                                    .replace('.', '')   // Remove o ponto de milhar
                                    .replace(',', '.'); // Troca a vírgula por ponto

            // converte o texto limpo para float e atribui a variável
            const valorAtual = parseFloat(textoLimpo);

            // Assertion para verificar se tivemos sucesso ou falha
            expect(valorAtual).to.equal(somaEsperadaAbsoluta); // Compara o valor lido com o esperado
        });
    });

    //Caso de Teste 08: Somatório do Card de Total
    it('Somatório do Card de Total', () => {
        // Variáveis armazenando os valores de entrada e o esperado
        const entrada1 = 170.50;
        const entrada2 = 100.20;
        const saida = -270.30;
        const totalEsperado = entrada1 + entrada2 + saida;

        //Preenchendo o Formulario de Transacao utilizando a function definida
        criarTrasacao("Refatoração da Aplicação XPTO", entrada1, "2023-10-23");
        criarTrasacao ("Terceirizando o serviço de Backend", entrada2, "2023-10-23");
        criarTrasacao("Pagamento da Infraestrutura", saida, "2023-10-21");

        // O seletor #totalDisplay é o valor total
        cy.get('#totalDisplay')
        .invoke('text') // Pega o texto do elemento
        .then(text => { 
            const textoLimpo = text.trim()              // Adapta o texto para testarmos
                                    .replace('-', '')   // Remove o sinal de menos, se tiver
                                    .replace('R$', '')  // Remove o "R$"
                                    .replace('.', '')   // Remove o ponto de milhar
                                    .replace(',', '.'); // Troca a vírgula por ponto

            // converte o texto limpo para float e atribui a variável
            const valorAtual = parseFloat(textoLimpo);

            // Assertion para verificar se tivemos sucesso ou falha
            expect(valorAtual).to.be.closeTo(totalEsperado, 0.001); // Compara o valor lido com o esperado, 
                                                                    // usando closeTo devido ao float
        });
    });

    //Caso de Teste 09: Cadastrar Nova Transação com Valores Nulos
    it('Cadastrar Nova Transação com Valores Nulos', () => {
        // Acessa o Formulário de Nova Transação
        cy.contains("Nova Transação").click();
        
        // Tenta salvar sem inserir valores nos campos
        cy.contains('button', 'Salvar').click();
        
        // Assertion para verificar se tivemos sucesso ou falha
        cy.get('tbody tr')         // Acessa as linhas da tabela 
        .should('have.length', 0); // Verifica se a tabela de transações tem 0 linhas (Não há transações salvas)
    });
});

// Método para Cadastrar novas Transações
function criarTrasacao(descricao, valor, data_transacao) {
    //Selecionando a Opção para se Cadastrar Nova Transação Saída
    cy.contains("Nova Transação").click();

    //Inserindo o Conteúdo da Descrição
    cy.get('#description').type(descricao);

    //Inserindo o Conteúdo do Valor
    cy.get('#amount').type(valor);

    //Inserindo o Conteúdo da Data-> Máscara obrigatória: yyyy-mm-dd
    cy.get('#date').type(data_transacao);

    //Selecionando a opção para Salvar a Transação 
    cy.contains('button', 'Salvar').click();
}