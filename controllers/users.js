const User = require("../models/users");

function createUser(userDetails) {
  return new Promise((resolve, reject) => {
    const customer = new User({
      username: userDetails.username,
      phone: userDetails.phone,
      occupation: userDetails.occupation,
      existing: userDetails.existing,
      remarks: userDetails.remarks
    });
    customer.save()
      .then(createdUser => resolve({
        status: 201,
        message: 'User added',
        user: createdUser
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

function getUser(userDetails) {
  const { limit } = userDetails;
  delete userDetails.limit;

  return new Promise((resolve, reject) => {
    User.find(userDetails)
      .limit(limit)
      .then(users => {
        if(users.length)
          resolve(users)
        else
          reject({
            status: 404,
            message: "User not found"
          })
      })
      .catch(error => reject({
        status: 500,
        message: "Internal Server Error"
      }))
  });
}

module.exports = {
  createUser: createUser,
  getUser: getUser
}
