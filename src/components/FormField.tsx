import { FormFieldProps } from "../types/types";

const FormField = ({
  field,
  name,
  age,
  selectedCountry,
  selectedCity,
  onChange,
  onBlur,
  error,
}: FormFieldProps) => {
  return (
    //render different form fields depending on "field.type" or specific conditions
    <div className="flex flex-col gap-y-2">
      {field.type === "select" && field.name === "country" && (
        <div className="mt-5 gap-y-4">
          <label className="block text-sm/6 font-medium text-gray-900">
            {field.label}
            <span className="w-2 text-red-400">
              {field.validation?.required && "*"}
            </span>
            <div className="mt-2">
              <select
                name={field.name}
                value={selectedCountry}
                onChange={onChange}
                onBlur={onBlur}
                required={field.validation?.required}
                className="box-border block w-full rounded-md border-0 py-2.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                {/* Check if "options" is an Array */}
                {Array.isArray(field.options) &&
                  field.options.length > 0 &&
                  field.options.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>
          </label>
        </div>
      )}

      {field.type === "select" &&
        field.name === "city" &&
        field.visibilityConditions["country"]?.includes(selectedCountry) && (
          <>
            <div className="mt-5 gap-y-4">
              <label className="block text-sm/6 font-medium text-gray-900">
                {field.label}
                <span className="text-red-400">
                  {field.validation?.required && "*"}
                </span>
                <div className="mt-2">
                  <select
                    name={field.name}
                    value={selectedCity}
                    onChange={onChange}
                    onBlur={onBlur}
                    required={field.validation?.required}
                    className="box-border block w-full rounded-md border-0 p-2.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  >
                    {/* Check if "options" is an Object to find nested arrays */}
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
                </div>
              </label>
            </div>
          </>
        )}

      {field.type !== "select" && (
        <div className="mt-5 gap-y-4">
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
                  field.name === "name" ? name : field.name === "age" ? age : ""
                }
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
          </label>
        </div>
      )}
      <div>
        {error && (
          <p className="text-red-500 block text-sm/6 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default FormField;
