export default (sequelize, DataTypes) => {
    const Place = sequelize.define(
      "place",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        img: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
        address: {type: DataTypes.STRING, allowNull: false},
        phone: {type: DataTypes.STRING, allowNull:false},
        description:{type: DataTypes.STRING, allowNull:false},
        geom:{ type: DataTypes.GEOMETRY('POINT',4326), allowNull: false},
        openTime: {type: DataTypes.STRING, allowNull: false},
        closeTime: {type: DataTypes.STRING, allowNull: false},
      },
      {
        freezeTableName: true,
      }
    );
  
    return Place;
  };
  