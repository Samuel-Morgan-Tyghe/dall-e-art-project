// client/src/App.js

import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [promptUrl, setPromptUrl] = useState("");
  const [promptInput, setPromptInput] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api")
      // .then((res) => {
      //   console.log("🚀 ~ file: App.js ~ line 19 ~ .then ~ res", res);
      //   return res.json();
      // })
      // .then((response) => {
      //   console.log(response.json());
      //   console.log(promptUrl);
      //   setPromptUrl(JSON.stringify(response?.imageUrl ?? response?.message));
      // })
      .then((data) => {
        return data.json();
      })
      .then((post) => {
        console.log(
          "🚀 ~ file: App.js ~ line 27 ~ .then ~ post",
          JSON.stringify(post)
        );
      })
      .catch((e) => console.log(e));

    console.log(response);
    console.log(response?.body);
    console.log(response?.message);
    // await fetch("/api")
    //   .then((res) => {
    //     console.log("🚀 ~ file: App.js ~ line 19 ~ .then ~ res", res);
    //     return res.json();
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     console.log(promptUrl);
    //     setPromptUrl(JSON.stringify(response?.imageUrl ?? response?.message));
    //   })
    //   .catch((e) => console.log(e));
    setPromptInput("");
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!promptUrl ? "Loading..." : <p>{promptUrl}</p>}</p>
        {promptUrl && <image src={promptUrl} alt={promptUrl} />}
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
