const { use } = require('react');
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
        const {username,password,roll,email} = req.body;
        
        if(!id){
            return res.status(400).json({error : 'user not found'})
        }

        const user = await User.findByPk(id);

        if(username !== undefined)
        {
            user.username = username;
        }
        if(password !== undefined)
        {
            user.password = password;
        }
        if(roll !== undefined)
        {
            user.roll = roll;
        }  
        if(email !== undefined) {
            user.email = email;
        }
        await user.save();

        res.status(200).json({
            message: 'user updated successfully',
            user
        })
        

    }
    catch(error){
        console.error('Error updating user:', error);
        res.status(500).json({
            error: error.message,
            details: error
        })
    }
}

module.exports = {createUser,updateUser}