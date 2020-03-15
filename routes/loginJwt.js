var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../configuration/config');
var router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/token', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const payload = {
    check:  true
  };
  const token = jwt.sign(payload, config.llave, {
    expiresIn: 1440
  });
  res.json({
    mensaje: 'Autenticación correcta',
    token: token
  });
});

router.post('/autenticar', (req, res) => {
    console.log('usuario ' + req.body.usuario);
    console.log('contrasena ' + req.body.contrasena);
    if (!req.body.usuario){
      res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }

    User.listOne({ cedula: req.body.usuario, password: req.body.contrasena }, function(err, userLoged){
      if (err){
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
        return;
      }
      if(userLoged) {
        const payload = {
          check:  true
        };
        const token = jwt.sign(payload, config.llave, {
          expiresIn: 1440
        });
        res.json({
          mensaje: 'Autenticación correcta',
          token: token
        });
      } else {
          res.json({ mensaje: "Usuario o contraseña incorrectos"})
      }
    });
});

router.get('/datos', (req, res, next) => {
    const token = req.headers['access-token'];
	console.log('token ' + token);
    if (token) {
      jwt.verify(token, config.llave, (err) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
            const datos = [
                { id: 1, nombre: "Asfo" },
                { id: 2, nombre: "Denisse" },
                { id: 3, nombre: "Carlos" }
            ];
            
            res.json(datos);
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

 module.exports = router;