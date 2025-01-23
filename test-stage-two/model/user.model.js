const Sequelize = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define(
  "User",
  {
    userId: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          //Restrict to alphabetical characters only
          msg: "firstName must contain only letters",
        },
        customValidator(value) {
          if (typeof value !== "string") {
            throw new Error("firstName must be a string");
          }
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          // (Optional) Restrict to alphabetical characters only
          msg: "lastName must contain only letters",
        },
        customValidator(value) {
          if (typeof value !== "string") {
            throw new Error("lastName must be a string");
          }
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 13], // Minimum and maximum password length
          msg: "Password must be between 8 and 13 characters",
        },
      },
    },
    phone: {
      type: Sequelize.STRING,
      validate: {
        isPhoneNum: {
          msg: "Invalid phone number format",
        },
      },
    },
  },
  {
    // Model options for validation checks
    validate: {
      checkEmail: function (value) {
        if (!this.email.isEmail) {
          throw new Error("Invalid email format");
        }
      },
    },
  }
);
User.belongsToMany(Organization, { through: 'UserOrganization' });

module.exports = User;
