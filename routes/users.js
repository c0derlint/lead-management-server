const Joi = require('joi');
const express = require('express');

const user = require('../controllers/users')
const router = express.Router();

const userSchema = {
  username: Joi.string().alphanum().max(16).required(),
  phone: Joi.number().required(),
  occupation: Joi.string().required(),
  existing: Joi.boolean().required(),
  remarks: Joi.string().required()
};

router.post('/', (req, res) => {
  const checkValid = Joi.validate(req.body, userSchema);
  if(checkValid.error) {
    res.status(400).json({ error: checkValid.error.details[0].message });
    return;
  }
  
  user.createUser(req.body.username, req.body.phone, req.body.occupation, req.body.existing, req.body.remarks)
    .then(result => res.status(result.status).json({ message: result.message }))
    .catch(error => res.status(error.status).json({ error: error.message }));
});

module.exports = router;
