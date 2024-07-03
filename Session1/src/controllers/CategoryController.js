const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (req,res) => {
    const { name } = req.body;

    try{

        const CategoryExists = await prisma.category.findUnique({
            where: {
                name: name
            }
        })

        if(CategoryExists){
            return res.status(400).json({
                message: "Category alredy exists",
                error: `category with name ${name} alredy exists in DB`
            })
        }
        const newCategory = await prisma.category.create({
            data: { name }
        })

        res.status(201).json({
            message: "Category created",
            newCategory
        })
    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error creating category`,
            error,
        })
    }
}

const getCategories = async (req, res) => {
    try{
        const categories = await prisma.category.findMany();
        console.log(categories);
        res.status(200).json({
            message: "All categories",
            categories
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error creating category`,
            error,
        })
    }
}

const getCategoryById = async (req, res) => {
    const {id} = req.params;
    const categoryId = parseInt(id);

    try{
        const category = await prisma.category.findUnique({
            where:{
                id: categoryId
            }
        })
        if(!category){
            return res.status(404).json({
                message: `category with id: ${categoryId} does not exist`,
                error: "category not found"
            })
        }
        res.status(200).json({
            message: `category with id: ${categoryId}`,
            category,
        });

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `error getting category with id: ${categoryId}`,
            error,
        })
    }
}

const updateCategory = async(req, res) => {
    try{
        const {id} = req.params;
        const {name} = req.body;
        const existingCategory = await prisma.category.findUnique({
            where:{
                id: parseInt(id)
            }
        })

        if(!existingCategory){
            return res.status(400).json ({
                message: `category not found`,
            })
        }

        const existingCategoryName = await prisma.category.findUnique({
            where:{
                name: name
            }
        })
        if(existingCategoryName && existingCategory.id != parseInt(id)){
            return res.status(400).json ({
                message: `A category with name ${name} alredy exists`,
            })
        }

        const updatedCategory = await prisma.category.update({
            where: {
                id: parseInt(id)
            },
            data:{
                name
            }
        });
        console.log(updatedCategory);
        res.status(200).json ({
            message: `category updated`,
            updatedCategory
        })
        

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error updating category`,
            error,
        })
    }
}

const deleteCategoryById = async(req,res) => {
    const {id} = req.params
    const categoryId = parseInt(id);

    try{
        const existingCategory = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        });

        if (!existingCategory) {
            return res.status(404).json({
                message: `Category with id ${categoryId} not found`,
            });
        }

        await prisma.postToCategory.deleteMany({
            where:{
                categoryId: categoryId
            }
        })

        const category = await prisma.category.delete({
            where: {
                id: categoryId,
            }
        })
        console.log("category: ", category);
        res.status(200).json({
            message: `Category with id ${categoryId} deleted`,
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error deleting category with id ${categoryId}`,
            error,
        })
    }
}

module.exports = {createCategory, getCategories, getCategoryById, updateCategory, deleteCategoryById}