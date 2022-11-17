import { Router } from "express";

import { pool } from "../db/db.js";

const router = Router();


router.get('/', (req, res) => {

    const result = pool.query(`CALL invitacion_digitalDB.sp_invitados(2 ,'` + req.query['invitado'] + `','');`, function (error, results) {
        if (error)  console.log(error);
        var resultado = Object.assign({}, results[0]);
        res.render('index', { title: 'First WebSite with Node', invitado: resultado[0].nombre_invitado.toLowerCase(), codigo_invitado: req.query['invitado'] , cantidad_personas: resultado[0].cantidad_personas})
    });


})


router.get('/confirmation', (req, res) => {

    const result = pool.query(`CALL invitacion_digitalDB.sp_invitados(1 ,'` + req.query['respuesta'] + `','` + req.query['invitado'] + `');`, function (error, results) {
        if (error) throw console.log(error);
        var resultado = Object.assign({}, results[0]);
        res.render('confirmation', { title: 'First WebSite with Node', mensaje: resultado[0].mensaje.toLowerCase() })
    });

})


router.get('/listconfirmation', (req, res) => {

    const result = pool.query(`CALL invitacion_digitalDB.sp_invitados(3 ,'password1','' );`, function (error, results) {

        if (error) throw console.log(error);
        var resultado = Object.assign({}, results);

        console.log(resultado[0]);
        res.render('listconfirmation', { title: 'First WebSite with Node', user_data: resultado[0] })
    });

})




export default router;