describe('create-account', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit(`http://localhost:8000/onboarding/create-account`)
  })

  it('email verification ', () => {
    cy.get('#create-account-email').type('bogus')
    cy.get('#create-account-password').focus()
    cy.get('[data-test="text-input-error"]').contains('Invalid email address')
    cy.get('#create-account-email').type('fakeemail@fakeemail.co.uk')
    cy.get('[data-test="text-input-error"]').not.exist
  })

  it('password strength ', () => {
    cy.get('#create-account-password').type('password')
    cy.get('[data-test="component-note"]').contains('Password strength: Weak')
    cy.get('#create-account-password').type('password123!')
    cy.get('[data-test="component-note"]').contains('Password strength: Fair')
    cy.get('#create-account-password').type('password123965!!!!!')
    cy.get('[data-test="component-note"]').contains('Password strength: Strong')
  })

  it('matching password ', () => {
    cy.get('#create-account-email').type('fakeemail@fakeemail.co.uk')
    cy.get('#create-account-password').type('password123965!!!!!')
    cy.get('#create-account-passwordConfirm').type('password1111')
    cy.get('[data-test="component-checkbox-toggle"]').click({multiple: true})
    cy.get('.button.primary.full').click()
    cy.get('[data-test="component-error-box"]').contains('Please correct all errors to proceed')
    cy.get('#create-account-passwordConfirm').clear()
    cy.get('#create-account-passwordConfirm').type('password123965!!!!!')
    cy.get('.button.primary.full').click()
    cy.get('[data-test="component-error-box"]').not.exist
  })
})
