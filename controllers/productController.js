import db from "../models/index.js";
import {v4} from "uuid"
import path, {resolve} from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const Product = db.product;
const ProductCategory = db.productCategory;

export const create = async (req, res) => {
  let { info } = req.body;

  //upload images
  const { imgs } = req.files;
  const fileNames = await Promise.all(
    imgs.map(async (img) => {
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
    })
  );

  const product = {
    title: req.body.title,
    img: fileNames,
    description: req.body.description,
    price: req.body.price,
    productCategoryId: req.body.productCategoryId,
  };
  await Product.create(product)
    .then((data) => {
      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: data.id,
          })
        );
      }
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Product.",
      });
    });
};

export const getAll = async (req, res) => {
  await Product.findAll({
    include: [{ model: ProductCategory }],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

export const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).send({ message: `Product with id=${id} not found.` });
    }

    // delete product images from the file system
    for (const img of product.img) {
      const imagePath = resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "..",
        "static",
        img
      );
      
      fs.unlink(imagePath);
    }

    // delete product from the database
    await Product.destroy({ where: { id }, truncate: { cascade: true } });
    res.status(200).send({
      message: "Product was deleted successfully!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Could not delete product with id=" + id,
    });
  }
};

export const edit = async (req, res) => {
  const { info } = req.body;
  const id = req.params.id;
  let obj = JSON.parse(info);

  ProductInfo.destroy({ where: { productId: id } });
  obj.map((data) => {
    let product_info = {
      title: data.title,
      description: data.description,
      productId: id,
    };
    ProductInfo.create(product_info);
  });

  await Product.update(req.body)
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Product was updated successfully!",
        });
      } else {
        res.status(401).send({
          message: `Cannot update product with id=${id}. Maybe product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update product with id=" + id,
      });
    });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  await Product.findOne({
    where: { id },
    include: [
      { model: ProductInfo, as: "product_info" },
      { model: ProductCategory },
    ],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product.",
      });
    });
};
