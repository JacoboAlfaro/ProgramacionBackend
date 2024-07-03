const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const createSuperhero = async(req, res) => {
    const {
        real_name,
        superhero_name, 
        powers,
        universe,   
        debilities,            
    }  = req.body;

    try{
        let stringPowers = ConvertirLista(powers);
        let stringDebilities = ConvertirLista(debilities);
        console.log("Powers ", stringPowers);
        console.log("Debilities", stringDebilities);



        const newSuperhero = await prisma.superhero.create({
            data: {
                real_name,
                superhero_name, 
                powers: stringPowers,
                universe,   
                debilities: stringDebilities,   
            }
        })
        console.log("NewSuperhero", newSuperhero);
        res.status(201).json ({
            message: "Superero created",
            newSuperhero,
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error creating SuperHero",
            error,
        })
    }
}

const getSuperheroes =  async (req, res) => {
    try{
        const superheroes = await prisma.superhero.findMany()
        res.status(200).json ({
            message: "All superheroes",
            superheroes,
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error getting superheroes",
            error,
        })
    }
}

const getSuperheroById = async (req,res) => {
    const {id} = req.params;
    const superheroId = parseInt(id);
    try{
        const superhero = await prisma.superhero.findUnique({
            where:{
                id: superheroId
            }
        })
        res.status(200).json({
            message: `superhero with id: ${superheroId}`,
            superhero,
        });

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error getting superhero",
            error,
        })
    }
}

const updateSuperheroById = async(req, res) =>{
    const {id} = req.params;
    const superheroId = parseInt(id);
    const {
        real_name,
        superhero_name, 
        powers,
        universe,   
        debilities, 
    } = req.body;
    
    /* console.log(superheroId);
    console.log(req.body); */

    try{
        const superhero = await prisma.superhero.findFirst({
            where:{
                superhero_name: superhero_name
            }
        });
        
        if(superhero == null){
            return res.status(400).json ({
                message: `Superhero with superhero name ${superhero_name} alrdey exist`,
                error: "Error updating Superhero",
            })
        }

        let stringPowers = ConvertirLista(powers);
        let stringDebilities = ConvertirLista(debilities);
        const updatedData = {
            real_name,
            superhero_name, 
            powers: stringPowers,
            universe,   
            debilities: stringDebilities, 
        };

        const superheroUpdated = await prisma.superhero.update({
            where: {
                id: superheroId
            },
            data: updatedData,
        })

        res.status(200).json({
            message: "Superhero Updated",
            superheroUpdated
        })

    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: `Error updating Superhero with Id: ${superheroId}`,
            error,
        })
    }
}

const deleteSuperheroById = async(req,res) => {
    const {id} = req.params
    const superheroId = parseInt(id);

    try{
        const superhero = await prisma.superhero.delete({
            where: {
                id: superheroId,
            }
        })
        console.log("superhero: ", superhero);
        res.status(200).json({
            message: `Superhero with id ${superheroId} deleted`,
            superhero
        })
    }catch(error){
        console.log(error)
        res.status(500).json ({
            message: "Error deleting Superhero",
            error,
        })
    }
}

function ConvertirLista(list){
    let listString = "";
    for(element of list){
        listString += element + ","
    }
    // console.log(listString)

    return listString;
}

module.exports = {createSuperhero,getSuperheroes,getSuperheroById, updateSuperheroById, deleteSuperheroById}
