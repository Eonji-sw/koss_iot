const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.route('/contacts')
  .get(async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

/*router.route('/contacts/new')
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });*/

router.route('/contacts/:id')
  .patch(async (req, res, next) => {
    try {
      const result = await User.update({
        username: req.params.username,
      }, {
        email: req.body.email,
      }, {
        phone: req.body.phone,
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      //const result = await User.remove({ username: req.params.username });
      //res.json(result);
      const result = req.url.split('/')[2];
      await User.remove(result);
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
