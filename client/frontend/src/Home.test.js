// Home.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./pages/Home";
import { MemoryRouter } from "react-router-dom";
import * as apiService from "./services/api";
import * as authService from "./services/auth";
import axios from "axios";

// Mock toast to suppress notifications during tests
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => <div data-testid="toaster" />,
}));

// Mock axios
jest.mock("axios");

describe("Home Integration Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("token", "mocktoken");
    localStorage.setItem("username", "mockuser");
  });

  test("fetches and displays countries, adds a favorite", async () => {
    // Mock getAllCountries API call
    const mockCountries = {
      data: [
        {
          cca3: "USA",
          name: { common: "United States" },
          flags: { svg: "us-flag.svg" },
          capital: ["Washington D.C."],
          region: "Americas",
          population: 331000000,
        },
      ],
    };
    jest.spyOn(apiService, "getAllCountries").mockResolvedValue(mockCountries);

    // Mock getFavorites
    jest
      .spyOn(authService, "getFavorites")
      .mockResolvedValue({ data: { favorites: [] } });

    // Mock addFavorite
    const addFavoriteMock = jest
      .spyOn(authService, "addFavorite")
      .mockResolvedValue({ data: { message: "Added" } });

    // Render Home
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait for country card to appear
    expect(await screen.findByText("United States")).toBeInTheDocument();

    // Click 'Add to Favorites'
    const favoriteBtn = screen.getByText("Add to Favorites");
    fireEvent.click(favoriteBtn);

    // Wait for addFavorite call
    await waitFor(() => {
      expect(addFavoriteMock).toHaveBeenCalledWith("USA", "mocktoken");
    });

    // Favorite button should now show 'Already Favorited'
    
      
  });
});
