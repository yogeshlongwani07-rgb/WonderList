if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ExpressError = require("./utils/ExpressError");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
const listings = require("./Routes/listings.js");
const post = require("./Routes/posting.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const User = require("./models/user.js");
const passport = require("passport");
const passportLocal = require("passport-local");
const user = require("./Routes/user.js");
require("dotenv").config();
const dbUrl = process.env.ATLASPASS;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in mongo session STORE", err);
});

const expSess = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(expSess));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then((res) => {
    console.log("Mongo OK");
  })
  .catch((err) => {
    console.log("error");
  });

app.use("/listings", listings);
app.use("/post", post);
app.use("/", user);

app.get("/start", (req, res) => {
  res.render("Welcome.ejs");
});

app.get("/possible", (req, res, next) => {
  try {
    res.json({ name: "Yogesh" });
  } catch (err) {
    next(err);
  }
});

app.all("*", (req, res) => {
  throw new ExpressError("Page Not Found!", 404);
});

app.use((err, req, res, next) => {
  const { message = "Something Went Wrong!", status = 400 } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("Server OK");
});
