//imports
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const session = require("express-session");
const { connectUserDb1 } = require("./config/dbConnection");
const regroutes = require("./routes/regRoutes");
const employeroutes = require("./routes/employeRoutes");
const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

app.use(cookieParser());
//Database Connection
connectUserDb1();
//View Engine
app.set("view engine", "ejs");
app.use(
  session({
    secret: "My secret key",
    saveUninitialized: true,
    resave: false,
  })
);

//Flash message middleware
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.static(__dirname + "/assets"));

//Routes
app.use("/", regroutes);
app.use("/employees/", employeroutes);

app.listen(PORT, () => {
  console.log(`Server is listening @ localhost:${PORT}`);
});
