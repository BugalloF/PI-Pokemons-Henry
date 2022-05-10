const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hp:{
      type: DataTypes.INTEGER,
      defaultValue:25
    },
    attack:{
      type: DataTypes.INTEGER,
      defaultValue:25
    },
    defense:{
      type: DataTypes.INTEGER,
      defaultValue:25

    },
    speed:{
      type: DataTypes.INTEGER,
      defaultValue:25
    },
    height:{
      defaultValue:25,
      type: DataTypes.INTEGER
    },
    weight:{
      defaultValue:25,
      type: DataTypes.INTEGER
    },
    img:{
      type: DataTypes.TEXT,
    }
  });
};
