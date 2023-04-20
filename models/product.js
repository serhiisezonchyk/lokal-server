export default (sequelize, DataTypes) => {
    const Product = sequelize.define(
      "product",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: { type: DataTypes.STRING, allowNull: false },
        img: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true},
        description: { type: DataTypes.STRING, allowNull: true },
        price: {type: DataTypes.FLOAT},
        //partnerId: { type: DataTypes.INTEGER, allowNull: true }, // make it nullable

      },
      {
        freezeTableName: true,
      }
    );
  
    return Product;
  };
  