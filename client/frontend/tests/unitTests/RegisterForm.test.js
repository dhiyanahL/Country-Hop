import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "./RegisterForm";

test("renders register button", () => {
  render(<RegisterForm onRegister={() => {}} />);
  const button = screen.getByTestId("register-button");
  expect(button).toBeInTheDocument();
});

test("calls onRegister with username and password when submitted", () => {
  const mockRegister = jest.fn();
  render(<RegisterForm onRegister={mockRegister} />);

  fireEvent.change(screen.getByTestId("username-input"), {
    target: { value: "dhiyanah" },
  });
  fireEvent.change(screen.getByTestId("password-input"), {
    target: { value: "secret123" },
  });

  fireEvent.click(screen.getByTestId("register-button"));

  expect(mockRegister).toHaveBeenCalledTimes(1);
  expect(mockRegister).toHaveBeenCalledWith("dhiyanah", "secret123");
});
