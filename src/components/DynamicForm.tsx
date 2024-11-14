import { FormEvent, useEffect, useState } from "react";
import schema from "../utils/schema.json";
import { FormSchema } from "../types/schemaTypes";
import { DynamicFormProps, FormData } from "../types/types";

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

  // Retrieve input data from localStorage or set default
  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("formData") || "{}"
    );

    if (localStorageData.name) setName(localStorageData.name);
    if (localStorageData.age) setAge(localStorageData.age);
    if (localStorageData.selectedCountry)
      setSelectedCountry(localStorageData.selectedCountry);
    if (localStorageData.selectedCity)
      setSelectedCity(localStorageData.selectedCity);
  }, []);

  // Update localStorage on every input change
  useEffect(() => {
    const formData = { name, age, selectedCountry, selectedCity };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [name, age, selectedCountry, selectedCity]);

  // Function to validate individual fields
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
  };

  const handleRestoreData = (e: FormEvent) => {
    e.preventDefault();

    if (savedData) {
      setName(savedData.name);
      setAge(savedData.age);
      setSelectedCountry(savedData.selectedCountry);
      setSelectedCity(savedData.selectedCity);
    }
  };

  return (
    <div className=" min-h-min h-1/2 flex flex-col justify-center items-center">
      <form className="">
        <div className="pb-12">
          {formSchema &&
            formSchema.fields.length > 0 &&
            formSchema.fields.map((field) => (
              <div key={field.name}>
                {field.type === "select" && field.name === "country" && (
                  <div className="flex flex-col gap-y-2">
                    {" "}
                    <div className="mt-10 gap-y-4">
                      <label className="block text-sm/6 font-medium text-gray-900">
                        {field.label}
                        <span className="w-2 text-red-400">
                          {field.validation?.required && "*"}
                        </span>
                        <div className="mt-2">
                          <select
                            name={field.name}
                            onChange={(e) => {
                              setSelectedCountry(e.target.value);
                            }}
                            onBlur={() =>
                              validateField(field.name, selectedCountry)
                            }
                            required={field.validation?.required}
                            className="box-border block w-full rounded-md border-0 py-2.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                          >
                            {/* Check if "options" is an Array */}
                            {Array.isArray(field.options) &&
                              field.options.length > 0 &&
                              field.options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                          </select>
                        </div>
                      </label>
                    </div>
                    <div>
                      {errors[field.name] && (
                        <p className="text-red-500 block text-sm/6 font-medium">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {field.type === "select" &&
                  field.name === "city" &&
                  field.visibilityConditions!["country"]?.includes(
                    selectedCountry
                  ) && (
                    <div className="flex flex-col gap-y-2">
                      <div className="mt-10 gap-y-4">
                        <label className="block text-sm/6 font-medium text-gray-900">
                          {field.label}
                          <span className="text-red-400">
                            {field.validation?.required && "*"}
                          </span>
                          <div className="mt-2">
                            <select
                              name={field.name}
                              onChange={(e) => {
                                setSelectedCity(e.target.value);
                              }}
                              onBlur={() =>
                                validateField(field.name, selectedCity)
                              }
                              required={field.validation?.required}
                              className="box-border block w-full rounded-md border-0 p-2.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            >
                              {selectedCountry &&
                                typeof field.options === "object" &&
                                (
                                  field.options[selectedCountry] as string[]
                                )?.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </label>
                      </div>
                      <div>
                        {errors[field.name] && (
                          <p className="text-red-500 block text-sm/6 font-medium">
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                {field.type !== "select" && (
                  <div className="flex flex-col gap-y-2">
                    <div className="mt-10 gap-y-4">
                      <label
                        htmlFor={field.name}
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        {field.label}
                        <span className="text-red-400">
                          {field.validation?.required && "*"}
                        </span>
                        <div className="mt-2">
                          <input
                            className="box-border block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.validation?.required}
                            minLength={field.validation?.minLength}
                            maxLength={field.validation?.maxLength}
                            min={field.validation?.min}
                            max={field.validation?.max}
                            pattern={field.validation?.pattern}
                            value={
                              field.name === "name"
                                ? name
                                : field.name === "age"
                                ? age
                                : ""
                            }
                            onChange={(e) => {
                              if (field.name === "name") {
                                setName(e.target.value);
                              }
                              if (field.name === "age") {
                                setAge(e.target.value);
                              }
                            }}
                            onBlur={(e) =>
                              validateField(field.name, e.target.value)
                            }
                          />
                        </div>
                      </label>
                    </div>
                    <div>
                      {errors[field.name] && (
                        <p className="text-red-500 block text-sm/6 font-medium">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="pb-6 flex items-center justify-between gap-x-6">
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            onClick={(e) => handleFormClear(e)}
          >
            Clear Form
          </button>
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            onClick={(e) => handleRestoreData(e)}
          >
            Restore Saved State
          </button>
        </div>
      </form>
    </div>
  );
};
export default DynamicForm;
