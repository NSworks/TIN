const Case = require("../../model/sequelize/Case");
const Assignment = require("../../model/sequelize/Assignment");
const Detective = require("../../model/sequelize/Detective");

exports.getCases = () => {
    return Case.findAll();
};

exports.getCaseById = (caseId) => {
    return Case.findByPk(caseId,
        {
            include: [{
                model: Assignment,
                as: 'assignments',
                include: [{
                    model: Detective,
                    as: 'detective'
                }]
            }]
        });
};

exports.createCase = (newCaseData) => {
    return Case.create({
        caseName: newCaseData.caseName,
        caseStatus: newCaseData.caseStatus
    });
};

exports.updateCase = (caseId, caseData) => {
    const caseName = caseData.caseName;
    const caseStatus = caseData.caseStatus;
    return Case.update(caseData, {where: {_id: caseId }});
};

exports.deleteCase = (caseId) => {
    return Case.destroy({
        where: { _id: caseId }
    });

};