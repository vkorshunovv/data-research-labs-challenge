import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App Component", () => {
  test("renders DynamicForm and JSONPreview", () => {
    render(<App />);

    // check if form fields are rendered
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();

    //check if JSONPreview is rendered
    expect(screen.getByText(/"name":/)).toBeInTheDocument();
    expect(screen.getByText(/"age":/)).toBeInTheDocument();
  });

  test("can type in input fields", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Age/i), {
      target: { value: "30" },
    });

    expect(screen.getByLabelText(/Name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/Age/i)).toHaveValue(30);
  });

  test("can select country and see corresponding city options", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: "USA" },
    });

    const citySelect = screen.getByLabelText(/City/i);
    expect(citySelect).toBeInTheDocument();

    expect(screen.getByText(/New York/i)).toBeInTheDocument();
    expect(screen.getByText(/Los Angeles/i)).toBeInTheDocument();

    fireEvent.change(citySelect, {
      target: { value: "New York" },
    });

    expect(citySelect).toHaveValue("New York");
  });
});
