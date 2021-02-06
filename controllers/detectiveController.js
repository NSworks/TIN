const detectiveRepository = require('../repository/sequelize/DetectiveRepository');

exports.showDetectiveList = (req, res, next) => {
    detectiveRepository.getDetectives()
        .then(detectives => {
            res.render('pages/detective-list', {
                detectives: detectives,
                navLocation: 'detectives'
            });
        });
}

exports.showAddDetectiveForm = (req, res, next) => {
    res.render('pages/detective-form', {
        detective: {},
        pageTitle: 'Nowy detektyw',
        formMode: 'createNew',
        btnLabel: 'Dodaj detektywa',
        formAction: '/detectives/add',
        navLocation: 'detectives',
        validationErrors: []
    });
}


exports.showDetectiveDetails = (req, res, next) => {
    const detectiveId = req.params.detectiveId;
    detectiveRepository.getDetectiveById(detectiveId)
        .then(detective => {
            res.render('pages/detective-form', {
                detective: detective,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły detektywa',
                formAction: '',
                navLocation: 'detectives',
                validationErrors: []
            });
        });
}

exports.showEditDetectiveForm = (req, res, next) => {
    const detectiveId = req.params.detectiveId;
    detectiveRepository.getDetectiveById(detectiveId)
        .then(detective => {
            res.render('pages/detective-form', {
                detective: detective,
                formMode: 'edit',
                pageTitle: 'Edycja detektywa',
                btnLabel: 'Zapisz',
                formAction: '/detectives/edit',
                navLocation: 'detectives',
                validationErrors: []
            });
        });
}


exports.addDetective = (req, res, next) => {
    const detectiveData = { ...req.body };

    detectiveRepository.createDetective(detectiveData)
        .then( result => {
            res.redirect('/detectives');
        })
        .catch(err => {
        res.render('pages/detective-form', {
            detective: detectiveData,
            pageTitle: 'Nowy detektyw',
            formMode: 'createNew',
            btnLabel: 'Dodaj detektywa',
            formAction: '/detectives/add',
            navLocation: 'detectives',
            validationErrors: err.errors
        })
    });
};

exports.updateDetective = (req, res, next) => {
    const detectiveId = req.body._id;
    const detectiveData = { ...req.body };
    let error;
    detectiveRepository.updateDetective(detectiveId, detectiveData)
        .then( result => {
            res.redirect('/detectives');
        })
        .catch(err => {
            error = err;
            return detectiveRepository.getDetectiveById(detectiveId)
        })
        .then(detective => {
            res.render('pages/detective-form', {
                detective: detective,
                formMode: 'edit',
                pageTitle: 'Edycja detektywa',
                btnLabel: 'Edytuj detektywa',
                formAction: '/detectives/edit',
                navLocation: 'detectives',
                validationErrors: error.errors
            })
        });
};

exports.deleteDetective = (req, res, next) => {
    const detectiveId = req.params.detectiveId;
    const detectiveData = { ...req.body };

    detectiveRepository.deleteDetective(detectiveId)
        .then(() => {
            res.redirect('/detectives');
        })
        .catch(err => {
            res.render('pages/detective-form', {
                detective: detectiveData,
                formMode: 'delete',
                pageTitle: 'Usuń detektywa',
                btnLabel: 'Usuń detektywa',
                formAction: '/detectives/delete',
                navLocation: 'detectives',
                validationErrors: []
            })
        });

};