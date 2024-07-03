const {PrismaClient} = require('@prisma/client');
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

const getAuthors = async( req, res) => {
    try{
        const authors = await prisma.author.findMany();
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

const getAuthorWithPosts = async( req, res) => {
    try{
        const authors = await prisma.author.findMany({
            include: {
                posts: true,
            }
        });
        console.log(authors);
        res.status(200).json ({
            message: `Authors with posts`,
            authors,
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error getting authors with post`,
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

        await prisma.post.deleteMany({
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
            message: `Error getting authors with post`,
            error,
        })
    }
}

const createPost = async( req, res) => {
    try{
        const {title, content, authorId, categoryIds} = req.body;
        console.log(req.body);
        const newPost = await prisma.post.create({
            data: {
                tittle: title,
                content,
                author: {connect: {id: authorId}},
                categories: {
                    connect: categoryIds.map((categoryId) => ({
                        id: categoryId
                    }))
                }
            }
        });
        console.log(newPost);
        res.status(201).json ({
            message: `Post created`,
            newPost,
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error creating post`,
            error,
        })
    }
}

const getPosts = async (req, res) => {
    try{
        const posts = await prisma.post.findMany({
            include: {
                author: true,
                categories: true
            },
        });

        res.status(200).json ({
            message: `All posts`,
            posts,
        })
    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error getting posts`,
            error,
        })
    }
}

const getPostById = async (req, res) => {
    const {id} = req.params;
    const postId = parseInt(id);

    try{
        const post = await prisma.post.findUnique({
            where:{
                id: postId
            },
            include:{
                author: true,
                categories: true
            }
        })
        if(!post){
            return res.status(404).json({
                message: `post with id: ${postId} does not exist`,
                error: "Post not found"
            })
        }
        res.status(200).json({
            message: `post with id: ${postId}`,
            post,
        });

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `error getting post with id: ${postId}`,
            error,
        })
    }
}
module.exports = {createAuthor, getAuthors, getAuthorWithPosts, deleteAuthor, updateAuthor, createPost, getPosts, getPostById}