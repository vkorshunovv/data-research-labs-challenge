import { Dispatch, SetStateAction } from "react";

export interface FormData {
  name: string;
  age: string;
  selectedCountry: string;
  selectedCity: string;
}

export interface DynamicFormProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  age: string;
  setAge: Dispatch<SetStateAction<string>>;
  selectedCountry: string;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
  selectedCity: string;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setErrors?: React.Dispatch<React.SetStateAction<any>>;
}

export interface FormFieldProps {
  field: any;
  name: string;
  age: string;
  selectedCountry?: string;
  selectedCity?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error: string;
}

export interface ButtonProps {
  title: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface JSONPreviewProps {
  name: string;
  age: string;
  selectedCountry: string;
  selectedCity: string;
}
