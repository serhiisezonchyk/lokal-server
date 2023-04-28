import db from "../models/index.js"
import {v4} from "uuid"
import path, {resolve} from "path"
import fs from "fs"
import { fileURLToPath } from "url"
const Partner = db.partner;

export const create = async (req, res) => {

  const partner = {
    name: req.body.name,
    img: req.body.img,
    email: req.body.email,
    description: req.body.description,
  };
  await Partner.create(partner)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Partner.",
      });
    });
};

export const getAll = async (req, res) => {
  await Partner.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving partners.",
      });
    });
};

export const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    const partner = await Partner.findOne({ where: { id } });
    if (!partner) {
      return res.status(404).send({ message: `Partner with id=${id} not found.` });
    }

    // delete partner images from the file system
    for (const img of partner.img) {
      const imagePath = resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "..",
        "static",
        img
      );
      
      fs.unlink(imagePath);
    }

    // delete partner from the database
    await Partner.destroy({ where: { id }, truncate: { cascade: true } });
    res.status(200).send({
      message: "Partner was deleted successfully!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Could not delete partner with id=" + id,
    });
  }
};

export const edit = async (req, res) => {
  const id = req.params.id;

  await Partner.update(req.body)
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Partner was updated successfully!",
        });
      } else {
        res.status(401).send({
          message: `Cannot update partner with id=${id}. Maybe partner was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update partner with id=" + id,
      });
    });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  await Partner.findOne({
    where: { id },
    include: [{ model: PartnerInfo, as: "partner_info" }],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving partner.",
      });
    });
};
