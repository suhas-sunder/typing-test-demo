import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import TypingStats from "../TypingStats";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

const mockTypingStats = (props) => {
  vi.useFakeTimers();

  // Mock the hooks
  vi.mock("../../hooks/useTestTimer", () => ({
    default: vi.fn(() => ({
      seconds: 60,
      setSeconds: vi.fn(),
      displayTimer: { min: "01", sec: "00" },
      setDisplayTimer: vi.fn(),
      endTest: vi.fn(),
    })),
  }));

  vi.mock("../../hooks/useTestStats", () => ({
    default: vi.fn(() => ({})),
  }));

  vi.mock("../../hooks/useTrackStats", () => ({
    default: vi.fn(() => ({
      testStats: { correct: 0, mistakes: 0, wpm: 0, cpm: 0, accuracy: 0 },
      setTestStats: vi.fn(),
      seconds: 60,
      setSeconds: vi.fn(),
      displayTimer: { min: "01", sec: "00" },
      setDisplayTimer: vi.fn(),
    })),
  }));

  vi.mock("../../hooks/useMenu", () => ({
    default: vi.fn(() => ({
      difficultySettings: { medium: { scoreBonus: 0 } },
      currentDifficulty: "medium",
    })),
  }));

  render(
    <MemoryRouter>
      <TypingStats {...props} />
    </MemoryRouter>,
  );
};

