const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAuthor = async( req, res) => {
    try{
        const {fullname, email} = req.body;
        const newAuthor = await prisma.author.create({
            data: {
                fullname,
                email
            }
        });
        console.log(newAuthor);
        res.status(201).json ({
            message: `Author created`,
            newAuthor,
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error creating author`,
            error,
        })
    }
}

const getAuthor = async( req, res) => {
    try{
        const authors = await prisma.author.findMany({
            include: {books: true}
        });
        console.log(authors);
        res.status(200).json ({
            message: `Authors`,
            authors,
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error getting author`,
            error,
        })
    }
}

const updateAuthor = async(req,res) => {
    try{
        const {id} = req.params;
        const {fullname, email} = req.body;
        const existingAuthor = await prisma.author.findUnique({
            where:{
                id: parseInt(id)
            }
        })

        if(!existingAuthor){
            return res.status(400).json ({
                message: `Author not found`,
            })
        }else{
            const updatedAuthor = await prisma.author.update({
                where: {
                    id: parseInt(id)
                },
                data:{
                    fullname,
                    email
                }
            });
            console.log(updatedAuthor);
            res.status(200).json ({
                message: `Author updated`,
                updatedAuthor
            })
        }

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error updating author`,
            error,
        })
    }
}

const deleteAuthor = async(req,res) => {
    try{
        const {id} = req.params;
        console.log(req.params);

        const existingAuthor = await prisma.author.findUnique({
            where: { id: parseInt(id) },
            include: { books: true }
        })

        if(!existingAuthor){
            return res.status(400).json ({
                message: `Author not found`,
            })
        }

        for(const book of existingAuthor.books){
            await prisma.detail.deleteMany({
                where: { bookId: book.id }
            })
        }
        
        await prisma.book.deleteMany({
            where: {
                authorId: parseInt(id),
            }
        })
        const deletedAuthor = await prisma.author.delete({
            where:{
                id: parseInt(id),
            }
        })
        console.log(deleteAuthor);
        res.status(200).json ({
            message: `Author deleted`,
            deletedAuthor,
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error at delete author`,
            error,
        })
    }
}

module.exports = {createAuthor, getAuthor,updateAuthor, deleteAuthor}