import { Request, Response } from "express";
import { PrismaClient } from "prisma/prisma-client";
const prisma = new PrismaClient()
export default class Cursos { 
    static async getCursos(req: Request, res: Response){
        //podemos traer todos los cuross sin importar que
        try{
            const cursos = await prisma.curso.findMany()
            if(!cursos){
                return res.send('no hay cursos')
            }
            res.json(cursos)
        }catch(e){
            console.log(e.message)
        }
    }
    static async addCurso(req: Request, res: Response){//!este queda pendiente
        try{
            //va a ser metodo post
            const {name, descripcion,id} = req.body;
            //como es un metodo de agregacion solo es necesario agregarlo
            await prisma.cursado.create({
                data:{
                    name,
                    descripcion,
                    id
                }
            })
        }catch(e){
            console.log(e.message)
        }
    }
    
}