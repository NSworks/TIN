const caseRepository = require('../repository/sequelize/CaseRepository');

exports.getCases = (req, res, next) => {
    caseRepository.getCases()
        .then(cases => {
            res.status(200).json(cases);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCaseById = (req, res, next) => {
    const caseId = req.params.caseId;
    caseRepository.getCaseById(caseId)
        .then(c => {
            if(!c) {
                res.status(404).json({
                    message: 'Case with id: '+caseId+' not found'
                })
            } else {
                res.status(200).json(c);
            }
        });
};

exports.createCase = (req, res, next) => {
    caseRepository.createCase(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateCase = (req, res, next) => {
    const caseId = req.params.caseId;
    caseRepository.updateCase(caseId, req.body)
        .then(result => {
            res.status(200).json({message: 'Case updated!', c: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteCase = (req, res, next) => {
    const caseId = req.params.caseId;
    caseRepository.deleteCase(caseId)
        .then(result => {
            res.status(200).json({message: 'Removed c', c: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};