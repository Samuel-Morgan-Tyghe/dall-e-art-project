// client/src/App.js

import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [promptUrl, setPromptUrl] = useState("");
  const [promptInput, setPromptInput] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    fetch("/api" + "?" + "prompt=" + promptInput)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setPromptUrl(response?.imageUrl);
      })
      .catch((e) => console.log(e));

    setPromptInput("");
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!promptUrl ? "Loading..." : <p>{promptUrl}</p>}</p>
        {promptUrl && <image src={promptUrl} alt={promptUrl}></image>}
        {promptUrl && <div style={{ background: url(promptUrl) }}></div>}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="promptInput"
            placeholder="Enter A Prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="Generate Images" />
        </form>{" "}
      </header>
    </div>
  );
}

export default App;
