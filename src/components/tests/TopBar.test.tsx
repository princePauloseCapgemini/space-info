import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import TopBar from "../TopBar";
import { BrowserRouter } from "react-router-dom";

const MockedTopBar = () => {
  return (
    <BrowserRouter>
      <TopBar />
    </BrowserRouter>
  );
};

describe("TopBar", () => {
  it("loads and displays topbar", async () => {
    render(<MockedTopBar />);
    expect(screen.getByTestId("home-nav")).toBeInTheDocument();
    expect(screen.getByTestId("ships-nav")).toBeInTheDocument();
    expect(screen.getByTestId("questions-nav")).toBeInTheDocument();
  });

  it("home navigation", () => {
    render(<MockedTopBar />);
    const homeButton = screen.getByTestId("home-nav");

    fireEvent.click(homeButton);
    expect(window.location.pathname).toBe("/");
  });

  it("ships navigation", () => {
    render(<MockedTopBar />);
    const ShipsButton = screen.getByTestId("ships-nav");

    fireEvent.click(ShipsButton);
    expect(window.location.pathname).toBe("/ships");
  });

  it("questions navigation", () => {
    render(<MockedTopBar />);
    const QuestionsButton = screen.getByTestId("questions-nav");

    fireEvent.click(QuestionsButton);
    expect(window.location.pathname).toBe("/questions");
  });
});
