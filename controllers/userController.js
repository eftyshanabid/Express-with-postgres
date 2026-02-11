const User = require('../models/User')

async function createUser(req,res){
        try{
                const username = req.body.username;
                const password = req.body.password;
                const roll = req.body.roll;
                const email = req.body.email;

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
    try{
        const username = req.body.username;
        const password = req.body.password;
        
       const db_username = await User.findOne()

       if((db_username == username) && (db_password == password)){
        res.status(200).json({
            msg : "login successful",
            profile : {
                username : username,
                password : password
            }
        })
       }
       res.status(404).json({
        msg : "user not found"
       })
    }
    catch(error)
    {   console.log(error);
        res.status(500).json({
            msg : "login not successful",
            input: req.body
        })
    }
}

module.exports = {createUser,updateUser,deleteUser,login}