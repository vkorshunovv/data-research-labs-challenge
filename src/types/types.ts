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
}
