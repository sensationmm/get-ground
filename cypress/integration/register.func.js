describe('onboarding-intro', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit(`http://localhost:8000/onboarding/intro`)
  })

  it('slider', () => {
   cy.get('h2').contains('Get started')
   cy.get('li').eq(1).click()
   cy.get('h2').contains('Save money')
   cy.get('li').eq(2).click()
   cy.get('h2').contains('Save time')
   cy.get('li').eq(3).click()
   cy.get('h2').contains('All in one place')
  })
})
