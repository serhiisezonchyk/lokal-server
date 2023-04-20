export default (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define(
      "product_category",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: { type: DataTypes.STRING, allowNull: true },
        img: { type: DataTypes.STRING, allowNull: true},
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
  
    return ProductCategory;
  };
  