const Joi = require('joi');
const express = require('express');

const user = require('../controllers/users')
const router = express.Router();

router.get('/', (req, res) => {
  const getUserSchema = {
    _id: Joi.string(),
    username: Joi.string().alphanum().max(16),
    phone: Joi.string().trim().regex(/^[0-9]{7,10}$/),
    occupation: Joi.string(),
    existing: Joi.boolean(),
    limit: Joi.number().default(null)
  };
  console.log(req.query);

  Joi.validate(req.query, getUserSchema)
    .then(value => user.getUser(value))
    .then(result => res.status(200).json(result))
    .catch(error => res.status(error.status || 400).json({ error: error.message }));

});

router.post('/', (req, res) => {
  const createUserSchema = {
    username: Joi.string().alphanum().max(16).required(),
    phone: Joi.string().trim().regex(/^[0-9]{7,13}$/).required(),
    occupation: Joi.string().required(),
    existing: Joi.boolean().required(),
    remarks: Joi.string().required()
  };

  Joi.validate(req.body, createUserSchema)
    .then(value => user.createUser(value))
    .then(result => res.status(result.status).json({ message: result.message, user: result.user }))
    .catch(error => res.status(error.status || 400).json({ error: error.message }));
});

module.exports = router;
