const User = require('../models/User');
const {generate} = require('../utils/password');
const {validationResult} = require('express-validator');
const {validate} = require('../utils/password');
const {app_secret} = require('../utils/password');


async function createUser(req,res){
        try{
                const errors = validationResult(req);
                if(!errors.isEmpty()){
                    return res.status(422).json({
                        msg:"error in user input"
                    })
                }

                const username = req.body.username;
                const roll = req.body.roll;
                const email = req.body.email;

                const chunks = generate(passwordRaw);

                const password = `${chunks.hash}.${chunks.salt}`;

                const newUser = await User.create({username,password,roll,email})

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
        const id = req.params.id;
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

async function deleteUser(req,res){
   
   try{
    const id = req.params.id;
    const user = await User.findByPk(id);

    if(!user)
    {
        return res.status(404).json({
            error: 'user not found',
            message : `user with ${id} do not exist`
        })
    }

    await user.destroy();
    res.status(200).json({
        message : 'User has been deleted',
        deletedUser : {
            id : user.id,
            name : user.name
        }
    })
   }
   catch(error){
     res.status(500).json({
        message : 'failed to delete user',
        details : error
     })
   }
}

async function login(req,res){
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json({ errors: errors.array() });
        }
        
        const {password, email} = req.body;
        
        const user = await User.findOne({
            where: {
                email
            }
        });
        
        if (!user) {
            return res.status(401).json({error: true, message: "User not found"});
        }
    
        const [salt, hash] = user.password.split(".");
        const {name, email: userEmail, id} = user;
        const valid = validate(password, hash, salt);
        
        if (valid) {
            const token = jwt.sign({id, name, email: userEmail}, app_secret);
            res.json({
                error: false,
                token,
                user: {
                    id,
                    name,
                    email: userEmail
                }
            });
        } else {
            res.status(401).json({error: true, message: "Password incorrect"});
        }
        
    } catch (error) {
        res.status(500).json({error: true, message: error.message});
    }
}


module.exports = {createUser,updateUser,deleteUser,login}