const {PrismaClient} = require('@prisma/client');
const { hashSync, compareSync } = require('bcrypt');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer');
const { log } = require('console');
require("dotenv").config();

const signup = async (req,res) => {
    const {identification, email, password} = req.body;
    console.log(req.body);

    try{
        const user = await prisma.user.findFirst({
            where:{
                OR: [
                    {
                        email: email,
                    },
                    {
                        identification: identification,
                    }
                ]
            }
        });
        console.log(user)
        if(user){
            return res.status(400).json({
                message: 'user alredy exists'
            })
        }else{
            const newUser = await prisma.user.create({
                data:{
                    identification,
                    email,
                    password: hashSync(password,10)
                }
            })
            res.status(201).json({
                message: "user created",
                newUser
            })
        }

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error creating user",
            error,
        })
    }
}

const login = async (req,res) => {
    const {email, password} = req.body;
    console.log(req.body);

    try{
        const userExist = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })

        console.log(userExist);

        if(!userExist){
            return res.status(400).json({
                message: 'user not found'
            });
        }else{
            const passwordIsvalid = compareSync(password, userExist.password)
            if(!passwordIsvalid){
                return res.status(400).JSON({
                    message: "Invalid password"})
            }else{
                const token = jwt.sign({id: userExist.id}, process.env.SECRET, {
                    expiresIn: 86400,
                });
        
                console.log(token)
                res.status(200).json({
                    message: "User logged In",
                    token
                })
            }
        }

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error during login",
            error,
        })
    }
};

const requestPasswordReset = async (req, res) => {
    const {email} = req.body;
    console.log(req.body)
    try{
        const user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })
        if(!user){
            return res.status(400).json({
                message: "user not found"
            })
        }

        //generar token de restablecimiento de contrasenia
        const resetToken = crypto.randomBytes(32).toString("hex")
        console.log(resetToken);
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1hora
        console.log(resetTokenExpiry);

        await prisma.user.update({
            where:{
                email: email
            },
            data:{
                resetToken: resetToken,
                resetTokenExpiry: resetTokenExpiry
            }
        })

        //guardar token y enviar por gmail

        const transporterEmail = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        console.log(transporterEmail);

        const mailOptions = await transporterEmail.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Restablecimiento de contraseña",
            html:`
            <div>
                <h1>Restablecer contraseña</h1>
                <p>Haz click en el siguiente enlace para restablecer tu contraseña</p>
                <a href="http://localhost:3000/reset-password/${resetToken}">Restablecer contraseña</a>
            </div>
            `
        })
        res.status(200).json({
            message: `Email Sended to ${email} succesfully`
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error requesting password reset",
            error,
        })
    }
}

const resetPassword = async (req, res) => {
    const {token} = req.params
    const {newPassword} = req.body
    try{
        const user = await prisma.user.findFirst({
            where:{
                resetToken: token,
                resetTokenExpiry:{
                    gte: new Date()
                }
            }
        })

        if(!user){
            return res.status(400).send("Invalid or expired token")
        }
        const hashedPassword = hashSync(newPassword, 10)
        log(hashedPassword)

        await prisma.user.update({
            where:{
                id: user.id
            },
            data:{
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null
            }
        })
        res.status(200).json({
            message: "password reset succesfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error during password reset",
            error,
        })
    }
}
module.exports = {signup, login, requestPasswordReset, resetPassword}