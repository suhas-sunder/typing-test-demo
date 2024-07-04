import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import mockAllAPI from "../mocks/api/mockAllAPI";

mockAllAPI(); //Mocks all api with no custom mock response

const mockApp = ({ url, handleAuth }) => {
  render(
    <MemoryRouter initialEntries={[url]}>
      <HelmetProvider>
        <AuthContext.Provider
          value={{
            isAuthenticated: handleAuth,
            setIsAuthenticated: vi.fn(),
            setUserId: vi.fn(),
            userId: "test id",
            setUserName: vi.fn(),
            setEmail: vi.fn(),
            userName: "test name",
            email: "email@test.com",
          }}
        >
          <App />,
        </AuthContext.Provider>
      </HelmetProvider>
    </MemoryRouter>,
  );
};

describe("renders all page elements", () => {
  beforeEach(() => {
    mockApp({ url: "/", handleAuth: false });
  });

  it("should render home page", async () => {
    const linkElement = await screen.findByTestId("home-pg");
    expect(linkElement).toBeInTheDocument();
  });

  it("should render at least one image", async () => {
    const imgElements = await screen.findAllByRole("img");
    expect(imgElements.length).toBeGreaterThan(0);
  });

  it("should render at least one complete logo", async () => {
    const svgElements = await screen.findAllByTestId(/logo-name/i);
    const svgElement2 = await screen.findAllByTestId(/logo-com/i);
    expect(svgElements.length).toBeGreaterThan(0);
    expect(svgElement2.length).toBeGreaterThan(0);
  });

  it("should render footer component with copyright info", async () => {
    const footerElement = await screen.findByText(/2023/i);
    expect(footerElement).toBeInTheDocument();
  });
});

