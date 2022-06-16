/// <reference types="cypress" />

context('Account', () => {

  beforeEach(() => {
    cy.visit('/account')
  })


  it('.type() - type amount', () => {
    cy.get('[data-cy=input-amount]')
      .type('5').should('have.value', '5')
  })

  it('.click() - deposit amount', () => {
    cy.get('[data-cy=input-amount]').type('5')
    cy.get('[data-cy=button-deposit]').click()

    cy.get('[data-cy=h2-amount]').should('have.text', '5')
  })

  it('.click() - deposit amount', () => {
    cy.get('[data-cy=input-amount]').type('5')
    cy.get('[data-cy=button-deposit]').click()

    cy.get('[data-cy=h2-amount]').should('have.text', '5')
  })

  it('.click() - deposit negative amount', () => {
    cy.get('[data-cy=input-amount]').type('-5')
    cy.get('[data-cy=button-deposit]').click()

    // cy.get('[data-cy=h2-amount]').should('have.text', '0')

    cy.get('[data-cy=span-error]').should('have.text', 'invalid deposit amount')
    cy.get('[data-cy=h2-amount]').should('have.text', '0')
  })
})
