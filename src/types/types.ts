import { Dispatch, SetStateAction, MouseEventHandler } from "react";
import { FormField } from "./schemaTypes";

export type FormData = Record<string, any>;

export interface DynamicFormProps {
  data: FormData;
  setData: Dispatch<SetStateAction<FormData>>;
  setErrors?: Dispatch<SetStateAction<Record<string, string>>>;
}

export interface FormFieldProps {
  field: FormField;
  data: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
}

export interface ButtonProps {
  title: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

export interface JSONPreviewProps {
  data: FormData;
}
