import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

interface InputParams {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const inputHelper = ({ email, password, confirmPassword }: InputParams) => {

    const emailElement = screen.getByRole("textbox", { name: /input-email/i });
    const passwordElement = screen.getByRole("password-input");
    const confirmPasswordElement = screen.getByRole(/confirm-password-input/i);

    if (email) {
        userEvent.type(emailElement, email);
    }
    if (password) {
        userEvent.type(passwordElement, password);
    }
    if (confirmPassword) {
        userEvent.type(confirmPasswordElement, confirmPassword);
    }
}

describe("Error handling", () => {

    it('should start with no errors', () => {
        render(<App />);

        const errorWarningElement = screen.queryByRole("paragraph", { name: /error-warning/i });
        expect(errorWarningElement).not.toBeInTheDocument();
    })

    it('should not enable button if email, password or confirm password is empty', () => {
        render(<App />);

        const buttonElement = screen.getByRole("button", { name: /submit/i });
        inputHelper({ email: "", password: "", confirmPassword: "" })

        expect(buttonElement).toBeDisabled();
    })

    it('should display email error message if email is not validated', () => {
        render(<App />);

        const buttonElement = screen.getByRole("button", { name: /submit/i });
        const errorWarningElement = screen.queryByRole("note", { name: /error-warning/i });

        expect(errorWarningElement).not.toBeInTheDocument();

        inputHelper({ email: "test@gmai", password: "123", confirmPassword: "123" });
        userEvent.click(buttonElement);

        const errorWarningElementAgain = screen.getByRole("note", { name: /error-warning/i });

        expect(errorWarningElementAgain.textContent).toBe("Invalid email");
    })

    it("should display password error message if passwords don't match.", () => {
        render(<App />);

        const buttonElement = screen.getByRole("button", { name: /submit/i });
        const errorWarningElement = screen.queryByRole("note", { name: /error-warning/i });

        expect(errorWarningElement).not.toBeInTheDocument();

        inputHelper({ email: "test@gmail.com", password: "12345", confirmPassword: "123" });
        userEvent.click(buttonElement);

        const errorWarningElementAgain = screen.getByRole("note", { name: /error-warning/i });

        expect(errorWarningElementAgain.textContent).toBe("Passwords don't match");
    })

    it("should remove email error message if email is validated and than remove password error if both matches.", () => {
        render(<App />);

        const buttonElement = screen.getByRole("button", { name: /submit/i });

        inputHelper({ email: "test@gmail", password: "12345", confirmPassword: "123" });
        userEvent.click(buttonElement);

        const errorWarningElement = screen.getByRole("note", { name: /error-warning/i });
        expect(errorWarningElement.textContent).toBe("Invalid email");

        inputHelper({ email: ".com" });
        expect(errorWarningElement.textContent).toBe("Passwords don't match");

        inputHelper({ confirmPassword: "12345" });
        expect(errorWarningElement).toBeInTheDocument();
    })
})