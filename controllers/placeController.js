import db from "../models/index.js";
import {v4} from "uuid"
import path, {resolve} from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const Place = db.place;
const PlaceCategory = db.placeCategory;

export const create = async (req, res) => {
    //upload images
    const { imgs } = req.files;
    const fileNames = await Promise.all(imgs.map(async (img) => {
      const fileName = v4() + ".jpg";
      await img.mv(
        resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          "..",
          "static",
          fileName
        )
      );
      return fileName;
    }));

  const place = {
    img: fileNames,
    address: req.body.address,
    phone: req.body.phone,
    geom: req.body.geom,
    openTime: req.body.openTime,
    closeTime: req.body.closeTime,
    placeCategoryId: req.body.placeCategoryId,
    description: req.body.description,
  };
  await Place.create(place)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Place.",
      });
    });
};

export const getAll = async (req, res) => {
  await Place.findAll({
    include: [{ model: PlaceCategory }],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving places.",
      });
    });
};

export const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    const place = await Place.findOne({ where: { id } });
    if (!place) {
      return res.status(404).send({ message: `Place with id=${id} not found.` });
    }

    // delete place images from the file system
    for (const img of place.img) {
      const imagePath = resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "..",
        "static",
        img
      );
      
      fs.unlink(imagePath);
    }

    // delete place from the database
    await Place.destroy({ where: { id }, truncate: { cascade: true } });
    res.status(200).send({
      message: "Place was deleted successfully!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Could not delete place with id=" + id,
    });
  }
};

export const edit = async (req, res) => {
  const id = req.params.id;

  await Place.update(req.body)
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Place was updated successfully!",
        });
      } else {
        res.status(401).send({
          message: `Cannot update place with id=${id}. Maybe place was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update place with id=" + id,
      });
    });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  await Place.findOne({
    where: { id },
    include: [{ model: PlaceCategory }],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving place.",
      });
    });
};