describe("handles routing correctly", () => {
  it("should render Home component at root path", async () => {
    mockApp({ url: "/", handleAuth: false });
    const textElement = await screen.findByText(/Fully Customizable/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Lessons component at root path with beginner menu", async () => {
    mockApp({ url: "/lessons/beginner", handleAuth: false });
    const textElement = await screen.findByText(/home row left hand/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Lessons component at root path with intermediate menu", async () => {
    mockApp({ url: "/lessons/intermediate", handleAuth: false });
    const textElement = await screen.findByText(/bottom row left hand/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Lessons component at root path with advanced menu", async () => {
    mockApp({ url: "/lessons/advanced", handleAuth: false });
    const textElement = await screen.findByText(/tricky words/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Lessons component at root path with graduation menu", async () => {
    mockApp({ url: "/lessons/graduation", handleAuth: false });
    const textElement = await screen.findByText(/you made it/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Lessons component at root path with animal facts menu", async () => {
    mockApp({ url: "/lessons/animal-facts", handleAuth: false });
    const textElement = await screen.findByText(/Armadillo/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Lessons component at root path with animal facts menu", async () => {
    mockApp({ url: "/lessons/animal-facts", handleAuth: false });
    const textElement = await screen.findByText(/armadillo/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Games component at root path", async () => {
    mockApp({ url: "/games", handleAuth: false });
    const textElement = await screen.findByText(/typing games/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Learn component at root path", async () => {
    mockApp({ url: "/learn", handleAuth: false });
    const textElement = await screen.findByText(/learn about typing/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Login component at root path", async () => {
    mockApp({ url: "/login", handleAuth: false });
    const textElement = await screen.findByText(/Log in/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render Register component at root path", async () => {
    mockApp({ url: "/register", handleAuth: false });
    const textElement = await screen.findByText(/create a free account/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should load sitemap page", async () => {
    mockApp({ url: "/sitemap", handleAuth: false });
    const textElement = await screen.findByText(/Pages/i);
    const textElement1 = await screen.findByText(/TOS & Privacy/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement1).toBeInTheDocument();
  });

  it("should load privacy policy page", async () => {
    mockApp({ url: "/privacypolicy", handleAuth: false });
    const textElement = await screen.findByText(/SUMMARY OF KEY POINTS/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should load cookies policy page", async () => {
    mockApp({ url: "/cookiespolicy", handleAuth: false });
    const textElement = await screen.findByText(/What are cookies?/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should load tos page", async () => {
    mockApp({ url: "/termsofservice", handleAuth: false });
    const textElement = await screen.findByText(/1. OUR SERVICES/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should throw an error on unkown routes", async () => {
    mockApp({ url: "/randomroute", handleAuth: false });
    const textElement = await screen.findByText(/404 page not found/i);
    expect(textElement).toBeInTheDocument();
  });
});

describe("handles protected routes correctly", () => {
  it("should redirect protected Profile component at root path to Login page", async () => {
    mockApp({ url: "/profile", handleAuth: false });
    const textElement = await screen.findByText(/Log in/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should redirect protected Profile component at root path to Login page", async () => {
    mockApp({ url: "/profile/summary", handleAuth: false });
    const textElement = await screen.findByText(/Log in/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should redirect protected Profile component at root path to Login page", async () => {
    mockApp({ url: "/profile/stats", handleAuth: false });
    const textElement = await screen.findByText(/Log in/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should load protected Profile Summary component at root path when authenticated", async () => {
    mockApp({ url: "/profile/summary", handleAuth: true });
    const textElement = await screen.findByText(/Welcome/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should load protected Profile Stats component at root path when authenticated", async () => {
    mockApp({ url: "/profile/stats", handleAuth: true });
    const textElements = await screen.findAllByText(
      /All time best stats for Speed Test!/i,
    );
    expect(textElements.length).toBeGreaterThan(0);
  });

  it("should load protected Profile Image component at root path when authenticated", async () => {
    mockApp({ url: "/profile/stats", handleAuth: true });
    const textElements = await screen.findAllByText(
      /All time best stats for Speed Test!/i,
    );
    expect(textElements.length).toBeGreaterThan(0);
  });

  it("should load protected Profile Achievements component at root path when authenticated", async () => {
    mockApp({ url: "/profile/achievements", handleAuth: true });
    const textElement = await screen.findByText(/Achievements coming soon/i);
    expect(textElement).toBeInTheDocument();
  });
});

describe("handles all major lesson routes correctly", () => {
  it("should load Lesson 1 Sec 1 component at root path", async () => {
    mockApp({ url: "/lessons/lesson/1/sec-1/lvl-1", handleAuth: false });
    const textElement = await screen.findByRole("heading", {
      name: /Learning to type letters of the alphabet "a" & "s"/i,
    });
    expect(textElement).toBeInTheDocument();
  });

  it("should load Lesson 2 Sec 1 component at root path", async () => {
    mockApp({ url: "/lessons/lesson/2/sec-1/lvl-1", handleAuth: false });
    const textElement = await screen.findByRole("heading", {
      name: /Learning to Type: Bottom Row Left Hand - "zx"/i,
    });
    expect(textElement).toBeInTheDocument();
  });

  it("should load Lesson 3 Sec 1 component at root path", async () => {
    mockApp({ url: "/lessons/lesson/3/sec-1/lvl-1", handleAuth: false });
    const textElement = await screen.findByRole("heading", {
      name: /Mastering the Basics: Learning to Type the Number Row/i,
    });
    expect(textElement).toBeInTheDocument();
  });

  it("should load Lesson 4 Sec 1 component at root path", async () => {
    mockApp({ url: "/lessons/lesson/4/sec-1/lvl-1", handleAuth: false });
    const textElement = await screen.findByRole("heading", {
      name: /Congratulations on Completing Your Typing Journey!/i,
    });
    expect(textElement).toBeInTheDocument();
  });

  it("should load Lesson 5 Sec 1 component at root path", async () => {
    mockApp({ url: "/lessons/lesson/5/sec-1/lvl-1", handleAuth: false });
    const textElement = await screen.findByRole("heading", {
      name: /Here are some of the Inspirational quotes you will be typing!/i,
    });
    expect(textElement).toBeInTheDocument();
  });

  it("should load Lesson 6 Sec 1 component at root path", async () => {
    //Add this when I implment this section
  });
});

describe("renders all navigation elements correctly", () => {
  it("should render nav bar and footer when logged out", async () => {
    mockApp({ url: "/", handleAuth: false });
    const linkElements = await screen.findAllByRole("navigation");
    expect(linkElements.length).toBeGreaterThan(0);
  });

  it("should render nav bar and footer when logged in", async () => {
    mockApp({ url: "/", handleAuth: true });
    const linkElements = await screen.findAllByRole("navigation");
    expect(linkElements.length).toBeGreaterThan(0);
  });

  it("should render Lessons sidebar menu when not authenticated", async () => {
    mockApp({ url: "/lessons/beginner", handleAuth: false });
    const textElements = await screen.findAllByText(/beginner/i);
    const textElement1 = await screen.findByText(/intermediate/i);
    const textElement2 = await screen.findByText(/advanced/i);
    const textElement3 = await screen.findByText(/graduation/i);
    const textElement4 = await screen.findByText(/quotes/i);
    const textElement5 = await screen.findByText(/common words/i);
    expect(textElements.length).toBeGreaterThan(0);
    expect(textElement1).toBeInTheDocument();
    expect(textElement2).toBeInTheDocument();
    expect(textElement3).toBeInTheDocument();
    expect(textElement4).toBeInTheDocument();
    expect(textElement5).toBeInTheDocument();
  });

  it("should render Lessons sidebar menu when authenticated", async () => {
    mockApp({ url: "/lessons/beginner", handleAuth: true });
    const textElements = await screen.findAllByText(/beginner/i);
    const textElement1 = await screen.findByText(/intermediate/i);
    const textElement2 = await screen.findByText(/advanced/i);
    const textElement3 = await screen.findByText(/graduation/i);
    const textElement4 = await screen.findByText(/quotes/i);
    expect(textElements.length).toBeGreaterThan(0);
    expect(textElement1).toBeInTheDocument();
    expect(textElement2).toBeInTheDocument();
    expect(textElement3).toBeInTheDocument();
    expect(textElement4).toBeInTheDocument();
  });

  it("should load protected Profile sidebar menu component at root path when authenticated", async () => {
    mockApp({ url: "/profile/summary", handleAuth: true });
    const textElements = await screen.findAllByText(/profile/i);
    const textElements1 = await screen.findAllByText(/profile image/i);
    const textElements2 = await screen.findAllByText(/stats/i);
    const textElements3 = await screen.findAllByText(/achievements/i);

    const textElements4 = await screen.findAllByText(/themes/i);

    const textElements5 = await screen.findAllByText(/account settings/i);
    expect(textElements.length).toBeGreaterThan(0);
    expect(textElements1.length).toBeGreaterThan(0);
    expect(textElements2.length).toBeGreaterThan(0);
    expect(textElements3.length).toBeGreaterThan(0);
    expect(textElements4.length).toBeGreaterThan(0);
    expect(textElements5.length).toBeGreaterThan(0);
  });

  it("should not load protected Profile sidebar menu component at root path when not authenticated", async () => {
    mockApp({ url: "/profile/stats", handleAuth: false });
    const textElements = await screen.queryByText(/profile/i);
    const textElements1 = await screen.queryByText(/profile image/i);
    const textElements2 = await screen.queryByText(/stats/i);
    const textElements3 = await screen.queryByText(/achievements/i);
    const textElements4 = await screen.queryByText(/themes/i);
    const textElements5 = await screen.queryByText(/account settings/i);

    expect(textElements).not.toBeInTheDocument();
    expect(textElements1).not.toBeInTheDocument();
    expect(textElements2).not.toBeInTheDocument();
    expect(textElements3).not.toBeInTheDocument();
    expect(textElements4).not.toBeInTheDocument();
    expect(textElements5).not.toBeInTheDocument();
  });
});
