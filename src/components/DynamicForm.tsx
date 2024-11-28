import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import schema from "../utils/schema.json";
import { FormSchema } from "../types/schemaTypes";
import { DynamicFormProps, FormData } from "../types/types";
import Button from "./Button";
import FormField from "./FormField";

const DynamicForm = ({ data, setData }: DynamicFormProps) => {
  const formSchema = schema as FormSchema;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedData, setSavedData] = useState<FormData | null>(null);

  // retrieve input data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const localStorageData = JSON.parse(storedData);
      setData(localStorageData);
    }
  }, []);

  // update localStorage on every input change
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(data));
  }, [data]);

  // function to validate individual fields and provide error messages
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

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData: any) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      // reset dependent fields if a parent field changes
      formSchema.fields.forEach((field) => {
        if (
          field.visibilityConditions &&
          Object.keys(field.visibilityConditions).includes(name)
        ) {
          updatedData[field.name] = ""; // reset the dependent field
        }
      });

      return updatedData;
    });
  };

  return (
    <div className="flex flex-col justify-center items-center pb-8">
      <form>
        <div className="pb-12">
          {formSchema &&
            formSchema.fields.length > 0 &&
            formSchema.fields.map((field) => {
              const isVisible =
                !field.visibilityConditions || // always visible if no conditions
                Object.keys(field.visibilityConditions).every(
                  (
                    key // visible if associated option was selected previously
                  ) => field.visibilityConditions![key].includes(data[key])
                );
              return isVisible ? (
                <div key={field.name}>
                  <FormField
                    field={field}
                    onChange={(e) => handleOnChange(e)}
                    onBlur={() => validateField(field.name, data[field.name])}
                    data={data}
                    error={errors[field.name] || ""}
                  />
                </div>
              ) : null;
            })}
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
