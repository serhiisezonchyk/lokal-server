import db from "../models/index.js";

const Post_category = db.postCategory;

export const create = async (req, res) => {
  const post_category = {
    name: req.body.name,
    img: req.body.img,
  };
  await Post_category.create(post_category)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Post_category.",
      });
    });
};

export const getAll = async (req, res) => {
  await Post_category.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving post_categorys.",
      });
    });
};

export const destroy = async (req, res) => {
  const id = req.params.id;
  await Post_category.destroy({ id: id })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Post_category was deleted successfully!",
        });
      } else {
        res.status(401).send({
          message: `Cannot delete post_category with id=${id}. Maybe post_category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete post_category with id=" + id,
      });
    });
};

export const edit = async (req, res) => {
  const id = req.params.id;
  await Post_category.update(req.body)
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Post_category was updated successfully!",
        });
      } else {
        res.status(401).send({
          message: `Cannot update post_category with id=${id}. Maybe post_category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update post_category with id=" + id,
      });
    });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  await Post_category.findOne({
    where: { id },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving post_category.",
      });
    });
};
