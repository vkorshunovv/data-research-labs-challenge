import { FormEvent, useEffect, useState } from "react";
import schema from "../utils/schema.json";
import { FormSchema } from "../types/schemaTypes";
import { DynamicFormProps, FormData } from "../types/types";
import Button from "./Button";
import FormField from "./FormField";

const DynamicForm = ({ data, setData }: DynamicFormProps) => {
  const formSchema = schema as FormSchema;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedData, setSavedData] = useState<FormData | null>(null);

  // Retrieve input data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const localStorageData = JSON.parse(storedData);
      setData(localStorageData);
    }
  }, []);

  // Update localStorage on every input change
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(data));
  }, [data]);

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

  const clearForm = (e: FormEvent) => {
    e.preventDefault();

    // Save current data to be able to restore it
    const savedLocalStorageData = JSON.parse(
      localStorage.getItem("formData") || "{}"
    );
    setSavedData(savedLocalStorageData);
    console.log("Saved Data", savedLocalStorageData);

    setData({});
    setErrors({});
  };

  const restoreData = (e: FormEvent) => {
    e.preventDefault();

    if (savedData) {
      setData(savedData);
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
                  onChange={(e: any) => {
                    setData((prevData: any) => ({
                      ...prevData,
                      [field.name]: e.target.value,
                    }));
                  }}
                  onBlur={() => validateField(field.name, data[field.name])}
                  data={data}
                  error={errors[field.name] || ""}
                />
              </div>
            ))}
        </div>
        <div className="pb-6 flex items-center justify-between gap-x-6">
          <Button title="Clear Form" handleClick={clearForm} />
          <Button title="Restore Saved State" handleClick={restoreData} />
        </div>
      </form>
    </div>
  );
};
export default DynamicForm;
