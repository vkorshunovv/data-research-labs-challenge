import { FormFieldProps } from "../types/types";

const FormField = ({
  field,
  onChange,
  onBlur,
  error,
  data,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      {/* TEXT || NUMBER */}
      {(field.type === "text" || field.type === "number") && (
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
                placeholder={field.placeholder ?? ""}
                required={field.validation?.required}
                minLength={field.validation?.minLength}
                maxLength={field.validation?.maxLength}
                min={field.validation?.min}
                max={field.validation?.max}
                pattern={field.validation?.pattern}
                value={data[field.name] ?? ""}
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
          </label>
        </div>
      )}

      {/* SELECT */}
      {field.type === "select" && (
        <div className="mt-5 gap-y-4">
          <label className="block text-sm/6 font-medium text-gray-900">
            {field.label}
            <span className="w-2 text-red-400">
              {field.validation?.required && "*"}
            </span>
            <div className="mt-2">
              <select
                name={field.name}
                value={data[field.name] || ""}
                onChange={onChange}
                onBlur={onBlur}
                required={field.validation?.required}
                className="box-border block w-full rounded-md border-0 py-2.5 px-0.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-white"
              >
                <option value="">Select {field.label}</option>
                {Array.isArray(field.options) &&
                  field.options.length > 0 &&
                  field.options.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                {typeof field.options === "object" &&
                  field.visibilityConditions &&
                  (
                    field.options[
                      data[Object.keys(field.visibilityConditions)[0]] // find value stored in data state to match option key
                    ] as string[]
                  )?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
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
