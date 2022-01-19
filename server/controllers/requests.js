const requests = require('../models').requests;
//requests.sync({ force: true });

module.exports = {
    create(req, res) {
        return requests
            .create({
                request_address: req.body.request_address,
                address: req.body.address,
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
          order: [ [ 'createdAt', 'DESC' ]]
      })
      .then(requests => res.status(201).send(requests))
      .catch(error => res.status(400).send(error));
  },
};