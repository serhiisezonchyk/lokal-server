import express, { urlencoded } from "express";
import dotenv from "dotenv";
import db from "./models/index.js";
import cors from "cors"
import router from "./routes/index.js"
import fileUpload from "express-fileupload";
import errorHandler from "./middleware/ErrorHandling.js"
import { fileURLToPath } from 'url';
import path, { resolve } from "path";
dotenv.config();

const app = express();

db.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

app.use(cors());

app.use(express.json());
app.use(express.static(resolve(path.dirname(fileURLToPath(import.meta.url)), "static")))
app.use(fileUpload({}));

app.use('/api', router);

app.use(errorHandler);

app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});