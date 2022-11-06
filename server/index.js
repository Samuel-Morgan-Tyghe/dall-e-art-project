import { Configuration, OpenAIApi } from "openai";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// These lines make "require" available

const path = require("path");

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", async (req, res) => {
  console.log("🚀 ~ file: index.js ~ line 34 ~ app.get ~ req", req);

  const prompt = req?.query?.prompt;

  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  const image_url = response.data.data[0].url;

  // res.json({ imageUrl: image_url });
  // return res.json({ imageUrl: query });
  // res.json({ message: "req.prompt" });
  // res.send("Hello World!");
  return res.send(200, { imageUrl: image_url });
});

// All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });
