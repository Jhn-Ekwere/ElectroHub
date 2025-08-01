describe('registration spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/auth/login')
  }
  )
  it('invalid input', () => {

    cy.get('input[name="email"]').type(' ')
    cy.get('input[name="password"]').type(' ')
    cy.get('button[type="submit"]').click()
    cy.get('[data-error=email]').should('be.visible')
    cy.get('[data-error=password]').should('be.visible')
  })
  it('valid input', () => {
    cy.get('input[name="email"]').type('bravo@gmail.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/auth/login')
})