describe("renders all stat elements with correct default value", () => {
  beforeEach(() => {
    const props = {
      startTimer: true,
      countdownTime: 60,
      accurateKeys: { a: 0, b: 0 },
      troubledKeys: { c: 0, d: 0 },
      firstInputDetected: true,
      showGameOverMenu: false,
      charIsValid: new Array(100).fill(""),
      difficulty: "easy",
      setShowGameOverMenu: vi.fn(),
      handleRestart: vi.fn(),
      showMainMenu: vi.fn(),
      endTest: vi.fn(),
      testName: "Speed Test",
      testLength: 100,
    };
    mockTypingStats(props);
  });

  it("should correctly calculate and display WPM during the test", () => {
    const listElement = screen.getByText(/wpm/i);
    expect(listElement).toBeInTheDocument();
  });

  it("should correctly calculate and display CPM during the test", () => {
    const listElement = screen.getByText(/cpm/i);
    expect(listElement).toBeInTheDocument();
  });

  it("should correctly calculate and display accuracy during the test", () => {
    const listElement = screen.getByText(/%/i);
    expect(listElement).toBeInTheDocument();
  });

  it("should display timer set to 1 minute", async () => {
    const listElement = screen.getByText(/01/i);
    expect(listElement).toBeInTheDocument();
  });

  it("should count down from 1 minute", () => {
    const minElement = screen.getByText("01");
    expect(minElement).toBeInTheDocument();

    // Simulate time passing
    act(() => {
      vi.advanceTimersByTime(1000); // advance by 1 second
    });

    const updatedElement = screen.getByText("59");
    expect(updatedElement).toBeInTheDocument();
  });

  //   it("renders WPM stat", () => {
  //     const statsElement = screen.getByText(/WPM/);
  //     expect(statsElement).toBeInTheDocument();
  //     expect(statsElement).toHaveTextContent(/WPM 0/);
  //   });

  //   it("renders CPM stat", () => {
  //     const statsElement = screen.getByText(/CPM/);
  //     expect(statsElement).toBeInTheDocument();
  //     expect(statsElement).toHaveTextContent(/CPM 0/);
  //   });

  //   it("renders accuracy stat", () => {
  //     const statsElement = screen.getByText(/🎯/);
  //     expect(statsElement).toBeInTheDocument();
  //     expect(statsElement).toHaveTextContent(/🎯 0%/);
  //   });

  //   it("renders timer stat", () => {
  //     const statsElement = screen.getByText(/⏰/);
  //     expect(statsElement).toBeInTheDocument();
  //     expect(statsElement).toHaveTextContent(/⏰ 1:00/);
  //   });
  // });

  // describe("should not render", () => {
  //   const showGameOverMenu = false;
  //   const charStats = [""];
  //   beforeEach(() => {
  //     render(
  //       <TypingStats
  //         {...props}
  //         charStats={charStats}
  //         showGameOverMenu={showGameOverMenu}
  //       />,
  //     );
  //   });

  //   it("renders should not render game over menu", () => {
  //     const divElement = screen.queryByTestId(/game-over-menu/);
  //     expect(divElement).not.toBeInTheDocument();
  //   });
  // });

  // describe("correct stats values are displayed", () => {
  //   const showGameOverMenu = false;
  //   it("should update WPM if correct chars are present", () => {
  //     const charStats = ["correct", "wrong", "correct"];
  //     render(
  //       <TypingStats
  //         {...props}
  //         charStats={charStats}
  //         showGameOverMenu={showGameOverMenu}
  //       />,
  //     );
  //     const statsElement = screen.getByText(/WPM/i);
  //     expect(statsElement).toHaveTextContent(/WPM 24/i);
  //   });

  //   it("should not update WPM if only incorrect chars are present", () => {
  //     const charStats = ["wrong", "wrong", "wrong"];
  //     render(
  //       <TypingStats
  //         {...props}
  //         charStats={charStats}
  //         showGameOverMenu={showGameOverMenu}
  //       />,
  //     );
  //     const statsElement = screen.getByText(/WPM/i);
  //     expect(statsElement).toHaveTextContent(/WPM 0/i);
  //   });

  //   it("should update CPM if correct chars are present", () => {
  //     const charStats = ["correct", "wrong", "correct"];
  //     render(
  //       <TypingStats
  //         {...props}
  //         charStats={charStats}
  //         showGameOverMenu={showGameOverMenu}
  //       />,
  //     );
  //     const statsElement = screen.getByText(/CPM/i);
  //     expect(statsElement).toHaveTextContent(/CPM 120/i);
  //   });

  //   it("should update accuracy if correct chars are present", () => {
  //     const charStats = ["correct", "wrong", "correct"];
  //     render(
  //       <TypingStats
  //         {...props}
  //         charStats={charStats}
  //         showGameOverMenu={showGameOverMenu}
  //       />,
  //     );
  //     const statsElement = screen.getByText(/🎯/i);
  //     expect(statsElement).toHaveTextContent(/🎯 100%/i);
  //   });
  // });

  // describe("renders game over menu elements", () => {
  //   const showGameOverMenu = true;
  //   const charStats = [""];
  //   beforeEach(() => {
  //     render(
  //       <TypingStats
  //         {...props}
  //         charStats={charStats}
  //         showGameOverMenu={showGameOverMenu}
  //       />,
  //     );
  //   });

  //   it("renders should render game over menu", () => {
  //     const divElement = screen.getByTestId(/game-over-menu/);
  //     expect(divElement).toBeInTheDocument();
  //   });

  //   it("should render game over header", () => {
  //     const headerElement = screen.getByRole("heading");
  //     expect(headerElement).toBeInTheDocument();
  //     expect(headerElement).toHaveTextContent(/Congratulations on/i);
  //   });

  //   it("should render char mistake stat", () => {
  //     const textElement = screen.getByText(/Chars Misspelled:/i);
  //     expect(textElement).toBeInTheDocument();
  //   });

  //   it("should render word mistake stat", () => {
  //     const textElement = screen.getByText(/Words Misspelled:/i);
  //     expect(textElement).toBeInTheDocument();
  //   });

  //   it("should render correct chars stat", () => {
  //     const textElement = screen.getByText(/Correct Chars:/i);
  //     expect(textElement).toBeInTheDocument();
  //   });

  //   it("should render correct words stat", () => {
  //     const textElement = screen.getByText(/Correct words:/i);
  //     expect(textElement).toBeInTheDocument();
  //   });

  //   it("should render total chars stat", () => {
  //     const textElement = screen.getByText(/Total Chars:/i);
  //     expect(textElement).toBeInTheDocument();
  //   });

  //   it("should render total words stats", () => {
  //     const textElement = screen.getByText(/Total Words:/i);
  //     expect(textElement).toBeInTheDocument();
  //   });

  //   it("should render performance summary", () => {
  //     const textElement = screen.getByText(/performance:/i);
  //     expect(textElement).toBeInTheDocument();
  //   });

  //   it("should render score", () => {
  //     const textElement = screen.getByText(/score:/i);
  //     expect(textElement).toBeInTheDocument();
  //   });

  //   it("should render best score and performance stats", () => {
  //     const textElements = screen.getAllByText(/best:/i);
  //     expect(textElements).toHaveLength(2);
  //   });

  //   it("should render 17 icons", () => {
  //     const iconElements = screen.getAllByTitle(/icon/i);
  //     expect(iconElements).toHaveLength(17);
  //   });

  //   it("should render two buttons", () => {
  //     const buttonElements = screen.getAllByRole("button");
  //     expect(buttonElements).toHaveLength(2);
  //   });

  //   it("should render try again button", () => {
  //     const buttonElement = screen.getByRole("button", { name: /try again/i });
  //     expect(buttonElement).toBeInTheDocument();
  //   });

  //   it("should render main menu button", () => {
  //     const buttonElement = screen.getByRole("button", { name: /main menu/i });
  //     expect(buttonElement).toBeInTheDocument();
  //   });
  // });

  // describe("game over menu element attributes", () => {
  //   const showGameOverMenu = true;
  //   const charStats = [""];
  //   beforeEach(() => {
  //     render(
  //       <TypingStats
  //         {...props}
  //         charStats={charStats}
  //         showGameOverMenu={showGameOverMenu}
  //       />,
  //     );
  //   });

  //   it("should render two buttons with correct attributes", () => {
  //     const buttonElements = screen.getAllByRole("button");
  //     buttonElements.forEach((button) => {
  //       expect(button).toHaveAttribute("type", "button");
  //     });
  //   });
  // });

  // describe("game over menu user events", () => {
  //   const showGameOverMenu = true;
  //   const charStats = [""];
  //   beforeEach(() => {
  //     render(
  //       <TypingStats
  //         {...props}
  //         charStats={charStats}
  //         showGameOverMenu={showGameOverMenu}
  //       />,
  //     );
  //   });

  //   it("should call restart function when try again btn is clicked", async () => {
  //     const buttonElement = screen.getByRole("button", { name: /try again/i });

  //     await fireEvent.click(buttonElement);

  //     expect(handleRestart).toBeCalled();
  //   });

  //   it("should call show menu function when main menu btn is clicked", async () => {
  //     const buttonElement = screen.getByRole("button", { name: /main menu/i });

  //     await fireEvent.click(buttonElement);

  //     expect(showMainMenu).toBeCalled();
  //   });
});
