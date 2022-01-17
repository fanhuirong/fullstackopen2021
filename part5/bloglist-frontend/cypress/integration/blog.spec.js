
describe('Blog app', function() {
  const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
  }
  // 在每个测试之前，将共享部分分隔为beforeEach 块运行
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })


  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-btn').click()
      cy.contains(`${user.name}`)
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('cypress')
      cy.get('#likes').type('100')
      cy.contains('add').click()
      cy.contains('a blog created by cypress')
    })
  });

  it.only('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type(user.username)
    cy.get('#password').type('wrong')
    cy.get('#login-btn').click()

    cy.contains('Wrong credentials')
  })
  
})