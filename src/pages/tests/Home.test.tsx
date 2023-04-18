import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";

import Home from "../Home";
import { store } from "../../store/store";

const MockedHomepage = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

describe("HomePage", () => {
  it("loads and displays home page", async () => {
    render(<MockedHomepage />);
    await waitFor(() => {
      expect(screen.getByTestId("spinner-wrapper")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId("spaceinfo-wrapper")).toBeInTheDocument();
    });

    const pageHeading = await screen.findByText("SpaceX");
    expect(pageHeading).toBeInTheDocument();
  });
});
