const controller = require('../controllers/index');

module.exports = (app) => {
  //profiles
  app.post('/api/profiles', controller.profiles.create);
  app.get('/api/profiles', controller.profiles.get);

  //contracts
  app.post('/api/contracts', controller.contracts.create);
  app.get('/api/contracts', controller.contracts.get);

};