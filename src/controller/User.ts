import type { Request, Response } from "express";
import type { Curso } from "../types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

class User{
    static async findUserByID(req: Request, res: Response)
    {
        try{
            //const userID = req.params.userID;
        console.log(req.params.userID);
      
        
        const usuario = await prisma.user.findUnique({
            where: { id: parseInt(req.params.userID) }
        });
        if(!usuario){
          return  res.json({error:'Usuario no encontrado'})
        }
        res.json({usuario})

        }catch(e){
            console.log(e.message)
        }
        
    }



    static async createUser(req: Request, res: Response)
    {

        const {email, usuario, password} = req.body;
          await prisma.user.create({
            data: {
                email,
                usuario,
                password
            }
        });
        res.send('El usuario ha sido creado con exito')
        /*

          id        Int      @id
  email     String   @unique
  usuario   String
  password  String
  cursados  Cursado[]
        */
    }
    static async getUser(req: Request, res: Response){
        const usuario = await prisma.user.findMany()
        console.log(usuario)

        res.json({datos:usuario})
    }
    //obteneer todos los curos por medio de un usuair
   static async getCursosByUser(req: Request, res: Response){
    try{
        const {userID} = req.body;
        const cursos = await prisma.cursado.findMany({
            where: {
                userId: parseInt(userID)
            },
            select:{
                cursoId :true
            }
        })
        if(cursos.length === 0){
            return res.json({error:'El usuario no tiene cursos'})
        }
        /*
         el detalle de usar promiseAll es que 
        en el foreach se ejecutan multiples promesas y no hay tiempo
        de solucionarlas en un solo hilo, asi que obtamos por usar Promise.all
        y como funcion le mandamos el map, y ya este mismo ejecuta 
        "al mismo tiempo" la todas las promesas 
        */
        const cursosObjArray = await Promise.all(cursos.map(async (curso)=>{
            const cursoObj = await prisma.curso.findUnique({
                where: {
                    id: curso.cursoId
                },
                select:{
                    id:true,
                    name:true,
                    description:true 
                }
            })
            
            return cursoObj;
        }))
        res.json({cursos: cursosObjArray})
    }catch(e){
        console.log(e.message)
        res.status(500).json({error:'error en el servidor'})
    }
}
static async userLogin(req: Request, res: Response){
    try{
        //treaemos nombre y contraseña desde el body
        const {usuario, password} = req.body;	
        const usuarioEncontrado = await prisma.user.findFirst({
            where: {
                usuario,
                password
            }
        }) 
        console.log(usuarioEncontrado)
        res.send('conectados')
    }catch(e){
        console.log(e.message)
    }
}
}

export default User;