import { hash, compareSync } from "bcrypt";
import db from "../models/index.js";
import ApiError from "../error/ApiError.js";
import { Op } from "sequelize";
import { generateJwtAdmin } from "../utils/generatarJwt.js";
const Admin = db.admin;
const Partner = db.partner;



export const login = async (req, res, next) => {
  console.log(req);
  const { login, password } = req.body;
  const admin = await Admin.findOne({
    where: { login: login },
  });


  if (!admin) {
    return next(ApiError.internal("Неправильний логін або пароль"));
  }
  let comparePassword = compareSync(password, admin.password);
  if (!comparePassword) {
    return next(ApiError.internal("Неправильний логін або пароль"));
  }
  const token = generateJwtAdmin(admin.id,admin.partnerId,admin.login);
  res.status(200).send({token});

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

  await Admin.findOne({ where: { login: newAdmin.login } }).then((candidate) => {
    if (candidate) {
      return next(ApiError.badRequest("Дані не вірні"));
    }
  });

  const hashPassword = await hash(newAdmin.password, 5);
  newAdmin.password = hashPassword;
  await Admin.create(newAdmin).then((data)=>{
    res.status(200).send({
      message: "Admin was added successfully!",
    });
    return;
  }).catch((err)=>{
    return next(ApiError.badRequest("Спробуйте пізніше"));
  });
};

export const getAll = async (req, res) => {
  await Admin.findAll({
    where: { partnerId: { [Op.ne]: null } },
    include: [
      {
        model: Partner,
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

