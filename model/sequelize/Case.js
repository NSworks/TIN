const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Case = sequelize.define('Case', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    caseName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,120],
                msg: "Pole powinno zawierać od 2 do 120 znaków"
            }
        }
    },
    caseStatus: {
        type: Sequelize.CHAR,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isIn: {
                args: [['A', 'Z']],
                msg: "Musi być wielkie A lub Z"
            }
        }
    }
});

module.exports = Case;