const detectiveRepository = require('../repository/sequelize/DetectiveRepository');

exports.getDetectives = (req, res, next) => {
    detectiveRepository.getDetectives()
        .then(detective => {
            res.status(200).json(detective);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getDetectiveById = (req, res, next) => {
    const detectiveId = req.params.detectiveId;
    detectiveRepository.getDetectiveById(detectiveId)
        .then(detective => {
            if(!detective) {
                res.status(404).json({
                    message: 'Detective with id: '+detectiveId+' not found'
                })
            } else {
                res.status(200).json(detective);
            }
        });
};

exports.createDetective = (req, res, next) => {
    detectiveRepository.createDetective(req.body)
        .then(newDetective => {
            res.status(201).json(newDetective);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateDetective = (req, res, next) => {
    const detectiveId = req.params.detectiveId;
    detectiveRepository.updateDetective(detectiveId, req.body)
        .then(result => {
            res.status(200).json({message: 'Detective updated!', detective: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteDetective = (req, res, next) => {
    const detectiveId = req.params.detectiveId;
    detectiveRepository.deleteDetective(detectiveId)
        .then(result => {
            res.status(200).json({message: 'Removed detective', detective: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};