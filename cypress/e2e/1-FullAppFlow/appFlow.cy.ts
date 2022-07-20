/// <reference types="Cypress" />

describe('Email and password error flow', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it("should show email error to user", () => {
    const submitButton = cy.findByRole("button", { name: /submit/i });

    submitButton.should("be.disabled");
    cy.findByRole("note", { name: /error-warning/i }).should('not.exist');

    cy.findByRole("textbox", { name: /input-email/i }).type('test@gmail');
    cy.findByRole("password-input").type('12345');
    cy.findByRole(/confirm-password-input/i).type('123');

    submitButton.should("not.be.disabled");
    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByRole("note", { name: /error-warning/i })
      .should('be.visible')
      .and('contain.text', 'Invalid email');
  })

  it("should show password error to user if email is validated but passwords don't macth", () => {
    cy.findByRole("textbox", { name: /input-email/i }).type('test@gmail.com');
    cy.findByRole("password-input").type('12345');
    cy.findByRole(/confirm-password-input/i).type('123');

    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByRole("note", { name: /error-warning/i })
      .should('be.visible')
      .and('contain.text', "Passwords don't match");
  })
})

describe('User may correct his input mistakes and errors warnings should disapear', () => {

  it("should show email error to user and then password error when email is ok", () => {
    cy.visit('http://localhost:3000/');

    cy.findByRole("note", { name: /error-warning/i }).should('not.exist');
    cy.findByRole("textbox", { name: /input-email/i }).type('test@gmail');
    cy.findByRole("password-input").type('12345');
    cy.findByRole(/confirm-password-input/i).type('123');

    cy.findByRole("button", { name: /submit/i }).click();
    cy.findByRole("note", { name: /error-warning/i })
      .should('be.visible')
      .and('contain.text', "Invalid email");

    cy.findByRole("textbox", { name: /input-email/i }).type('.com');
    cy.findByRole("note", { name: /error-warning/i })
      .should('be.visible')
      .and('contain.text', "Passwords don't match");
  })

  it("should not show any errors to user when passwords matches", () => {
    cy.findByRole(/confirm-password-input/i).type('45');
    cy.findByRole("note", { name: /error-warning/i }).should('not.exist');
  })
})

describe('Application full flow', () => {

  it("User should be able to pass the flow with no errors", () => {
    cy.visit('http://localhost:3000/');

    cy.findByText("Seller").click();
    cy.findByRole("textbox", { name: /input-email/i }).type('test@gmail.com');
    cy.findByRole("password-input").type('12345');
    cy.findByRole(/confirm-password-input/i).type('12345');

    cy.findByRole("button", { name: /submit/i }).click();
  })
})