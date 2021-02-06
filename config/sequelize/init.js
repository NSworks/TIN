const sequelize = require('./sequelize');

const Detective = require('../../model/sequelize/Detective');
const Case = require('../../model/sequelize/Case');
const Assignment = require('../../model/sequelize/Assignment');

module.exports = () => {
    Detective.hasMany(Assignment, {as: 'assignments', foreignKey: {name: 'detective_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Assignment.belongsTo(Detective, {as: 'detective', foreignKey: {name: 'detective_id', allowNull: false} } );
    Case.hasMany(Assignment, {as: 'assignments', foreignKey: {name: 'case_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Assignment.belongsTo(Case, {as: 'c', foreignKey: {name: 'case_id', allowNull: false} });

    let allDetectives, allCases;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Detective.findAll();
        })
        .then(detectives => {
            if( !detectives || detectives.length == 0 ) {
                return Detective.bulkCreate([
                    {firstName: 'Krzysztof', lastName: 'Kwardrat', practiceFrom: '1999-12-12'},
                    {firstName: 'Michał', lastName: 'Malarski', practiceFrom: '2000-2-15'},
                    {firstName: 'Barbara', lastName: 'Kordas', practiceFrom: '2004-10-10'}
                ])
                    .then( () => {
                        return Detective.findAll();
                    });
            } else {
                return detectives;
            }
        })
        .then( detectives => {
            allDetectives = detectives;
            return Case.findAll();
        })
        .then( cases => {
            if( !cases || cases.length == 0 ) {
                return Case.bulkCreate([
                    { caseName: 'Morderstwo Stefana O.', caseStatus: 'Z' },
                    { caseName: 'Zaginięcie Ewy S.', caseStatus: 'Z' }
                ])
                    .then( () => {
                        return Case.findAll();
                    });
            } else {
                return cases;
            }
        })
        .then( cases => {
            allCases = cases;
            return Assignment.findAll();
        })
        .then( assignments => {
            if( !assignments || assignments.length == 0 ) {
                return Assignment.bulkCreate([
                    {detective_id: allDetectives[0]._id, case_id: allCases[0]._id, dateFrom: '2001-01-01', dateTo: '2002-01-01'},
                    {detective_id: allDetectives[1]._id, case_id: allCases[0]._id, dateFrom: '2001-02-01', dateTo: '2002-01-01'},
                    {detective_id: allDetectives[2]._id, case_id: allCases[1]._id, dateFrom: '2001-01-01', dateTo: '2002-01-01'}
                ]);
            } else {
                return assignments;
            }
        });
};