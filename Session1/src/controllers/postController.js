const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

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
module.exports = {createPost, getPosts, getPostById}