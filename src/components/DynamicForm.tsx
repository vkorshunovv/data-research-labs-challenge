import { FormEvent, useEffect, useState } from "react";
import schema from "../utils/schema.json";
import { FormSchema } from "../types/schemaTypes";
import { DynamicFormProps, FormData } from "../types/types";
import Button from "./Button";
import FormField from "./FormField";

const DynamicForm = ({
  name,
  setName,
  age,
  setAge,
  selectedCountry,
  setSelectedCountry,
  selectedCity,
  setSelectedCity,
}: DynamicFormProps) => {
  const formSchema = schema as FormSchema;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedData, setSavedData] = useState<FormData | null>(null);

  // Retrieve input data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const localStorageData = JSON.parse(storedData);
      if (localStorageData.name) setName(localStorageData.name);
      if (localStorageData.age) setAge(localStorageData.age);
      if (localStorageData.selectedCountry)
        setSelectedCountry(localStorageData.selectedCountry);
      if (localStorageData.selectedCity)
        setSelectedCity(localStorageData.selectedCity);
    }
  }, []);

  // Update localStorage on every input change
  useEffect(() => {
    const formData = { name, age, selectedCountry, selectedCity };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [name, age, selectedCountry, selectedCity]);

  // Function to validate individual fields and provide error messages
  const validateField = (name: string, value: string) => {
    const field = formSchema.fields.find((f) => f.name === name);
    if (!field) return;

    const newErrors: Record<string, string> = {};

    if (field.validation?.required && !value) {
      newErrors[name] = `${field.label} is required`;
    } else {
      if (
        field.validation?.minLength &&
        typeof value === "string" &&
        value.length < field.validation.minLength
      ) {
        newErrors[
          name
        ] = `${field.label} must be at least ${field.validation.minLength} characters long`;
      }
      if (
        field.validation?.maxLength &&
        typeof value === "string" &&
        value.length > field.validation.maxLength
      ) {
        newErrors[
          name
        ] = `${field.label} cannot exceed ${field.validation.maxLength} characters`;
      }
      if (field.validation?.min && Number(value) < field.validation.min) {
        newErrors[
          name
        ] = `${field.label} must be at least ${field.validation.min}`;
      }
      if (
        field.validation?.max &&
        typeof value === "string" &&
        Number(value) > field.validation.max
      ) {
        newErrors[
          name
        ] = `${field.label} cannot exceed ${field.validation.max}`;
      }
      if (
        field.validation?.pattern &&
        typeof value === "string" &&
        !new RegExp(field.validation.pattern).test(value)
      ) {
        newErrors[name] = `${field.label} is not valid`;
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newErrors[name] || "",
    }));
  };

  const handleFormClear = (e: FormEvent) => {
    e.preventDefault();

    // Save current data to be able to restore it
    const savedLocalStorageData = JSON.parse(
      localStorage.getItem("formData") || "{}"
    );
    setSavedData(savedLocalStorageData);
    console.log("savedData", savedLocalStorageData);

    setName("");
    setAge("");
    setSelectedCountry("");
    setSelectedCity("");

    setErrors({});
  };

  const handleRestoreData = (e: FormEvent) => {
    e.preventDefault();

    if (savedData) {
      setName(savedData.name);
      setAge(savedData.age);
      setSelectedCountry(savedData.selectedCountry);
      setSelectedCity(savedData.selectedCity);
    }

    setErrors({});
  };

  return (
    <div className=" min-h-min h-1/2 flex flex-col justify-center items-center">
      <form>
        <div className="pb-12">
          {formSchema &&
            formSchema.fields.length > 0 &&
            formSchema.fields.map((field) => (
              <div key={field.name}>
                <FormField
                  field={field}
                  name={name}
                  age={age}
                  selectedCountry={selectedCountry}
                  selectedCity={selectedCity}
                  onChange={(e) => {
                    if (field.name === "name") setName(e.target.value);
                    if (field.name === "age") setAge(e.target.value);
                    if (field.name === "country")
                      setSelectedCountry(e.target.value);
                    if (field.name === "city") setSelectedCity(e.target.value);
                  }}
                  onBlur={() =>
                    validateField(
                      field.name,
                      field.name === "country"
                        ? selectedCountry
                        : field.name === "city"
                        ? selectedCity
                        : field.name === "name"
                        ? name
                        : field.name === "age"
                        ? age
                        : ""
                    )
                  }
                  error={errors[field.name] || ""}
                />
              </div>
            ))}
        </div>
        <div className="pb-6 flex items-center justify-between gap-x-6">
          <Button title="Clear Form" handleClick={handleFormClear} />
          <Button title="Restore Saved State" handleClick={handleRestoreData} />
        </div>
      </form>
    </div>
  );
};
export default DynamicForm;
