describe('login spec', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5173/auth/login')
    }
    )
    it('invalid input', () => {

        cy.get('[data-cy="email"]').type(' ')
        cy.get('[data-cy="password"]').type(' ')
        cy.get('button[type="submit"]').click()
        cy.get('[data-error="email"]').should('exist')
        cy.get('[data-error="password"]').should('exist')
    })
    it.only('valid input', () => {
        cy.get('input[name="email"]').type('bravo@gmail.com')
        cy.get('input[name="password"]').type('12345')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', 'http://localhost:5173/')
    })
})