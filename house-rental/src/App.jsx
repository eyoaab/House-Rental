import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-4 mb-6">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold mb-4">Vite + React</h1>
      <div className="card p-6 bg-white shadow-lg rounded-lg mb-4">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          count is {count}
        </button>
        <p className="text-sm mt-2">
          Edit <code className="font-mono">src/App.jsx</code> and save to test
          HMR
        </p>
      </div>
      <p className="text-red-700">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
