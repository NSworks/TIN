const assignmentRepository = require('../repository/sequelize/AssignmentRepository');
const caseRepository = require('../repository/sequelize/CaseRepository');
const detectiveRepository = require('../repository/sequelize/DetectiveRepository');

exports.showAssignmentsList = (req, res, next) => {
    assignmentRepository.getAssignments()
        .then(assignments => {
            res.render('pages/detective-cases', {
                assignments: assignments,
                pageTitle: 'Lista przydziałów',
                navLocation: 'assignments'
            });
        });
}

exports.showAddAssignmentForm = (req, res, next) =>{
    let allDetectives, allCases;

    assignmentRepository.getAssignments()
        .then(assignments => {
            allAssignments = assignments;
            return detectiveRepository.getDetectives();
        })
        .then(detectives => {
            allDetectives = detectives;
            return caseRepository.getCases();
        })
        .then(cases => {
            allCases = cases;
            res.render('pages/add-assignment-form', {
                assignment: {},
                allDetectives: allDetectives,
                allCases: allCases,
                formMode: 'createNew',
                pageTitle: 'Nowy przydział',
                btnLabel: 'Dodaj przydział',
                formAction: '/assignments/add',
                navLocation: 'assignments',
                validationErrors: []
            });
        });
}

exports.showEditAssignmentForm = (req, res, next) => {
    const assignmentId = req.params.assignmentId;
    let allDetectives, allCases, allAssignments;

    assignmentRepository.getAssignments()
        .then(assignments => {
            allAssignments = assignments;
            return detectiveRepository.getDetectives();
        })
        .then(detectives => {
            allDetectives = detectives;
            return caseRepository.getCases();
        })
        .then(cases => {
            allCases = cases;
            return assignmentRepository.getAssignmentById(assignmentId);
        })
        .then(assignment => {
            res.render('pages/add-assignment-form', {
                assignment: assignment,
                allDetectives: allDetectives,
                allCases: allCases,
                allAssignments: allAssignments,
                formMode: 'edit',
                pageTitle: 'Edycja przydziału',
                btnLabel: 'Edytuj przydział',
                formAction: '/assignments/edit',
                navLocation: 'assignments',
                validationErrors: []
            });
        });
}


exports.showAssignmentDetails = (req, res, next) =>{
    const assignmentId = req.params.assignmentId;
    let allDetectives, allCases;

    detectiveRepository.getDetectives()
        .then(detectives => {
            allDetectives = detectives;
            return caseRepository.getCases();
        })
        .then(cases => {
            allCases = cases;
            return assignmentRepository.getAssignmentById(assignmentId)
        })
        .then(assignment => {
            res.render('pages/add-assignment-form', {
                assignment: assignment,
                allDetectives: allDetectives,
                allCases: allCases,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły przydziału',
                formAction: '',
                navLocation: 'assignments',
                validationErrors: []
            });
        });
}

exports.addAssignment = (req, res, next) => {
    let allDetectives, allCases, error;
    const assigmentData = { ...req.body };

    assignmentRepository.createAssignment(assigmentData)
        .then(result => {
            res.redirect('/assignments');
        })
        .catch(err => {
            error = err;
            return detectiveRepository.getDetectives();
        })
        .then(detectives => {
            allDetectives= detectives;
            return caseRepository.getCases()
        })
        .then(cases => {
            allCases = cases;
            res.render('pages/add-assignment-form', {
                assignment: {},
                allDetectives: allDetectives,
                allCases: allCases,
                formMode: 'createNew',
                pageTitle: 'Dodawanie przydziału',
                btnLabel: 'Dodaj przydział',
                formAction: '/assignments/add',
                navLocation: 'assignments',
                validationErrors: error.errors
            });
        });
};



exports.updateAssignment = (req, res, next) => {
    let allDetectives, allCases, error;
    const assignmentId = req.body._id;
    const assignmentData = { ...req.body };

    assignmentRepository.updateAssignment(assignmentId, assignmentData)
        .then(result => {
            res.redirect('/assignments');
        })
        .catch(err => {
            error = err;
            return detectiveRepository.getDetectives()
        })
        .then(detectives => {
            allDetectives = detectives;
            return caseRepository.getCases();
        })
        .then(cases => {
            allCases = cases;
            return assignmentRepository.getAssignmentById(assignmentId)
        })
        .then(assignment => {
            res.render('pages/add-assignment-form', {
                assignment: assignment,
                allDetectives: allDetectives,
                allCases: allCases,
                formMode: 'edit',
                pageTitle: 'Edycja przydziału',
                btnLabel: 'Edytuj przydział',
                formAction: '/assignments/edit',
                navLocation: 'assignments',
                validationErrors: error.errors
            });
        });
};

exports.deleteAssignment = (req, res, next) => {
    const assignmentId = req.params.assignmentId;

    assignmentRepository.deleteAssignment(assignmentId)
        .then(() => {
            res.redirect('/assignments');
        })
        .catch(err => {
            res.render('pages/add-assignment-form', {
                assignment: assignmentData,
                pageTitle: 'Usuwanie przydziału',
                formMode: 'delete',
                btnLabel: 'Usuń przydział',
                formAction: '/assignments/delete',
                navLocation: 'assignments',
                validationErrors: []
            })
        });
};