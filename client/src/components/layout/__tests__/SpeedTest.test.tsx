import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import MainMenu from "../SpeedTest";

const mockMainMenu = () => {
  render(
    <MemoryRouter>
      <MainMenu />
    </MemoryRouter>,
  );
};

beforeEach(() => {
  mockMainMenu();
});

describe("renders all menu elements", () => {
  it("renders 5 inputs on start menu for minute selection", () => {
    const inputElements = screen.getAllByRole("radio");
    expect(inputElements).toHaveLength(5);
  });

  it("renders difficulty setting icon", async () => {
    const iconElement = await screen.findByTitle(/Difficulty settings/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("renders a start button", () => {
    const btnElement = screen.getByRole("button");
    expect(btnElement).toBeInTheDocument();
  });
  
  it("should have first radio button checked by default", () => {
    const checkboxElements = screen.getAllByRole("radio");
    expect((checkboxElements[0] as HTMLInputElement).checked).toBe(true);
  });
});

describe("should not render", () => {
  it("renders should not render a text element that says start typing", () => {
    const textElement = screen.queryByText(/start typing/i);
    expect(textElement).not.toBeInTheDocument();
  });
});
