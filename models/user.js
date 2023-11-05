'use strict';
module.exports = () => {
  var model = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      set: function (email) {
        if (typeof email == 'string') {
          this.setDataValue('email', email.toLowerCase());

        }
      },
    },
  };

  return sequelize.define('user', model);
};


