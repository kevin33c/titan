const requests = require('../models').requests;
//requests.sync({ force: true });

module.exports = {
    create(req, res) {
        return requests
            .create({
                requester_address: req.body.requester_address,
                profile_address: req.body.profile_address,
                amount: req.body.amount,
                message: req.body.message
            })
            .then(request => res.status(201).send(request))
            .catch(error => res.status(400).send(error));
    },
    get(req, res) {
        return requests
            .findAll({
                limit: 10,
                order: [['createdAt', 'DESC']]
            })
            .then(requests => res.status(201).send(requests))
            .catch(error => res.status(400).send(error));
    },
    findRequestByAddress(req, res) {
        return requests
            .findAll({
                where:
                {
                    profile_address: req.params.addressId
                },
                limit: 10,
                order: [['createdAt', 'DESC']]
            })
            .then(request => res.status(201).send(request))
            .catch(error => res.status(400).send(error));
    },
    acceptRequestById(req, res) {
        return requests
            .update({
                is_accepted: true
            },
                {
                    where:
                        { id: req.params.id }
                })
            .then(request => res.status(201).send(request))
            .catch(error => res.status(400).send(error));
    },
};