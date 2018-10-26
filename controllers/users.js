const User = require("../models/users");
function createUser(username, phone, occupation, existing, remarks) {
  return new Promise((resolve, reject) => {
    const customer = new User({
      username: username,
      phone: phone,
      occupation: occupation,
      existing: existing,
      remarks: remarks
    });
    customer.save()
      .then(() => resolve({
        status: 201,
        message: 'User added'
      }))
      .catch(err => {
        if(err.code == 11000){
          reject({
            status: 409,
            message: 'User already exists'
          });
        } else {
          reject({
            status: 500,
            message: 'Internal server error'
          });
        }
      });
  });
}

module.exports.createUser = createUser;
