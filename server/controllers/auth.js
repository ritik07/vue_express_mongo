const confirmationMail = require("../mail/confirmationMail");
const LoginAert = require("../mail/loginAlert");
const UserSchema = require("../models/user");

exports.signup = (req, res) => {
  let name = req.body.name
  let email = req.body.email

  const user = new UserSchema({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    user.save(async (err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      await confirmationMail({ name, email })
      res.send({
        message: "User was registered successfully!", data: [{
          id: user._id,
          name: user.name,
          email: user.email,
        }]
      });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  }).exec(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    if (user.password !== req.body.password) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    let name = user.name
    let email = user.email
    await LoginAert({ name, email })
    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  });
};