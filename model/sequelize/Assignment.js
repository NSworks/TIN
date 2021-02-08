const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Assignment = sequelize.define('Assignment', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dateFrom: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole data jest wymagane"
            },
        }
    },
    dateTo: {
        type: Sequelize.DATE,
        allowNull: true
    },
    detective_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
        }
    },
    case_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
        }
    }
});

module.exports = Assignment;