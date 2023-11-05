'use strict';
module.exports = () => {
  var model = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    comment: {
      type: Sequelize.TEXT("medium"),
      allowNull: true,
      defaultValue: null,
    },
  };

  return sequelize.define('comment', model);
};