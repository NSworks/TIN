const Detective = require("../../model/sequelize/Detective");
const Assignment = require("../../model/sequelize/Assignment");
const Case = require("../../model/sequelize/Case");


exports.getDetectives = () => {
    return Detective.findAll();
};

exports.getDetectiveById = (detectiveId) => {
    return Detective.findByPk(detectiveId,
        {
            include: [{
                model: Assignment,
                as: 'assignment',
                include: [{
                    model: Case,
                    as: 'c'
                }]
            }]
        });
};

exports.createDetective = (newDetectiveData) => {
    return Detective.create({
        firstName: newDetectiveData.firstName,
        lastName: newDetectiveData.lastName,
        practiceFrom: newDetectiveData.practiceFrom
    });
};

exports.updateDetective = (detectiveId, detectiveData) => {
    const firstName = detectiveData.firstName;
    const lastName = detectiveData.lastName;
    const practiceFrom = detectiveData.practiceFrom;
    return Detective.update(detectiveData, {where: {_id: detectiveId }});
};

exports.deleteDetective = (detectiveId) => {
    return Detective.destroy({
        where: { _id: detectiveId }
    });

};