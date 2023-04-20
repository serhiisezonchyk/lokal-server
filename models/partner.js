export default (sequelize, DataTypes) => {
    const Partner = sequelize.define(
      "partner",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {type: DataTypes.STRING, allowNull: false},
        description:{type: DataTypes.STRING, allowNull:false},
        img: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
        email: {type: DataTypes.STRING, allowNull: true},
      },
      {
        timestamps: false,
        freezeTableName: true,
      }
    );
  
    return Partner;
  };
  