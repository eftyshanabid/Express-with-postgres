const User = require('../models/User')

async function createUser(req,res){
        try{
                const {username,password,roll,email} = req.body;
                const newUser = await User.create({username,password,roll,email});

                res.status(200).json({
                        message: 'user created successfully',
                        newUser: newUser
                });
        }
        catch (error){
                console.error('Error creating user:', error);
                res.status(500).json({
                        error: error.message,
                        details: error
                })
        }
}

async function updateUser(req,res) {
    try{
        const {id} = req.params;
        
    }
}

module.exports = {createUser}