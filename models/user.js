export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      phone: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      birthday: { type: DataTypes.DATEONLY, allowNull: true },
      balance: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0.0 },
    },
    {
      freezeTableName: true,
      hooks: {
        beforeValidate: (user, options) => {
          // Generate a 12-digit unique numeric ID
          user.id = BigInt(
            100000000000 + Math.floor(Math.random() * 900000000000)
          );
        },
      },
    }
  );

  return User;
};
