import db from "../models/index.js";

const Product_category = db.productCategory;

export const create = async (req, res) => {
  const product_category = {
    name: req.body.name,
    img: req.body.img,
  };
  await Product_category.create(product_category)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Product_category.",
      });
    });
};

export const getAll = async (req, res) => {
  await Product_category.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product_categorys.",
      });
    });
};

export const destroy = async (req, res) => {
  const id = req.params.id;
  await Product_category.destroy({ id: id })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Product_category was deleted successfully!",
        });
      } else {
        res.status(401).send({
          message: `Cannot delete product_category with id=${id}. Maybe product_category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete product_category with id=" + id,
      });
    });
};

export const edit = async (req, res) => {
  const id = req.params.id;
  await Product_category.update(req.body)
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Product_category was updated successfully!",
        });
      } else {
        res.status(401).send({
          message: `Cannot update product_category with id=${id}. Maybe product_category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update product_category with id=" + id,
      });
    });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  await Product_category.findOne({
    where: { id },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product_category.",
      });
    });
};
