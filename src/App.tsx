import "./App.css";
import { useState } from "react";
import DynamicForm from "./components/DynamicForm";
import JSONPreview from "./components/JSONPreview";

function App() {
  //save all values in one object
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("formData");
    return storedData ? JSON.parse(storedData) : {};
  });

  return (
    <div className="flex flex-col items-center min-h-screen mx-auto max-w-screen overflow-hidden pt-8">
      <DynamicForm data={data} setData={setData} />
      <JSONPreview data={data} />
    </div>
  );
}

export default App;
