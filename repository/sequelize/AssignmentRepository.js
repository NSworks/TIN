const Sequelize = require('sequelize');

const Assignment = require('../../model/sequelize/Assignment');
const Detective = require('../../model/sequelize/Detective');
const Case = require('../../model/sequelize/Case');

exports.getAssignments = () => {
    return Assignment.findAll({include: [
            {
                model: Detective,
                as: 'detective'
            },
            {
                model: Case,
                as: 'c'
            }]
    });
};


exports.getAssignmentById = (assignmentId) => {
    return Assignment.findByPk(assignmentId, {include: [
            {
                model: Detective,
                as: 'detective'
            },
            {
                model: Case,
                as: 'c'
            }]
    });
};

exports.createAssignment = (data) => {
    console.log(JSON.stringify(data));

    return Assignment.create({
        detective_id: data.detective_id,
        case_id: data.case_id,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo
    });
};

exports.updateAssignment = (assignmentId, data) => {
    return Assignment.update(data, {where: {_id: assignmentId }});
}

exports.deleteAssignment = (assignmentId) => {
    return Assignment.destroy({
        where: { _id: assignmentId }
    });
}

exports.deleteManyAssignments = (assignmentIds) => {
    return Assignment.find({ _id: { [Sequelize.Op.in]: assignmentIds }})
}