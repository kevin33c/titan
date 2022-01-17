const controller = require('../controllers/index');

module.exports = (app) => {
  //profiles
  app.post('/api/profiles', controller.profiles.create);
  app.get('/api/profiles', controller.profiles.get);

};