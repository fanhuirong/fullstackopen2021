

describe('Blog app', function() {
  const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
  }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // step 5.18 create here a user to backend
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  // step 5.17
  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('username')
    cy.contains('password')
  })

  // step 5.18
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-btn').click()
      cy.contains(`${user.name}`)
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()
      cy.contains('Wrong credentials')
    })
  })

  // step 5.19
  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-btn').click()
      cy.contains(`${user.name}`)
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('cypress')
      cy.get('#likes').type('100')
      cy.contains('add').click()
      cy.contains('a blog created by cypress')
    })
  })
})