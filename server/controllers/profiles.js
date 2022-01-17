const profiles = require('../models').profiles;
//profiles.sync({ force: true });

module.exports = {
    create(req, res) {
        return profiles
            .create({
                type: req.body.type,
                name: req.body.name,
            })
            .then(profile => res.status(201).send(profile))
            .catch(error => res.status(400).send(error));
    },
    get(req, res) {
        return profiles
        .findAll()
        .then(profile => res.status(201).send(profile))
        .catch(error => res.status(400).send(error));
    },
};