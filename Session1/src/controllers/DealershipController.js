const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const createDealershhip = async(req, res) => {
    const {
        name,
        city, 
        address,
        vehicle_brands,   
    }  = req.body;

    try{
        brandString = ConvertirLista(vehicle_brands);

        const newDealership = await prisma.dealership.create({
            data:{
                name,
                city,
                address,
                vehicle_brands: brandString 
            }
        })
        console.log("New dealeship", newDealership);
        res.status(201).json({
            message: "Dealership created succesfully",
            newDealership
        })

        

    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Error creating Dealership",
            error: error
        })
    }
}

const getDealerships = async(req, res) => {
    try{
        const dealeships = await prisma.dealership.findMany();
        res.status(200).json({
            message: "All Dealerships",
            dealeships
        })
    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error getting Dealerships",
            error: error,
        })
    }
}

const getDealershipById = async (req,res) => {
    const {id} = req.params
    const dealershipId = parseInt(id)

    try{
        const dealership = await prisma.dealership.findUnique({
            where:{
                id: dealershipId
            }
        })
        if(dealership != null){
            res.status(200).json({
                message: `Dealership with id: ${dealershipId}`,
                dealership,
            })
        }
        else{
            res.status(500).json ({
                message: `Dealership with id: ${dealershipId} does not exist in DB`,
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error getting dealerships",
            error,
        })
    }
}

const updateDealershipById = async(req, res) =>{
    const {id} = req.params;
    const dealershipId = parseInt(id);
    const {
        name,
        city, 
        address,
        vehicle_brands, 
    } = req.body;

    /* console.log(dealershipId);
    console.log(req.body); */

    try{
        brandString = ConvertirLista(vehicle_brands);
        const updatedData = {
            name,
            city, 
            address,
            vehicle_brands: brandString, 
        };

        const dealershipUpdated = await prisma.dealership.update({
            where: {
                id: dealershipId
            },
            data: updatedData,
        })

        res.status(200).json({
            message: "dealership Updated",
            dealershipUpdated
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error updating Dealership with Id: ${dealershipId}`,
            error,
        })
    }
}

const deleteDealershipById = async(req,res) => {
    const {id} = req.params
    const dealershipId = parseInt(id);

    try{
        const dealership = await prisma.dealership.delete({
            where: {
                id: dealershipId,
            }
        })
        console.log("dealership: ", dealership);
        res.status(200).json({
            message: `dealership with id ${dealershipId} deleted`,
            dealership
        })
    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error deleting dealership",
            error,
        })
    }
}

function ConvertirLista(list){
    let listString = "";
    for(element of list){
        listString += element + ","
    }
    console.log(listString)

    return listString
}

module.exports = {createDealershhip, getDealerships, getDealershipById, updateDealershipById, deleteDealershipById}