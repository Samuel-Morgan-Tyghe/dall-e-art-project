import { Configuration, OpenAIApi } from "openai";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// These lines make "require" available

const path = require("path");

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", async (req, res) => {
  const response = await openai.createImage({
    prompt: req.prompt,
    n: 1,
    size: "1024x1024",
  });
  const image_url = response.data.data[0].url;

  res.json({ message: image_url });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
