import React from "react";
import schema from "../utils/schema.json";
import { FormSchema } from "../types/schemaTypes";

const DynamicForm: React.FC = () => {
  const formSchema = schema as FormSchema;

  return (
    <div>
      {formSchema.fields.map((field) => (
        <div key={field.name}>{field.label}</div>
      ))}
    </div>
  );
};

export default DynamicForm;
