describe('landing-pages', () => {
  before(() => {
    cy.viewport(1920, 1080)
    cy.visit(`http://localhost:8000/`)
  })

  it('What we do', () => {
    cy.get('[data-test="component-header"]').should('have.length', 1)
    cy.get('.menu--list-item').first().click()
    cy.get('[data-test="whatWeDo-title"]').contains('What we do')
    cy.get('.trustAndPrivacy-title').contains('Trust and Privacy')
    cy.get('.trustAndPrivacy').scrollIntoView()
    cy.get('.button.primary.trustAndPrivacy-read-more').click()
    cy.get('.trustAndPrivacy-info-title').first().contains('You own and control your company')
  })

  it('Advantages', () => {
    cy.get('[data-test="component-header"]').should('have.length', 1)
    cy.get('.menu--list-item').eq(1).click()
    cy.get('h1').contains('GetGround Advantages')
    cy.get('.advantages-uk-tax').scrollIntoView()
    cy.get('.button.advantages-btn.primary.full').eq(0).click()
    cy.get('.table-slider-content').should('have.length', 1)
    cy.get('.advantages-company').scrollIntoView()
    cy.get('.button.advantages-btn.primary.full').eq(0).click()
    cy.get('.table-slider-content').should('have.length', 2)
  })

  it('How it works', () => {
    cy.get('[data-test="component-header"]').should('have.length', 1)
    cy.get('.menu--list-item').eq(2).click()
    cy.get('h1').contains('How it works')
    cy.get('.how-it-works-steps').should('have.length', 5)
    cy.get('.more-information-expanded-title').should('have.length', 0)
    cy.get('.button.full.primary.more-information-cta.full').click()
    cy.get('.more-information-expanded-title').contains('More information')
  })

  it('Pricing', () => {
    cy.get('[data-test="component-header"]').should('have.length', 1)
    cy.get('.menu--list-item').eq(3).click()
    cy.get('h1').contains('Pricing')
  })

  it('Home', () => {
    cy.get('[data-test="component-header"]').should('have.length', 1)
    cy.get('.header-logo').click()
    cy.get('h1').contains('GetGround for smarter property purchasing.')
  })
})
