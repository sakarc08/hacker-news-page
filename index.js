import '@babel/polyfill';
import express from 'express';
import fs from 'fs'
import RenderDomServer from 'react-dom/server'
import UserController from './controllers/User';
const path = require('path');
const connectDB = require('./config/db')

const app = express();
connectDB();

app.use('/static', express.static(path.resolve(__dirname, "../build/public")));
app.use(express.json())

app.use("/api/user", UserController);

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

const { PORT = 3008 } = process.env;

app.listen(PORT, () => {
    console.log(`App running at ${PORT}`);
})