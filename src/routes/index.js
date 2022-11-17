import { Router } from "express";

import { pool } from "../db/db.js";

const router = Router();


router.get('/', (req, res) => {


    console.log(req.query)
    if (req.query.length == 0) {
        res.render('nofound', { title: 'Invitacion Boda Vasquez Acosta' })
    } else {

        const result = pool.query(`CALL sp_invitados(2 ,'` + req.query['invitado'] + `','');`, function (error, results) {
            if (error) {
                res.render('nofound', { title: 'Invitacion Boda Vasquez Acosta' , mensaje: 'Lo sentimos tenemos problemas para tu generar tu invitacion' })
            }

            console.log(results)
            var resultado = Object.assign({}, results[0]);
            if (results[0].length == 0) {
                res.render('nofound', { title: 'Invitacion Boda Vasquez Acosta', mensaje: 'No se encontraron datos'  })
            }else{
                res.render('index', { title: 'Invitacion Boda Vasquez Acosta', invitado: resultado[0].nombre_invitado.toLowerCase(), codigo_invitado: req.query['invitado'], cantidad_personas: resultado[0].cantidad_personas })
            }
        });
    }

})


router.get('/confirmation', (req, res) => {

    const result = pool.query(`CALL sp_invitados(1 ,'` + req.query['respuesta'] + `','` + req.query['invitado'] + `');`, function (error, results) {
        if (error) throw console.log(error);
        var resultado = Object.assign({}, results[0]);
        if (results[0].length==0) {
            res.render('nofound', { title: 'Invitacion Boda Vasquez Acosta', mensaje: 'No se encontraron datos' })
        }else{
            res.render('confirmation', { title: 'Invitacion Boda Vasquez Acosta', mensaje: resultado[0].mensaje.toLowerCase() })
        }
    });

})


router.get('/listconfirmation', (req, res) => {

    const result = pool.query(`CALL sp_invitados(3 ,'password1','');`, function (error, results) {

        if (error) throw console.log(error);
        var resultado = Object.assign({}, results);

        if (results[0].length==0) {
            res.render('nofound', { title: 'Invitacion Boda Vasquez Acosta', mensaje: 'No se encontraron datos'  })
        }else{
            res.render('listconfirmation', { title: 'Invitacion Boda Vasquez Acosta', user_data: resultado[0] })   }
       
       
    });

})




export default router;