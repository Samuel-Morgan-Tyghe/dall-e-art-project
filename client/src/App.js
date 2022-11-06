// client/src/App.js

import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [promptUrl, setPromptUrl] = useState(
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-TCxU0pi2JLhktrQ6n9PuDc8L/user-t8J4t60vxpzgp9oJRKdxjoxj/img-gapAiqA7SHgZF7MU2a1PcADd.png?st=2022-11-06T19%3A09%3A41Z&se=2022-11-06T21%3A09%3A41Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-06T02%3A43%3A01Z&ske=2022-11-07T02%3A43%3A01Z&sks=b&skv=2021-08-06&sig=myoIZZw1SsAO3ShX0fXtykU2I0HR7BM9fzbE3nSRFWA%3D"
  );
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
        <img src={promptUrl ?? logo} className="App-logo" alt="logo" />
        <p>{!promptUrl ? "Loading..." : <p>{promptUrl}</p>}</p>
        {promptUrl && <image src={promptUrl} alt={promptUrl}></image>}
        {promptUrl && (
          <div
            style={{
              background: `black url(${promptUrl}) no-repeat fixed center`,
              width: "1080px",
              height: "1080px",
            }}
          ></div>
        )}
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
