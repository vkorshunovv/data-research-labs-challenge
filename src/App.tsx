import "./App.css";
import { useEffect, useState } from "react";
import DynamicForm from "./components/DynamicForm";
import JSONPreview from "./components/JSONPreview";

function App() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    console.log(selectedCountry);
    console.log(selectedCity);
  }, [selectedCountry, selectedCity]);

  return (
    <>
      <DynamicForm
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      <JSONPreview />
    </>
  );
}

export default App;
