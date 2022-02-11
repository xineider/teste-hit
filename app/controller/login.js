// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var LoginModel = require('../model/loginModel.js');
var model = new LoginModel;
var data = {};
var app = express();




// /* GET pagina de login. */


router.get('/', function(req, res, next) {
	if (typeof req.session.id_usuario != 'undefined' && req.session.id_usuario != 0) {
		res.redirect('/sistema/administracao');
	} else {
		res.render('login/login', {data:data});
	}
});

// /* POST enviando o login para verificação.*/

router.post('/', function(req, res, next) {
	POST = req.body;

	POST.senha = control.Encrypt(POST.senha);
	POST.login = POST.login.toLowerCase();
	POST.login = POST.login.trim();

	model.Login(POST).then(data => {

		if (data.length > 0) {
			req.session.usuario = {};
			req.session.usuario.id = data[0].id;
			res.redirect('/sistema/administracao');
		} else {
			res.render('login/login', { data:data, erro: 'Login ou senha incorreto(s).', tipo_erro: 'login' });
		}
	});


});



module.exports = router;