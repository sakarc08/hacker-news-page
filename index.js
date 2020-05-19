import '@babel/polyfill';
import express from 'express';
import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server';
import App from './client/src/public/App'
import UserController from './controllers/User';
import PostController from './controllers/Post'
import path from 'path';
import connectDB from './config/db'

const app = express();
connectDB();

app.use('/static', express.static(path.resolve(__dirname, "../build/public")));
app.use(express.json())

app.use("/api/user", UserController);
app.use("/api/posts", PostController);

app.use('*', (req, res) => {
  try {
        const app = renderToString(<App />);
        fs.readFile('./client/src/public/index.html', { encoding: "utf8"}, (err, data) => {
            res.send(data.replace('<div id="root"></div>', `<div id="root">${app}</div>`));
        });
    } catch (error) {
        console.log(error);
        res.send('Server error')
    }
})

// app.get("*", (req, res) => {
//   res.status(404).send(`
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; font-size: 15px; }
//           h1 { color: #c7c7c7; text-align: center; }
//         </style>
//       </head>

//       <body>
//         <h1>404 - Not Found</h1>
//       </body>
//     </html>`);
// });

const { PORT = 3008 } = process.env;

app.listen(PORT, () => {
    console.log(`App running at ${PORT}`);
})