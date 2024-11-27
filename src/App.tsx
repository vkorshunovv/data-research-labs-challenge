import "./App.css";
import { useState } from "react";
import DynamicForm from "./components/DynamicForm";
import JSONPreview from "./components/JSONPreview";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  //save all values in one object
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("formData");
    return storedData ? JSON.parse(storedData) : {}; 
  });

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
        //pass fields as props
        data={data}
        setData={setData}
      />
      <JSONPreview data={data} />
    </div>
  );
}

export default App;
