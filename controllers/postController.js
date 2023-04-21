import db from "../models/index.js";
import {v4} from "uuid"
import path, {resolve} from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const Post = db.post;
const PostCategory = db.postCategory;
const Partner = db.partner;

export const create = async (req, res) => {

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

  const post = {
    title: req.body.title,
    img: fileNames,
    description: req.body.description,
    partnerId: req.body.partnerId,
    postCategoryId: req.body.postCategoryId,
  };
  await Post.create(post)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Post.",
      });
    });
};

export const getAll = async (req, res) => {
  await Post.findAll({
    include: [{ model: PostCategory },{model: Partner}],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving posts.",
      });
    });
};

export const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(404).send({ message: `Post with id=${id} not found.` });
    }

    // delete post images from the file system
    for (const img of post.img) {
      const imagePath = resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "..",
        "static",
        img
      );
      
      fs.unlink(imagePath);
    }

    // delete post from the database
    await Post.destroy({ where: { id }, truncate: { cascade: true } });
    res.status(200).send({
      message: "Post was deleted successfully!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Could not delete post with id=" + id,
    });
  }
};


export const edit = async (req, res) => {
  const id = req.params.id;

  await Post.update(req.body)
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Post was updated successfully!",
        });
      } else {
        res.status(401).send({
          message: `Cannot update post with id=${id}. Maybe post was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not update post with id=" + id,
      });
    });
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  await Post.findOne({
    where: { id },
    include: [{ model: PostCategory }],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving post.",
      });
    });
};
