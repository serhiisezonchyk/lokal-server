import { hash, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import ApiError from "../error/ApiError.js";
const User = db.user;

const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

export const login = async (req, res, next) => {
  const { phone, password } = req.body;
  const user = await User.findOne({
    where: { phone: phone },
  });

  if (!user) {
    return next(ApiError.internal("Incorrect phone or password"));
  }
  let comparePassword = compareSync(password, user.password);
  if (!comparePassword) {
    return next(ApiError.internal("Incorrect phone or password"));
  }
  const token = generateJwt(user.id);
  res.status(200).send({ token });
};

export const check = async (req, res, next) => {
  const token = generateJwt(req.user.id);
  res.status(200).send({ token });
};

export const create = async (req, res, next) => {

  const newUser = {
    phone: req.body.phone,
    password: req.body.password,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthday: req.body.birthday,
    balance: req.body.balance,
  };

  await User.findOne({ where: { phone: newUser.phone } }).then((candidate) => {
    if (candidate) {
      return next(ApiError.badRequest("Спробуйте пізніше"));
    }
  });

  const hashPassword = await hash(newUser.password, 5);
  newUser.password = hashPassword;
  await User.create(newUser).then((user)=>{
    const token = generateJwt(user.id);
    res.status(200).send({ token });
  }).catch((err)=>{
    console.log(err);
    return next(ApiError.badRequest("Спробуйте пізніше"));
  });

};

export const destroy = async (req, res) => {
  const id = req.params.id;
  await User.destroy({ id: id })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "User was deleted successfully!",
        });
      } else {
        res.status(401).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};

export const getAll = async (req, res) => {
  await User.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  await User.findOne({ where: { id } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};
