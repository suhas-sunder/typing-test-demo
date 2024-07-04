import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import HeaderDashboard from "../HeaderDashboard";
import { MemoryRouter } from "react-router-dom";

const mockHeaderDashboard = () => {
  render(
    <MemoryRouter>
      <HeaderDashboard />
    </MemoryRouter>,
  );
};

beforeEach(() => mockHeaderDashboard());

describe("renders all header elements", () => {
  it("renders header", () => {
    const headerElement = screen.getByRole("heading", {
      name: /My Weekly Summary/i,
    });
    expect(headerElement).toBeInTheDocument();
  });
});
