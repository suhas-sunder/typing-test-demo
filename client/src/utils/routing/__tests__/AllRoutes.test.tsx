import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AllRoutes from "../AllRoutes";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

const mockAllRoutes = (url) => {
  render(
    <MemoryRouter initialEntries={[url]}>
      <AllRoutes isAuthenticated={true} from={url} handleAuth={() => {}} />
    </MemoryRouter>,
  );
};

//Refer to the test in app.tsx for proper routing tests
describe("handles routing correctly", () => {
  it("should render Home component at root path", async () => {
    mockAllRoutes({ url: "/" });
    const textElement = await screen.findByText(/Fully Customizable/i);
    expect(textElement).toBeInTheDocument();
  });
});
