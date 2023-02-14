const dbConfig = require("../config/db.config.js");
const tripModel = require("./trip.model.js");
const Sequelize = require("sequelize");
const sequelizeDb = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operationsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);
const db = {};

db.Sequelize = sequelizeDb;
db.Trips = tripModel(sequelizeDb, Sequelize);
module.exports = db;
