describe('onboarding-intro', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit(`http://localhost:8000/onboarding-intro`)
  })

  it('has focusable Create your profile button', () => {
    cy.get('.button.full').focus()
    cy.focused().should('have.text', 'Create your profile')
  })

  it('swiper no swiping', () => {
    cy.get('ul.slick-dots li:last-child').click()
    cy.get('h2').should('have.text', 'All under one roof')
  })
})
