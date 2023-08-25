// CREATE SERVER
const express = require("express");
const app = express();
const cors = require("cors");
const _PORT = process.env.PORT;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());

// CONNECT TO DB
const username = process.env.USERNAME,
  password = process.env.PASSWORD,
  database = process.env.DATABASE;

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.htiijog.mongodb.net/${database}?retryWrites=true&w=majority`
);

// USER MODEL
const UserModel = require("./models/Users");

// get request
app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

// create user
app.post("/createUser", async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();
  res.json(req.body);
});

// ADMIN MODEL
const AdminModel = require("./models/Admins");

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const admin = await AdminModel.findOne({ username });

  admin && res.json("Admin already exists!");

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newAdmin = new AdminModel({ username, password: hashedPassword });

  await newAdmin.save();

  return res.json("Admin created successfully!");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await AdminModel.findOne({ username });

  !admin && res.json("Admin doesn't exist !");

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  !isPasswordValid &&
    res.json({ message: "username or password is not correct" });

  const token = jwt.sign({ id: admin._id }, process.env.SECRET);

  return res.json({ token, adminID: admin._id });
});

app.listen(_PORT, () => {
  console.log("server works !");
});
