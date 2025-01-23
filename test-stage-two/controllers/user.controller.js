const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user.model');
const Organization = require('../model/organization.model')
require('dotenv').config();


async function createUser(req, res) {
    try {
      const {email, userData} = req.body; // Get user data from request body
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(422).json({
          errors: [{ field: 'email', message: 'Email already in use. Try another email' }],
        });
      }

      const SALT_ROUNDS = 8
      userData.password = bcrypt.hashSync(userData.password, SALT_ROUNDS);
      const user = await User.create(userData);

      const transaction = await sequelize.transaction();
      try {
        const user = await User.create(userData, { transaction });
        const organizationName = `${user.firstName}'s Organisation`;
        const organization = await Organization.create({ name: organizationName }, { transaction });
  
        // Associate user with organization (using UserOrganization if defined)
        await user.addOrganization(organization, { transaction });
  
        // ... commit transaction on success
  
      } catch (error) {
        await transaction.rollback(); // Rollback on errors
        throw error; // Re-throw for error handling
      }
      // Generate JWT token
    const payload = { 
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone, 
    }; 
    const secret = process.env.JWT_SECRET; // Replace with your JWT secret

    const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Set expiry time
    const response = {
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone, // Include phone number if validated
        },
      },
    }

    res.status(201).json(response); 
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(err => ({
          field: err.path,
          message: err.message,
        }));
        res.status(422).json({
          errors,
        });
      } 
      else if (error) {
        res.status(400).json({
          status: 'Bad request',
          message: 'Registration unsuccessful',
          error 
        }); 
      }
      else {
      
        console.error(error);
        res.status(500).json({
          status: 'Error',
          message: 'Internal server error',
        });
      }
    }
  }

 

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(422).json({ message: 'Invalid email or password' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(422).json({ message: 'Invalid email or password' });
    }

  
    const payload = { 
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone, 
    };

    const secret = process.env.JWT_SECRET; 
    const token = jwt.sign(payload, secret, { expiresIn: '1h' }); 

    const response = {
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone, 
        },
      },
    }

    res.status(201).json(response); 

  } catch (error) {
    console.error(error);
    if(error){
      res.status(400).json({
        status: 'Bad request',
        message: 'Authentication failed',
        error 
    })
    
    res.status(500).json({ message: 'Internal server error' });
  }
}

}

const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(422).json({ message: 'User not found' });
    }
    const response = {
      status: 'success',
      message: `Welcome ${user.firstName} ${user.lastName}, here is your details`,
      data: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone, 
      },
    };
  }
  catch(error){
    console.error(error);
    if(error){
      res.status(400).json({
        status: 'Bad request',
        message: "Can't get user data",
        error 
    })
  }
  }

}

  
module.exports = { createUser, loginUser, getUserData}