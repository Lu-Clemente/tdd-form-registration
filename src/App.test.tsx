import { render, screen } from '@testing-library/react';
import App from './App';

describe("Basic application view", () => {

  it('should render an empity email input', () => {
    render(<App />);

    const emailElement = screen.getByRole("textbox", { name: /input-email/i });
    expect(emailElement).toHaveValue("")
  })

  it('should render an empity password input', () => {
    render(<App />);

    const passwordElement = screen.getByRole("textbox", { name: /input-password/i });
    expect(passwordElement).toHaveValue("")
  })

  it('should render an empity confirm password input', () => {
    render(<App />);

    const confirmPasswordElement = screen.getByRole("textbox", { name: /input-confirm-password/i });
    expect(confirmPasswordElement).toHaveValue("")
  })

  it('should render a submit button', () => {
    render(<App />);

    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();
  })
})