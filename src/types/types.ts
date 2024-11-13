import { Dispatch, SetStateAction } from "react";

export interface DynamicFormProps {
  selectedCountry: string;
  setSelectedCountry: Dispatch<SetStateAction<string>>;
  selectedCity: string;
  setSelectedCity: Dispatch<SetStateAction<string>>;
}
