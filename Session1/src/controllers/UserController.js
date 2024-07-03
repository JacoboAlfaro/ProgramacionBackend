const {PrismaClient} = require('@prisma/client');
const { hashSync } = require('bcrypt');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    console.log("Se crea peticion")
    const {
        fullname,
        first_surname, 
        second_surname,
        identification,   
        email,            
        password,   
    }  = req.body;

    const avatar = req.file ? req.file.filename : null;

    try{
        const newUser = await prisma.user.create({
            data: {
                fullname,
                first_surname, 
                second_surname,
                identification,   
                email,            
                password: hashSync(password,10),   
                avatar,
            }
        })
        console.log("New User", newUser);
        res.status(201).json ({
            message: "user created",
            newUser,
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error creating user",
            error,
        })
    }
}

const getUsers =  async (req, res) => {
    try{
        const users = await prisma.user.findMany()
        res.status(200).json ({
            message: "All users",
            users,
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error getting users",
            error,
        })
    }
}

const getUserById = async(req, res) => {
    const {id} = req.params;
    const userId = parseInt(id);

    try{
        const user = await prisma.user.findUnique({
            where:{
                id: userId
            }
        })
        res.status(200).json({
            message: `user with id: ${userId}`,
            user,
        });

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error getting users",
            error,
        })
    }
}

const updateUserById = async(req, res) =>{
    const {id} = req.params;
    const userId = parseInt(id);
    const {
        fullname,
        first_surname, 
        second_surname,
        identification,   
        email,            
        password,   
        avatar,
    } = req.body;
    console.log(userId);
    console.log(req.body);

    try{
        const updateData = {
            fullname,
            first_surname, 
            second_surname,
            identification,   
            email,            
            password 
        };

        if(req.file){
            updateData.avatar = req.file.filename;
        }

        console.log("Avatar ",avatar);

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: updateData,
        })
        // console.log("User: ", user);

        res.status(200).json({
            message: "User Updated",
            user
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error updating user",
            error,
        })
    }
}

const deleteUserById = async(req,res) => {
    const {id} = req.params
    const userId = parseInt(id);

    try{
        const user = await prisma.user.delete({
            where: {
                id: userId,
            }
        })
        console.log("user: ", user);
        res.status(200).json({
            message: "User Deleted",
            user
        })
    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error deleting user",
            error,
        })
    }
}
//Exports
module.exports = {createUser, getUsers, getUserById, updateUserById, deleteUserById}