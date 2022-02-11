// PADRÃO
var express = require('express');
var router 	= express.Router();
var Control = require('./control.js');
var control = new Control;
var ContatoModel = require('../model/contatoModel.js');
var model = new ContatoModel;
var data = {};
var app = express();
app.use(require('express-is-ajax-request'));



router.get('/', function(req, res, next) {
	res.render(req.isAjaxRequest() == true ? 'api' : 'montador', {html: 'inicio/contato', data: data});
});



router.post('/enviarcontato', function(req, res, next) {
	POST = req.body;
	control.SendMail('markosss13@gmail.com','Teste Hit - '+ POST.nome,'Recebimento de contato pelo site Hit',
		'Recebimento de contato pelo site Hit.\
		<br><b>Nome</b>:' + POST.nome + 
		'<br><b>Email</b>:' + POST.email +
		'<br><b>Mensagem</b>:<br><br>'+ POST.mensagem +
		'<br>Não é necessário responder esta mensagem, pois ela é enviada automaticamente.<br>Obrigado.');

	model.InsertContato(POST).then(data => {
		res.json('agradecimentoContato');
	});
});





module.exports = router;