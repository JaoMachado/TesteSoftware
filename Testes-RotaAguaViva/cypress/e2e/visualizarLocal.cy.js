describe('UC03: Realizar Login', () => {
  beforeEach(() => {
        // Definindo a Página a ser Testada
        cy.visit("http://localhost:8080/RotaAguaViva/")
    });

  it('ESW25-35: Visualizar Local Com Sucesso', () => {

    //Fazendo Login para add novo local
    cy.visit('http://localhost:8080/RotaAguaViva/JSPs/login.jsp');

    // Localizar o campo de E-mail e digitar a entrada (joao@email.com)
    cy.get('#email').type('joao@email.com');

    // Localizar o campo de Senha e digitar 'Senha@123'
    cy.get('#senha').type('Senha@123');

    // Localizar o botão de Login e clicar
    cy.get('button[type="submit"]').click();

    // Criando um novo local que apareça direto no mapa
    cy.get('.btn-cadastrar').click();

    cy.get('#nome').type('Parque Praia do Sol');
    cy.get('#longitude').type(-46.70992405395682);
    cy.get('#latitude').type(-23.693000013820726);
    cy.contains('button', 'Cadastrar').click();

    cy.visit('http://localhost:8080/RotaAguaViva/');

    // Clicando no ícone do local
    cy.get('#map div.leaflet-marker-pane img:nth-child(19)').click({force: true});

    // Verificando se as informações do local foram exibidas
    cy.contains('button', 'Adicionar Avaliação').should('be.visible');

  });

  it('ESW25-41: Botão “Avaliar” Não Autenticado', () => {

    // Clicando no ícone do local
    cy.get('#map div.leaflet-marker-pane img:nth-child(19)').click({force: true});

    // Verificando se as informações do local foram exibidas
    cy.contains('button', 'Adicionar Avaliação').should('not.exist');

  });

  it('ESW25-44: Botão “Avaliar” Autenticado', () => {

    //Fazendo Login para add novo local
    cy.visit('http://localhost:8080/RotaAguaViva/JSPs/login.jsp');

    // Localizar o campo de E-mail e digitar a entrada (joao@email.com)
    cy.get('#email').type('joao@email.com');

    // Localizar o campo de Senha e digitar 'Senha@123'
    cy.get('#senha').type('Senha@123');

    // Localizar o botão de Login e clicar
    cy.get('button[type="submit"]').click();

    // Clicando no ícone do local
    cy.get('#map div.leaflet-marker-pane img:nth-child(19)').click({force: true});

    // Clicando para adicionar avaliação
    cy.get('.btn-avaliar').click();

    // Verificando se encaminhou para página de cadastrar avaliação
    cy.url().should('include', '/cadastro-avaliacao.jsp');
  });

  it('ESW25-46: Botão "+" Não Autenticado', () => {

    // Verificando se o usuário não autenticado consegue clicar para cadastrar novo local
    cy.contains('button', 'Cadastrar novo local').should('not.exist');

  });

  it('ESW25-44: Botão “Avaliar” Autenticado', () => {

    //Fazendo Login
    cy.visit('http://localhost:8080/RotaAguaViva/JSPs/login.jsp');

    // Localizar o campo de E-mail e digitar a entrada (joao@email.com)
    cy.get('#email').type('joao@email.com');

    // Localizar o campo de Senha e digitar 'Senha@123'
    cy.get('#senha').type('Senha@123');

    // Localizar o botão de Login e clicar
    cy.get('button[type="submit"]').click();

    // Clicando para adicionar avaliação
    cy.get('.btn-cadastrar').click();

    // Verificando se encaminhou para página de cadastrar avaliação
    cy.url().should('include', '/cadastro-local.jsp');

  });

});

