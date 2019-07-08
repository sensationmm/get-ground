describe('create-account', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit(`http://localhost:8000/onboarding/create-account`)
  })

  it('email verification ', () => {
    cy.get('#email').type('bogus')
    cy.get('#password').focus()
    cy.get('[data-test="text-input-error"]').contains('Invalid email')
    cy.get('#email').type('fakeemail@fakeemail.co.uk')
    cy.get('[data-test="text-input-error"]').not.exist
  })

  it('password strength ', () => {
    cy.get('#password').type('password')
    cy.get('[data-test="component-note"]').contains('Password strength: Weak')
    cy.get('#password').type('password123!')
    cy.get('[data-test="component-note"]').contains('Password strength: Fair')
    cy.get('#password').type('password123965!!!!!')
    cy.get('[data-test="component-note"]').contains('Password strength: Strong')
  })

  it('matching password ', () => {
    cy.get('#email').type('fakeemail@fakeemail.co.uk')
    cy.get('#password').type('password123965!!!!!')
    cy.get('#passwordConfirm').type('password1111')
    cy.get('[data-test="component-checkbox-toggle"]').click({multiple: true})
    cy.get('.button.primary.full').click()
    cy.get('[data-test="component-error-box"]').contains('Please correct all errors to proceed')
    cy.get('#passwordConfirm').clear()
    cy.get('#passwordConfirm').type('password123965!!!!!')
    cy.get('.button.primary.full').click()
    cy.get('[data-test="component-error-box"]').not.exist
  })

  it('Email already exists ', () => {
    cy.get('#email').type('fakeemail@fakeemail.co.uk')
    cy.get('#password').type('password123965!!!!!')
    cy.get('#passwordConfirm').type('password123965!!!!!')
    cy.get('[data-test="component-checkbox-toggle"]').click({multiple: true})
    cy.get('.button.primary.full').click()
    cy.get('.error-box').contains('Email address already exists')
  })
})
