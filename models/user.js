// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    phonenumber: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  User.associate = function(models) {
    // Associating User with their Pets
    // When a User is deleted, also delete any associated Pets
    User.hasMany(models.lostFoundPet, {
      onDelete: "cascade"
    });
  };

  return User;
};
