const assignmentRepository = require('../repository/sequelize/AssignmentRepository');

exports.getAssignments = (req, res, next) => {
    assignmentRepository.getAssignments()
        .then(assignments => {
            res.status(200).json(assignments);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAssignmentById = (req, res, next) => {
    const assignmentId = req.params.assignmentId;
    assignmentRepository.getAssignmentById(assignmentId)
        .then(a => {
            if(!a) {
                res.status(404).json({
                    message: 'Assignment with id: '+assignmentId+' not found'
                })
            } else {
                res.status(200).json(a);
            }
        });
};

exports.createAssignment = (req, res, next) => {
    assignmentRepository.createAssignment(req.body)
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

exports.updateAssignment = (req, res, next) => {
    const assignmentId = req.params.assignmentId;
    assignmentRepository.updateAssignment(assignmentId, req.body)
        .then(result => {
            res.status(200).json({message: 'Assignment updated!', assignment: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteAssignment = (req, res, next) => {
    const assignmentId = req.params.assignmentId;
    assignmentRepository.deleteAssignment(assignmentId)
        .then(result => {
            res.status(200).json({message: 'Removed assignment', assignment: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};