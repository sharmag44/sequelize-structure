'use strict';
const dbConfig = require('config').get('db');
global.Sequelize = require('sequelize');

module.exports.configure = async ({ force = false }) => {
    try {
        console.log("Database connecting: " + JSON.stringify(dbConfig));
        const sequelize = new Sequelize(
            dbConfig.database,
            dbConfig.username,
            dbConfig.password,
            {
                host: dbConfig.host,
                port: dbConfig.port,
                dialect: dbConfig.dialect,
                logging: false,
            }
        );
        global.sequelize = sequelize;
        //@ts-ignore
        global.db = require('../models');
        await sequelize.sync({ alter: false, force });
        console.log('db connected');
        return sequelize;
    } catch (error) {
        console.log(error);
        console.log('DB Connection Failed');
    }
};

