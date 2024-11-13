import { useState } from "react";
import schema from "../utils/schema.json";
import { FormSchema } from "../types/schemaTypes";
import { DynamicFormProps } from "../types/types";

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

  // Function to validate individual fields
  const validateField = (name: string, value: string) => {
    const field = formSchema.fields.find((f) => f.name === name);
    if (!field) return;

    const newErrors: Record<string, string> = {};

    if (field.validation?.required && !value) {
      newErrors[name] = `${field.label} is required.`;
    }
    if (
      field.validation?.minLength &&
      typeof value === "string" &&
      value.length < field.validation.minLength
    ) {
      newErrors[
        name
      ] = `${field.label} must be at least ${field.validation.minLength} characters long.`;
    }
    if (
      field.validation?.maxLength &&
      typeof value === "string" &&
      value.length > field.validation.maxLength
    ) {
      newErrors[
        name
      ] = `${field.label} cannot exceed ${field.validation.maxLength} characters.`;
    }
    if (
      field.validation?.min &&
      Number(value) < field.validation.min
    ) {
      newErrors[
        name
      ] = `${field.label} must be at least ${field.validation.min}.`;
    }
    if (
      field.validation?.max &&
      typeof value === "string" &&
      Number(value) > field.validation.max
    ) {
      newErrors[name] = `${field.label} cannot exceed ${field.validation.max}.`;
    }
    if (
      field.validation?.pattern &&
      typeof value === "string" &&
      !new RegExp(field.validation.pattern).test(value)
    ) {
      newErrors[name] = `${field.label} is not valid.`;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newErrors[name] || "",
    }));
  };

  return (
    <div className="bg-red-100 h-screen flex flex-col justify-center items-center border">
      <form action="">
        {formSchema &&
          formSchema.fields.length > 0 &&
          formSchema.fields.map((field) => (
            <div key={field.name}>
              {field.type === "select" && field.name === "country" && (
                <>
                  {" "}
                  <div className="p-2">
                    <label>
                      {field.label}
                      <select
                        name={field.name}
                        onChange={(e) => {
                          setSelectedCountry(e.target.value);
                        }}
                        onBlur={() =>
                          validateField(field.name, selectedCountry)
                        }
                        required={field.validation?.required}
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
                    </label>
                  </div>
                  {errors[field.name] && (
                    <p className="text-red-500">{errors[field.name]}</p>
                  )}
                </>
              )}

              {field.type === "select" &&
                field.name === "city" &&
                field.visibilityConditions!["country"]?.includes(
                  selectedCountry
                ) && (
                  <>
                    <div className="p-2">
                      <label>
                        {field.label}
                        <select
                          name={field.name}
                          onChange={(e) => {
                            setSelectedCity(e.target.value);
                          }}
                          onBlur={() => validateField(field.name, selectedCity)}
                          required={field.validation?.required}
                        >
                          {selectedCountry &&
                            typeof field.options === "object" &&
                            (field.options[selectedCountry] as string[])?.map(
                              (option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              )
                            )}
                        </select>
                      </label>
                    </div>
                    {errors[field.name] && (
                      <p className="text-red-500">{errors[field.name]}</p>
                    )}
                  </>
                )}

              {field.type !== "select" && (
                <>
                  <div>
                    <label htmlFor={field.name}>
                      {field.label}
                      <input
                        className="p-2 m-2"
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
                    </label>
                    {errors[field.name] && (
                      <p className="text-red-500">{errors[field.name]}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
      </form>
    </div>
  );
};
export default DynamicForm;
