var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'grantedespana@gmail.com',
    pass: 'Pene1234'
  }
});



router.post('/', (req, res) => {
  console.log(req.body)

  const mailOptions = {
    from: 'grantedespana@gmail.com', 
    to: `grantedespana@gmail.com, ${req.body.email}`,
    subject: req.body.subject,
    html: `<strong>Email de contacto:</strong> ${req.body.email}<br>
    <strong>Mensaje:</strong> ${req.body.message}`//
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
      res.json({'resultado':'Ups...','mensaje': 'Lo siento, ha ocurrido un error y el mensaje no ha podido ser enviado. Por favor, inténtalo de nuevo o escribenos directamente a grantedespana@gmail.com'})
    }
    else {
      console.log(info);
      res.json({'resultado': '¡Enhorabuena!', 'mensaje': 'El mensaje ha sido enviado correctamente y en breve nos pondremos en contacto contigo'})
    }
  });

})




module.exports = router;
