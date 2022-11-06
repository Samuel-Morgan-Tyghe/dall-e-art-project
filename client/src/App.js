// client/src/App.js

import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [promptUrl, setPromptUrl] = useState(null);
  const [promptInput, setPromptInput] = useState(null);
  console.log(promptUrl);

  async function onSubmit(event) {
    event.preventDefault();
    fetch("/api", {
      body: JSON.stringify({
        prompt: promptUrl,
      }),
    })
      .then((res) => {
        console.log("🚀 ~ file: App.js ~ line 19 ~ .then ~ res", res);
        return res.json();
      })
      .then((promptUrl) => setPromptUrl(promptUrl.message))
      .catch((e) => console.log(e));
    const promptUrl = await response.json();
    setPromptInput("");
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {!promptUrl ? (
            "Loading..."
          ) : (
            <image src={promptUrl} alt={promptUrl} />
          )}
        </p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="promptInput"
            placeholder="Enter A Prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>{" "}
      </header>
    </div>
  );
}

export default App;
