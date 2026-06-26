const cors = require("cors");

if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// TODO: Add your code here
app.use(express.json());

const corsOptions = {
    origin: "https://welovemoviesfrontend-02uq.onrender.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };

app.use(cors(corsOptions));
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use((req, res, next) => {
  next({
    status: 404,
    message: `Cannot be Found`,
  });
});

app.use((error, request, response, next) => {
  const { status = 500, message = "Something went wrong!" } = error;

  response.status(status).json({
    error: message,
  });
});

module.exports = app;