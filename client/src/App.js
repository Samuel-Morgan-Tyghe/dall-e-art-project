// client/src/App.js

import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  console.log(data);
  useEffect(() => {
    fetch("/api")
      .then((res) => {
        console.log("🚀 ~ file: App.js ~ line 19 ~ .then ~ res", res);
        return res.json();
      })
      .then((data) => setData(data.message))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
