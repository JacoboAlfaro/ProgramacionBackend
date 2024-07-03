const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createBookWithDetail = async (req,res) => {
    try{
        const {title, authorId, pagesNumber, publisher} = req.body;
        const newBook = await prisma.book.create({
            data: {
                title,
                authorId,
                detail: {
                    create: {
                        pagesNumber,
                        publisher
                    },
                },
            },
        });

        res.status(201).json({
            message: "Book created",
            newBook
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Error creating book with detail",
            error
        })
    }
}

const getBookWithDetail = async (req,res) => {
    try{
        const booksWithDetail = await prisma.book.findMany({
            include: {detail: true}
        })

        return res.status(200).json({
            message: `All books`,
            books: booksWithDetail
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error getting  books with detail",
            error
        })
    }
}

const getDetails = async( req, res) => {
    try{
        const details = await prisma.detail.findMany({
        });
        console.log(details);
        res.status(200).json ({
            message: `details`,
            details,
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error getting details`,
            error,
        })
    }
}

const updateBookDetail = async(req,res) => {
    try{
        const {id} = req.params;
        const {title, pagesNumber, publisher} = req.body;

        const existingBookDetail = await prisma.book.findUnique({
            where:{
                id: parseInt(id)
            },
            include: { detail: true }
        })

        if(!existingBookDetail){
            return res.status(400).json ({
                message: `book not found`,
            })
        }else{
            const updatedBookDetail = await prisma.book.update({
                where: {
                    id: parseInt(id)
                },
                include:{detail: true},

                data: { title }
            });
            if(pagesNumber || publisher){
                await prisma.detail.update({
                    where: {
                        bookId: parseInt(id)
                    },
                    data: {
                        pagesNumber,
                        publisher
                    },
                });
            }
            console.log(updatedBookDetail);
            res.status(200).json ({
                message: `Book detail updated`,
                updatedBookDetail,
            })
        }

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error updating book detail`,
            error,
        })
    }
}

const deleteBookDetail = async(req,res) => {
    try{
        const {id} = req.params;
        console.log(req.params);

        const existingBook = await prisma.book.findUnique({
            where: { id: parseInt(id) },
            include: { detail: true }
        })

        if(!existingBook){
            return res.status(400).json ({
                message: `Book not found`,
            })
        }
        
        await prisma.detail.delete({
            where: {
                bookId: parseInt(id),
            }
        })
        const deletedBook = await prisma.book.delete({
            where:{
                id: parseInt(id),
            }
        })
        console.log(deletedBook);
        res.status(200).json ({
            message: `Book deleted`,
            deletedBook,
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error at delete Book`,
            error,
        })
    }
}

module.exports = {createBookWithDetail, getBookWithDetail, getDetails, updateBookDetail, deleteBookDetail}