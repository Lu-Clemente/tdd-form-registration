import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe("Basic application view", () => {

  it('should render an empty email input', () => {
    render(<App />);

    const emailElement = screen.getByRole("textbox", { name: /input-email/i });
    expect(emailElement).toHaveValue("")
  })

  it('should render an empty password input', () => {
    render(<App />);

    const passwordElement = screen.getByRole("password-input");
    expect(passwordElement).toHaveValue("")
  })

  it('should render an empty confirm password input', () => {
    render(<App />);

    const confirmPasswordElement = screen.getByRole(/confirm-password-input/i);
    expect(confirmPasswordElement).toHaveValue("")
  })

  it('should render a submit button', () => {
    render(<App />);

    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();
  })
})

describe("Radio Button component", () => {
  it('should render the radio selection with "Consumer" selected as default', () => {
    render(<App />);

    const radioElement = screen.getAllByTestId("check-input");
    expect(radioElement[0]).toHaveTextContent(/consumer/i);
    expect(radioElement[0]).toHaveAttribute("data-checked");
  })

  it("should update radio's button from 'Consumer' to 'Staff'", () => {
    render(<App />);

    const radioElement = screen.getAllByTestId("check-input");
    expect(radioElement[0]).toHaveTextContent(/consumer/i);
    expect(radioElement[0]).toHaveAttribute("data-checked");

    userEvent.click(radioElement[2]);
    expect(radioElement[0]).not.toHaveAttribute("data-checked");
    expect(radioElement[2]).toHaveTextContent(/staff/i);
    expect(radioElement[2]).toHaveAttribute("data-checked");
    
  })
})