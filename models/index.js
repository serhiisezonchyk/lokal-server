import { Sequelize, DataTypes } from "sequelize";

import admin from "./admin.js";
import partner from "./partner.js";
import place from "./place.js";
import postCategory from "./post_category.js";
import post from "./post.js";
import productCategory from "./product_category.js";
import product from "./product.js";
import user from "./user.js";

import applyExtraSetup from "./extra_setup.js";

import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
  }
);

const db = {};

db.DataTypes = DataTypes;
db.sequelize = sequelize;

// Map the model names to their import statements
const models = {
    user,
    admin,
    partner,
    place,
    postCategory,
    post,
    productCategory,
    product,
  };
  
  for (const modelName in models) {
    const model = models[modelName](sequelize, DataTypes);
    db[modelName] = model;
  }
// db.user = user(sequelize, DataTypes);
// db.admin = admin(sequelize, DataTypes);
// db.partner = partner(sequelize, DataTypes);
// db.place = place(sequelize, DataTypes);
// db.postCategory = postCategory(sequelize, DataTypes);
// db.postInfo = postInfo(sequelize, DataTypes);
// db.post = post(sequelize, DataTypes);
// db.productCategory = productCategory(sequelize, DataTypes);
// db.product = product(sequelize, DataTypes);

applyExtraSetup(db);
export default db;
