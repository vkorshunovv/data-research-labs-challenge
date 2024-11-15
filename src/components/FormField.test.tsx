import { render, screen } from "@testing-library/react";
import FormField from "./FormField";
import { FormFieldProps } from "../types/types";
import "@testing-library/jest-dom";

describe("FormField Component", () => {
  test('renders multiple options when field type is "select"', () => {
    // Define test props with multiple options
    const TestProps: FormFieldProps = {
      field: {
        name: "country",
        label: "Country",
        type: "select",
        options: ["USA", "Canada", "Australia"],
        validation: { required: true },
      },
      name: "",
      age: "",
      selectedCountry: "",
      selectedCity: "",
      onChange: jest.fn(),
      onBlur: jest.fn(),
      error: "",
    };

    // Render component with test props
    render(<FormField {...TestProps} />);

    // Check that the select element and each option are rendered
    const selectElement = screen.getByRole("combobox", { name: /country/i });
    expect(selectElement).toBeInTheDocument();

    // Check each option in the dropdown
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);

    // Check that each option's value is correctly rendered
    expect(options[0]).toHaveValue("USA");
    expect(options[1]).toHaveValue("Canada");
    expect(options[2]).toHaveValue("Australia");
  });
});
