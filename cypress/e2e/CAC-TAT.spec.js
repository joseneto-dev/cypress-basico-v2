///<reference types="Cypress" / >
//Cypress._.times(5, () => {
describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function(){
        cy.visit('/src/index.html')
    })
    it('verifica o título da aplicação', function(){
        
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
       
    })
    Cypress._.times(5, () => {
    it('preenche os campos obrigatórios e envia o formulário',function(){
        const longText = 'testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste'
        cy.clock()
        cy.get('#firstName').type('Jose')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('josepandia42@gmail.com')
        cy.get('#open-text-area').invoke('val', longText)
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })
})
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.clock()
        cy.get('#firstName').type('Jose').clear()
        cy.get('#lastName').type('Duarte').clear()
        cy.get('#email').type('josepandia42.gmail.com').clear()
        cy.get('#open-text-area').type('text', {delay: 0 }).clear()
        cy.get('#phone').type('abc').should('have.value', '')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.clock()
        cy.get('#firstName').type('Jose')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('josepandia42@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Jose').should('have.value','Jose').clear().should('have.value', '')
        cy.get('#lastName').type('Duarte').should('have.value','Duarte').clear().should('have.value', '')
        cy.get('#email').type('josepandia42@gmail.com').should('have.value','josepandia42@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('3198549874').should('have.value','3198549874').clear().should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit('José')
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value','blog')
    })
    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })
    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]').check().should('be.checked')
        .last().uncheck().should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
        .then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json',{action:'drag-drop'})
        .then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile')
        .then(input=>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing')
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
    });
    it('preenche a area de texto usando o comando invoke', () => {
        const longText = 'testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste'
        cy.clock()
        cy.get('#firstName').type('Jose')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('josepandia42@gmail.com')
        cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })
    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
         const {status, statusText,body} = response   
         expect(status).to.equal(200)
         expect(statusText).to.equal('OK')
         expect(body).to.include('CAC TAT')
        })
    })
    it.only('Desafio do gato', () => {
     cy.get('#cat').invoke('show').should('be.visible')
    })
})
//})