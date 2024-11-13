import schema from "../utils/schema.json";
import { FormSchema } from "../types/schemaTypes";
import { DynamicFormProps } from "../types/types";

const DynamicForm = ({
  selectedCountry,
  setSelectedCountry,
  selectedCity,
  setSelectedCity,
}: DynamicFormProps) => {
  const formSchema = schema as FormSchema;

  return (
    <div className="bg-red-100 h-screen flex flex-col justify-center items-center border">
      {formSchema &&
        formSchema.fields.length > 0 &&
        formSchema.fields.map((field) => (
          <div key={field.name}>
            {field.type === "select" && field.name === "country" && (
              <div className="p-2">
                <label>
                  {field.label}
                  <select
                    name={field.name}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                    }}
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
            )}

            {field.type === "select" &&
              field.name === "city" &&
              field.visibilityConditions!["country"]?.includes(
                selectedCountry
              ) && (
                <div className="p-2">
                  <label>
                    {field.label}
                    <select
                      name={field.name}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                      }}
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
              )}

            {field.type !== "select" && (
              <label htmlFor={field.name}>
                {field.label}
                <input
                  className="p-2 m-2"
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.validation?.required}
                />
              </label>
            )}
          </div>
        ))}
    </div>
  );
};
export default DynamicForm;
