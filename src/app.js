import express from "express";
import __dirname from "./utils.js";
import passport from "passport";
import cors from "cors";
import compression from "express-compression";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { serve,setup } from "swagger-ui-express";

import sessions from "./config/sessions/factory.js";
import indexRouter from "./routes/index.js";
import options from "./config/swagger.js";

import inicializePassport from "./middlewares/passport.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import winston from "./middlewares/winston.js";

import "./config/config.js";

import cookieParser from "cookie-parser";
//import expressSession from "express-session";
//import MongoStore from "connect-mongo";


const app = express();
const specs = swaggerJSDoc(options)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/inicio.html"));
});

//Static
//app.use("/files", express.static(`${__dirname}/files`));
app.use("/files", express.static(path.join(__dirname, "../files")));

//router
const router = new indexRouter();

//Middlewares
app.use(winston)
app.use(compression({ brotli: { enable: true, zlib: {} } }));
app.use(cors());
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(sessions);
/*app.use(
  expressSession({
    store: MongoStore.create({
      //backup por si se cae el servidor
      mongoUrl: process.env.LINK_DB,
      ttl: 60 * 60 * 24 * 7,
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
  })
);*/
inicializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "../public")));
//app.use("/", express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//endpoints
app.use("/api", router.getRouter());
app.use("/api/docs", serve, setup(specs));
app.use(errorHandler);
app.use(notFoundHandler);

export default app;
