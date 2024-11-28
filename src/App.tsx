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
    <div className="flex flex-col min-h-screen h-screen min-w-screen">
      <DynamicForm data={data} setData={setData} />
      <JSONPreview data={data} />
    </div>
  );
}

export default App;
