import type { Request, Response } from "express";
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
            //primero hacemos una busqueda condicional
            //la parte del select establece los datos que vamos a obtener
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
            res.json({cursos})
        }catch(e){
            console.log(e.message)
            res.status(500).json({error:'error en el servidor'})
        }
    }
}

export default User;