const path = require("path");
const express = require("express");
const app = express();
const router = require("./routes/index");
const globalErrorHandler = require("./controllers/errors.controller");
const cors = require("cors"); // requis pour accéder au serveur du client-app vue
const cookieParser = require("cookie-parser");

// Middleware qui mesure le temps de réponse de chaque requête (et plus)
// const morgan = require('morgan');
console.clear();
// app.use(morgan(':method :url (:status) - :response-time[0] ms'));

app.use(cors({ origin: "*" })); // requis pour accéder au serveur du client-app vue
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(router);

// Middleware de gestion des erreurs
app.use(globalErrorHandler);
module.exports = app;
