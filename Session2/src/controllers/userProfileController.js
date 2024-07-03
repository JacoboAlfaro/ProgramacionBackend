const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createUserWithProfile = async (req,res) => {
    try{
        const {email, bio} = req.body;
        const newUser = await prisma.user.create({
            data: {
                email,
                profile: {
                    create: {
                        bio
                    },
                },
            },
        });

        res.status(201).json({
            message: "User created",
            newUser
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Error creating user with profile",
            error
        })
    }
}

const getUserWithProfile = async (req,res) => {
    try{
        const { email } = req.params;
        const userWithProfile = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {profile: true}
        })

        if(!userWithProfile){
            return res.status(400).json({
                error: 'user not found'
            })
        }
        return res.status(200).json({
            message: `user with email ${email}`,
            userWithProfile
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error getting  user with profile",
            error
        })
    }
}

module.exports = {createUserWithProfile, getUserWithProfile}