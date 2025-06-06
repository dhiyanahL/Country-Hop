import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("RegisterForm", () => {
  test("renders register button", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
    const button = screen.getByTestId("register-button");
    expect(button).toBeInTheDocument();
  });

  test("submits form and makes axios post request", async () => {
    // Mock axios post to resolve successfully
    axios.post.mockResolvedValueOnce({ data: { message: "Registered successfully" } });

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    // Fill username
    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "dhiyanah" },
    });

    // Fill password
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "secret123" },
    });

    // Click register button
    fireEvent.click(screen.getByTestId("register-button"));

    // Wait for axios.post to be called
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith("https://40972122-e0d5-412f-82c6-143e48c86c58-dev.e1-us-east-azure.choreoapis.dev/country-hop-backend/country-hop-backend/v1.0/api/auth/register", {
        username: "dhiyanah",
        password: "secret123",
      });
    });
  });
});
