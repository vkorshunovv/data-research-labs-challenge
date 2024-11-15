import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import DynamicForm from "./DynamicForm";
import "@testing-library/jest-dom";

describe("DynamicForm Component", () => {
  beforeEach(() => {
    const mockLocalStorage = {
      length: 0,
      clear: jest.fn(),
      getItem: jest.fn(() =>
        JSON.stringify({
          name: "John",
          age: "30",
          selectedCountry: "USA",
          selectedCity: "New York",
        })
      ),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      key: jest.fn(),
    };

    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve data from localStorage on mount", async () => {
    const setName = jest.fn();
    const setAge = jest.fn();
    const setSelectedCountry = jest.fn();
    const setSelectedCity = jest.fn();

    render(
      <DynamicForm
        name=""
        setName={setName}
        age=""
        setAge={setAge}
        selectedCountry=""
        setSelectedCountry={setSelectedCountry}
        selectedCity=""
        setSelectedCity={setSelectedCity}
      />
    );

    await waitFor(() => {
      expect(setName).toHaveBeenCalledWith("John");
      expect(setAge).toHaveBeenCalledWith("30");
      expect(setSelectedCountry).toHaveBeenCalledWith("USA");
      expect(setSelectedCity).toHaveBeenCalledWith("New York");
    });
  });

  it("should restore saved state on Restore Saved State button click", () => {
    const setName = jest.fn();
    const setAge = jest.fn();
    const setSelectedCountry = jest.fn();
    const setSelectedCity = jest.fn();

    const { getByText } = render(
      <DynamicForm
        name=""
        setName={setName}
        age=""
        setAge={setAge}
        selectedCountry=""
        setSelectedCountry={setSelectedCountry}
        selectedCity=""
        setSelectedCity={setSelectedCity}
      />
    );

    const restoreButton = getByText("Restore Saved State");
    fireEvent.click(restoreButton);

    // Verify that the saved data was restored
    expect(setName).toHaveBeenCalledWith("John");
    expect(setAge).toHaveBeenCalledWith("30");
    expect(setSelectedCountry).toHaveBeenCalledWith("USA");
    expect(setSelectedCity).toHaveBeenCalledWith("New York");
  });

  it("should validate inputs on blur", () => {
    const setName = jest.fn();
    const setAge = jest.fn();
    const setSelectedCountry = jest.fn();
    const setSelectedCity = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <DynamicForm
        name=""
        setName={setName}
        age=""
        setAge={setAge}
        selectedCountry=""
        setSelectedCountry={setSelectedCountry}
        selectedCity=""
        setSelectedCity={setSelectedCity}
      />
    );

    const nameInput = getByPlaceholderText("Enter your name");
    fireEvent.blur(nameInput);

    // Expect validation errors
    expect(getByText("Name is required")).toBeInTheDocument();

    const ageInput = screen.getByLabelText("Age*");
    fireEvent.blur(ageInput);

    expect(screen.getByText("Age is required")).toBeInTheDocument();

    const countrySelect = screen.getByLabelText("Country*");
    fireEvent.blur(countrySelect);

    expect(screen.getByText("Country is required")).toBeInTheDocument();
  });
});
