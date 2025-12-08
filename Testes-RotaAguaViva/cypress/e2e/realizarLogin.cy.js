describe('UC03: Realizar Login', () => {

  beforeEach(() => {
        // Definindo a Página a ser Testada
        cy.visit("http://localhost:8080/RotaAguaViva/JSPs/login.jsp")
    });

  it('ESW25-73: Login bem-sucedido', () => {

    // Localizar o campo de E-mail e digitar a entrada (joao@email.com)
    cy.get('#email').type('joao@email.com');

    // Localizar o campo de Senha e digitar 'Senha@123'
    cy.get('#senha').type('Senha@123');

    // Localizar o botão de Login e clicar
    cy.get('button[type="submit"]').click();

    // O usuário deve ser redirecionado para a página inicial
    cy.url().should('eq', 'http://localhost:8080/RotaAguaViva/index.jsp');
  });

  it('ESW25-76: E-mail inválido ou não cadastrado', () => {

    // A mensagem de erro esperada, baseada no novo design.
    const mensagemEsperada = 'E-mail ou senha inválidos. Tente novamente.';

    cy.on('window:alert', (text) => {
      alertText = text; // Captura o texto do alerta quando ele é disparado
      return true;      // Retorna 'true' para aceitar/fechar o alerta
    });

    // Localizar o campo de E-mail e digitar a entrada (joao@email.com)
    cy.get('#email').type('email_invalido@email.com');

    // Localizar o campo de Senha e digitar 'Senha@123'
    cy.get('#senha').type('Senha@123');

    // Localizar o botão de Login e clicar
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de erro (classe .error-message) aparece.
    cy.get('.error-message') .should('be.visible').and('contain', mensagemEsperada);
    
  });

  it('ESW25-82: Senha incorreta', () => {

    // A mensagem de erro esperada, baseada no novo design.
    const mensagemEsperada = 'E-mail ou senha inválidos. Tente novamente.';

    cy.on('window:alert', (text) => {
      alertText = text; // Captura o texto do alerta quando ele é disparado
      return true;      // Retorna 'true' para aceitar/fechar o alerta
    });

    // Localizar o campo de E-mail e digitar a entrada (joao@email.com)
    cy.get('#email').type('email_invalido@email.com');

    // Localizar o campo de Senha e digitar 'Senha@123'
    cy.get('#senha').type('SenhaErrada@123');

    // Localizar o botão de Login e clicar
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de erro (classe .error-message) aparece.
    cy.get('.error-message') .should('be.visible').and('contain', mensagemEsperada);
    
  });

  it('ESW25-86: Botão Voltar', () => {

    // Listener para capturar o texto do alert
    const mensagemEsperada = 'Usuário ou senha incorretos.';
    let alertText;

    cy.on('window:alert', (text) => {
      alertText = text; // Captura o texto do alerta quando ele é disparado
      return true;      // Retorna 'true' para aceitar/fechar o alerta
    });

    // Localizar o campo de E-mail e digitar a entrada (joao@email.com)
    cy.get('#email').type('email_invalido@email.com');

    // Localizar o campo de Senha e digitar 'Senha@123'
    cy.get('#senha').type('SenhaErrada@123');

    // Localizar o botão de Login e clicar
    cy.get('button[type="submit"]').click();

    // O usuário não deve ser redirecionado
    cy.url().should('include', '/login.html');

    // Verifica se a mensagem capturada é a esperada.
    cy.then(() => {
      expect(alertText).to.equal(mensagemEsperada);
    });

    // Clica no botão "Voltar" (o alert já foi fechado pelo listener)
    cy.contains('button', 'Voltar').click();

    // Verifica se houve redirecionamento para a tela inicial.
    cy.url().should('eq', 'http://localhost:8080/RotaAguaViva/index.jsp');
    
  });

  it('ESW25-92: Ir para Cadastro', () => {

    // Clica no link "Não tem uma conta? Cadastre-se"
    cy.contains('a', 'Não tem uma conta? Cadastre-se').click();

    // Verifica se a URL contém o caminho para a página de recuperação.
    cy.url().should('include', 'cadastrarUsuario');

  });

});

