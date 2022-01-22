const profiles = require('../models').profiles;
//profiles.sync({ force: true });

module.exports = {
    create(req, res) {
        return profiles
            .create({
                address: req.body.address
            })
            .then(profile => res.status(201).send(profile))
            .catch(error => res.status(400).send(error));
    },
    get(req, res) {
        return profiles
            .findAll({
                limit: 10,
                order: [['createdAt', 'DESC']]
            })
            .then(profiles => res.status(201).send(profiles))
            .catch(error => res.status(400).send(error));
    },
};