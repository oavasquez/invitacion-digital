import { Router } from "express";

const router= Router();


router.get('/', (req,res)=>{

    
    console.log(req.query['text'])
    res.render('index', {title: 'First WebSite with Node', invitado: req.query['invitado']})
})



export default router;