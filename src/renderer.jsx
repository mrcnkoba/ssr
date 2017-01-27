import express from "express";
import httpProxy from "http-proxy";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Posts from "./Posts";
import fs from "fs";
const indexPath = require("copy!../index.html");
const index = fs.readFileSync(indexPath, "utf-8");
const app = express();
console.log(indexPath);
app.use(express.static("build/assets"));

app.get("*", (req, res) => {
  console.log(`url: ${req.url}`);
  // powinno być (ale nie dokonczylem):
  // const app = new App();
  // await app.locationChanged(req.url);
  // const view = ReactDOMServer.renderToString(app.viewDescriptor);
  const view = ReactDOMServer.renderToString(<Posts />);
  const idx = index.replace("[CONTENT]", view);
  res.send(idx);
});

app.listen(8000, () => {
  console.log("Server started on port 8000.");
});