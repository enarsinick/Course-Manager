var express = require('express')
var router = express.Router()
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Find specific user
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    // Save authenticated user data to variable
    // and return selected data to client
    const user = req.currentUser;
    res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
}));

// Create a new user
router.post('/users', asyncHandler(async (req, res) => {
    try {
        let user = req.body;
        if (user.password) { user.password = bcrypt.hashSync(user.password, 10);}
         await User.create(user);
        res.status(201)
            .location('/')
            .end();
    } catch(error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });   
          } else {
            throw error;
          }
    }
}));

module.exports = router;