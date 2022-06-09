it('testa a página da política de privavidade de forma independente', () => {
    cy.visit('https://academy-crud-frontend.herokuapp.com/users')
    cy.get('.sc-gsnTZi').click()
    cy.get('#name').type('Jogfffgfgfeeeee')
    cy.get('#email').type('jose111wwww11@una.com.br')
    cy.get('.sc-kDDrLX').click()

});