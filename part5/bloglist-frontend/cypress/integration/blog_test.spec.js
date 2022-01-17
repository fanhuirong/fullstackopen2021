

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  // step 5.17
  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('username')
    cy.contains('password')
  })
})