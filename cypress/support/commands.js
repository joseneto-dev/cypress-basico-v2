Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(nome){
        cy.get('#firstName').type(nome)
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('josepandia42@gmail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()
})