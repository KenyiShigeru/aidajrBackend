//Esta es la ruta de usuario es decir que aquí es la ruta direccion/usuarios
import express from "express";
import {Router} from "express";
import User from "../controller/User";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

console.log("Soy una clase usuario");

router.get("/usuarios", User.getUser);

router.post("/usuarios",User.createUser);

router.get('/usuarios/:userID', User.findUserByID);


export default router;
