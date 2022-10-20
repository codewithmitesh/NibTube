// using es6 modules for that in package.json we added the type:module
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors';
// importing routes
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
//importing cookie parser
import cookieParser from "cookie-parser";

const app = express();
//config .env
dotenv.config();






// connect mongodb from here
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to Database successfully on " + process.env.MONGO_URI);
    })
    .catch((err) => {
      throw err;
    });
};
app.use(morgan('tiny'));
//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * To send cookies from axios and to handle the cors error simply we need to Do the the cors and Header setting as below 
 * ! important :- Order of functions matter in index.js server side
 * cors and header ko uper rakho and important settings ko uper hi rakho
 */
// here put credentials:true and origin:process.env.CLIENT_URL for cors error
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

// to handle the crossorigin ERROR  
app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  // res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X - PINGOTHER');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Content-Type', 'application/json;charset=UTF-8')
  next();
});

/**
 * What ever front end anf backend server talkes is routes and whatever server talks with database is /api/
 */
// Routes Structures 
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

//error handler for all [this is middleware to handle errors]
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});




// // Heroku Deployment
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html')); // relative path
  })
}


// listen on port 
const port = process.env.PORT || 5000;
app.listen(port, () => {
  //connecting to DB and port
  connect();
  console.log("Connected to Server Successfully on port " + port);
});