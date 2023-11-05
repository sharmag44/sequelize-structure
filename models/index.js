'use strict';
const fs = require('fs');
const path = require('path');
// @ts-ignore
const basename = path.basename(module.filename);

let initModels = () => {
  let db = {};
  fs.readdirSync(__dirname)
    .filter((file) => {
      return file.indexOf('.') !== 0 && file !== basename;
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize);
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.user.hasMany(db.post);
  db.post.belongsTo(db.user);

  db.user.hasMany(db.comment);
  db.comment.belongsTo(db.user);

  db.post.hasMany(db.comment);
  db.comment.belongsTo(db.post);

  return db;
};
module.exports = initModels();
