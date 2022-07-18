describe('Email and password error flow', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  it("should show email error to user", async () => {
    cy.findByRole("textbox", { name: /input-email/i }).type('test@gmail');
    cy.findByRole("password-input").type('12345');
    cy.findByRole(/confirm-password-input/i).type('123');

    cy.findByRole("button", { name: /submit/i }).click();
    await new Promise(res => setTimeout(res, 3000));
  })

  it("should show password error to user if email is validated but passwords don't macth", async () => {
    cy.findByRole("textbox", { name: /input-email/i }).type('test@gmail.com');
    cy.findByRole("password-input").type('12345');
    cy.findByRole(/confirm-password-input/i).type('123');

    cy.findByRole("button", { name: /submit/i }).click();
    await new Promise(res => setTimeout(res, 3000));
  })
})

describe('User may correct his input mistakes and errors warnings should disapear', () => {

  it("should show email error to user and then password error when email is ok", async () => {
    cy.visit('http://localhost:3000/');

    cy.findByRole("textbox", { name: /input-email/i }).type('test@gmail');
    cy.findByRole("password-input").type('12345');
    cy.findByRole(/confirm-password-input/i).type('123');

    cy.findByRole("button", { name: /submit/i }).click();

    cy.findByRole("textbox", { name: /input-email/i }).type('.com');
    await new Promise(res => setTimeout(res, 3000));
  })

  it("should not show any errors to user when passwords matches", () => {
    cy.findByRole(/confirm-password-input/i).type('45');
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