import jwt from "jsonwebtoken";

export const generateJwtAdmin = (id, partnerId, login) => {
  return jwt.sign({ id, partnerId, login }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

export const generateJwtUser = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
