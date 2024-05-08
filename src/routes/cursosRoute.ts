import { Router } from "express";

import Cursos from "../controller/Cursos";


const routerCursos = Router();


routerCursos.get("/cursos", Cursos.getCursos);


export default routerCursos