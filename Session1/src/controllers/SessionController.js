const {PrismaClient} = require('@prisma/client');
const { compareSync } = require('bcrypt');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')



const createSession = async (req,res) => {
    const {email, password} = req.body;
    try{
        const userExist = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })

        if(!userExist){
            return res.status(400).send('user not found');
        }else{
            const passwordValid = compareSync(password, userExist.password);
            if(!passwordValid){
                return res.status(400).send('Password Invalid');
                
            }else{
                const token = jwt.sign({id: userExist.id}, process.env.SECRET, {
                    expiresIn: 86400,
                });

                const session = await prisma.session.create({
                    data: {
                        token,
                        userId: userExist.id
                    }
                })
        
                res.status(201).json({
                    message: "Session created",
                    session
                })
            }
        }


    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error creating session",
            error,
        })
    }
}

//traer informacion con datos de usuario logueado (Se envía por Post con email y password en el body)
/* const getSession = async (req, res) => {
    const {email, password} = req.body;
    try{
        const userExist = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })

        if(!userExist){
            return res.status(400).send('user not found');
        }else{
            const passwordValid = compareSync(password, userExist.password);
            if(!passwordValid){
                return res.status(400).send('Password Invalid');
                
            }else{

                const sessionInfo = await prisma.session.findFirst({
                    where: {
                        userId: userExist.id
                    }
                })

                res.status(201).json({
                    message: "Loggin succesfully",
                    session: sessionInfo,
                    userExist
                })
            }
        }


    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error getting info",
            error,
        })
    } 
} */

//traer info de usuario pasando token por headers
const getSession = async (req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    
    if(!token){
        return res.status(400).send('token not found');
        }
    console.log(token);

    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded);

        if(!decoded){
            return res.status(400).send('Token not valid');
        }
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            },
        });
        console.log(user)
        if(!user){
            return res.status(400).send('user not found');
        }else{
            res.status(200).json({
                message: "Login succesfully",
                user: user
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error getting info",
            error,
        })
    }
}


//intentar crear la ruta de getsession pasando como pametro el token

const getSessionByToken = async (req, res) => {
    const {token} = req.params;
    try{
        const decode = jwt.decode(token)
        fecha = datetime.datetime.fromtimestamp(timestamp)
        console.log(decode, expireDate)

        if(decode.id == null){
            return res.status(400).send('Token not valid');
        }else{
            const userExist = await prisma.user.findUnique({
                where: {
                    id: decode.id,
                }
            })
    
            if(!userExist){
                return res.status(400).send('user not found');
            }else{
    
                res.status(200).json({
                    message: "Login succesfully",
                    user: userExist
                })
            }
        }

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error getting info",
            error,
        })
    }
}

module.exports = {createSession, getSession, getSessionByToken}