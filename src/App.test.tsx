import { render, screen } from '@testing-library/react';
import App from './App';

describe("Basic application view", () => {

  it('should render an empty email input', () => {
    render(<App />);

    const emailElement = screen.getByRole("textbox", { name: /input-email/i });
    expect(emailElement).toHaveValue("")
  })

  it('should render an empty password input', () => {
    render(<App />);

    const passwordElement = screen.getByPlaceholderText(/new password/i);
    expect(passwordElement).toHaveValue("")
  })

  it('should render an empty confirm password input', () => {
    render(<App />);

    const confirmPasswordElement = screen.getByPlaceholderText(/confirm password/i);
    expect(confirmPasswordElement).toHaveValue("")
  })

  it('should render a submit button', () => {
    render(<App />);

    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();
  })
})