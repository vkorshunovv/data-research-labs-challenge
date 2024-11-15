export type FieldType = "text" | "number" | "select";

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
}

export interface VisibilityConditions {
  [key: string]: string[];
}

export interface FormField {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  options?: string[] | any; //TODO add appropriate type instead of any
  validation?: ValidationRules;
  visibilityConditions?: VisibilityConditions;
}

export interface FormSchema {
  fields: FormField[];
}
