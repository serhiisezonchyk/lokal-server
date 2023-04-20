export default (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "admin",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      login: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone: { type: DataTypes.STRING, allowNull: false, unique: false },
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: false, allowNull: false },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      partnerId: { type: DataTypes.INTEGER, allowNull: true }, // make it nullable
    },
    {
      freezeTableName: true,
    }
  );

  return Admin;
};
