var express = require('express');
var router = express.Router();


const becaModel = require('../../models/beca.model')


// POST http://localhost:3000/api/becas
router.post('/becas', (req, res) => {
    // console.log(req.body.token)
    becaModel.getBecasByFiltro(req.body, (err, result) => {
        // console.log(result)
        console.log(err)
        res.json(result);
    })
});


module.exports = router;
