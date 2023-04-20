import { hash, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import ApiError from "../error/ApiError.js";
import { Op } from "sequelize";
const Admin = db.admin;
const Role = db.role;

const generateJwt = (id, email, phone, partnerId ) => {
  return jwt.sign({ id, email, phone, partnerId }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

export const login = async (req, res, next) => {
  console.log("hello1");
  const { login, password } = req.body;
  const admin = await Admin.findOne({
    where: { login },
    include: [
      {
        model: Role,
      },
    ],
  });


  if (!admin) {
    return next(ApiError.internal("Incorrect login or password"));
  }
  let comparePassword = compareSync(password, admin.password);
  if (!comparePassword) {
    return next(ApiError.internal("Incorrect login or password"));
  }
  const token = generateJwt(admin.id, admin.email, admin.phone, admin.partnerId);
  res.status(200).send({ token });
};

export const check = async (req, res, next) => {
  const token = generateJwt(req.admin.id, req.admin.email, req.admin.phone, req.admin.partnerId);
  res.status(200).send({ token });
};

export const create = async (req, res, next) => {
  const newAdmin = {
    login: req.body.login,
    phone: req.body.phone,
    password: req.body.password,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    partnerId: req.body.partnerId,

  };

  if (!newAdmin.login || !newAdmin.password) {
    return next(ApiError.badRequest("Incorrect email or password"));
  }
  await Admin.findOne({ where: { phone: newAdmin.phone } }).then((candidate) => {
    if (candidate) {
      return next(ApiError.badRequest("This admin is already exist"));
    }
  });

  const hashPassword = await hash(newAdmin.password, 5);
  newAdmin.password = hashPassword;
  const admin = await Admin.create(newAdmin);
  // const token = generateJwt(admin.id, admin.email, admin.role.name);
  // res.status(200).send({ token });
};

export const getAll = async (req, res) => {
  await Admin.findAll({
    where: { partnerId: { [Op.ne]: null } },
    include: [
      {
        model: Role,
      },
    ],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving admins.",
      });
    });
};
export const destroy = async (req, res) => {
  const id = req.params.id;
  await Admin.destroy({ id: id })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Admin was deleted successfully!",
        });
      } else {
        res.status(401).send({
          message: `Cannot delete admin with id=${id}. Maybe admin was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete admin with id=" + id,
      });
    });
};

