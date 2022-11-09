const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");

let USERS = [
  {
    id: 1,
    name: "Catalina",
    email: "catalina@catalina.com",
    password: "123456",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: USERS });
};

const signup = (req, res, next) => {
  const newUser = {
    ...req.body,
    id: uuidv4(),
  };
  USERS.push(newUser);
  res.status(201).json({ newUser: newUser });
};

const login = (req, res, next) => {
  const existingUser = USERS.find((user) => user.email === req.body.email);

  if (!existingUser) {
    throw new HttpError("Couldn't find user with this email address", 401);
  } else {
    res.json({ message: "Logged in" });
  }
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
