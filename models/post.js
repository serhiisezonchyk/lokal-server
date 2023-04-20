export default (sequelize, DataTypes) => {
    const Post = sequelize.define(
      "post",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: { type: DataTypes.STRING, allowNull: false },
        img: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true},
        description: { type: DataTypes.STRING, allowNull: true },
        partnerId: { type: DataTypes.INTEGER, allowNull: true }, // make it nullable
      },
      {
        freezeTableName: true,
      }
    );
  
    return Post;
  };
  