import "./App.css";
import { useEffect, useState } from "react";
import DynamicForm from "./components/DynamicForm";
import JSONPreview from "./components/JSONPreview";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    console.log(name);
    console.log(age);
    console.log(selectedCountry);
    console.log(selectedCity);
  }, [name, age, selectedCountry, selectedCity]);

  return (
    <div className="flex flex-col min-h-screen h-screen min-w-screen">
      <DynamicForm
        name={name}
        setName={setName}
        age={age}
        setAge={setAge}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      <JSONPreview
        name={name}
        age={age}
        selectedCountry={selectedCountry}
        selectedCity={selectedCity}
      />
    </div>
  );
}

export default App;
