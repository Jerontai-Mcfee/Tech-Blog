const Sequelize = require('sequelize');
// import processing environment modules
//  allows for storing the envirnoment configuration separte from the base code.
require('dotenv').config();


//  passes the database environment parameters
// JawsDB is a Database-as-a-Service provider
//  The following will defer to the JAWSDB_URL environment
//  if it is not available, the localhost environment is used.
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      // uses MySQL DB language dialect
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
      // globally defines database definition parameters so it is not
      //    needed on each model
      define: {
        timestamps: false,
        // this stops sequelize from pluralsizing the Table names
        freezeTableName: true,
        underscored: true,
      },
    });

module.exports = sequelize