const caseRepository = require('../repository/sequelize/CaseRepository');

exports.showCaseList = (req, res, next) => {
    caseRepository.getCases()
        .then(cases => {
            res.render('pages/all-case-list', {
                cases: cases,
                navLocation: 'cases'
            });
        });
}
exports.showAddCaseForm = (req, res, next) => {
    res.render('pages/add-case-form', {
        c: {},
        pageTitle: 'Nowa sprawa',
        formMode: 'createNew',
        btnLabel: 'Dodaj sprawę',
        formAction: '/cases/add',
        navLocation: 'cases',
        validationErrors: []
    });
}

exports.showCaseDetails = (req, res, next) => {
    const caseId = req.params.caseId;
    caseRepository.getCaseById(caseId)
        .then(c => {
            res.render('pages/add-case-form', {
                c: c,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły sprawy',
                formAction: '',
                navLocation: 'cases',
                validationErrors: []
            });
        });
}

exports.showEditCaseForm = (req, res, next) => {
    const caseId = req.params.caseId;
    caseRepository.getCaseById(caseId)
        .then(c => {
            res.render('pages/add-case-form', {
                c: c,
                formMode: 'edit',
                pageTitle: 'Edycja sprawy',
                btnLabel: 'Edytuj sprawę',
                formAction: '/cases/edit',
                navLocation: 'cases',
                validationErrors: []
            });
        });
}


exports.addCase = (req, res, next) => {
    const caseData = { ...req.body };
    caseRepository.createCase(caseData)
        .then( result => {
            res.redirect('/cases');
        })
        .catch(err => {
            res.render('pages/add-case-form', {
                c: caseData,
                formMode: 'createNew',
                pageTitle: 'Nowa sprawa',
                btnLabel: 'Dodaj sprawę',
                formAction: '/cases/add',
                navLocation: 'cases',
                validationErrors: err.errors
            })
        });
};

exports.updateCase = (req, res, next) => {
    const caseId = req.body._id;
    const caseData = { ...req.body };
    let error;
    caseRepository.updateCase(caseId, caseData)
        .then( result => {
            res.redirect('/cases');
        })
        .catch(err => {
            error = err;
            return caseRepository.getCaseById(caseId)
        })
        .then(c => {
            res.render('pages/add-case-form', {
                c: c,
                formMode: 'edit',
                pageTitle: 'Edycja sprawy',
                btnLabel: 'Edytuj sprawę',
                formAction: '/cases/edit',
                navLocation: 'cases',
                validationErrors: error.errors
            })
        });
};

exports.deleteCase = (req, res, next) => {
    const caseId = req.params.caseId;
    const caseData = { ...req.body };
    caseRepository.deleteCase(caseId)
        .then( () => {
            res.redirect('/cases');
        })
        .catch(err => {
            res.render('pages/add-case-form', {
                c: caseData,
                formMode: 'delete',
                pageTitle: 'Usuwanie sprawy',
                btnLabel: 'Usuń sprawę',
                formAction: '/cases/delete',
                navLocation: 'cases',
                validationErrors: []
            })
        });
};