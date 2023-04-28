import { v4 } from "uuid";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
export const create = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const img = req.files.image;
  const fileName = v4() + path.extname(img.name);
  await img.mv(
    resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "static",
      fileName
    )
  ),
    (err) => {
      return res.status(500).send(err);
    };
  res.send({ url: fileName });
};

export const destroy = async (req, res) => {
    const fileName = req.params.fileName;
    const filePath = resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "static",
      fileName
    );

    fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not delete the file. " + err,
          });
        }
    
        res.status(200).send({ url: fileName });
      });
  };