import express from "express";
import path from 'path';
import React from "react";
import ReactDOMServer from "react-dom/server";
import StoryBoardRoute from "./public/components/StoryBoardRoute";

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {

  const componentStream =  ReactDOMServer.renderToString(
    <StoryBoardRoute />
  );

  const html = `
    <!doctype html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style>
          body { font-family: Arial, sans-serif; font-size: 15px; }
        </style>
      </head>
      <body>
        <div id="root"></div>`;

      res.write(html);

      const htmlEnd = `</div>
          <script src="/static/vendors~home.js"></script>
          <script src="/static/home.js"></script>
          <script async src='https://kit.fontawesome.com/a076d05399.js'></script>
        </body>
        </html>`;
      
      res.write(htmlEnd);
      res.send();
});

app.get("*", (req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; font-size: 15px; }
          h1 { color: #c7c7c7; text-align: center; }
        </style>
      </head>

      <body>
        <h1>404 - Not Found</h1>
      </body>
    </html>`);
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log(`App running at port ${PORT}`));
