const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'participants';

const Participants = sequelize.define('Participants', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  profession: {
    type: Sequelize.ENUM,
    values: ['Employed', 'Student'],
  },
  locality: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  no_of_guest: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  address: {
    type: Sequelize.STRING(60),
    allowNull: false,
  },
}, {
  tableName,
});

module.exports = Participants;
